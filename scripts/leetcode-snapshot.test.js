import { afterEach, describe, expect, it, vi } from "vitest";
import {
  mkdtemp,
  readFile,
  writeFile,
  readdir,
  unlink,
  rmdir,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  createSnapshot,
  validateSnapshot,
  preventRegression,
  refreshLeetCode,
} from "./leetcode-snapshot.mjs";

const now = new Date("2026-10-20T12:00:00Z");
function response(date = now) {
  const day = Date.parse(date.toISOString().slice(0, 10) + "T00:00:00Z") / 1000;
  return {
    data: {
      matchedUser: {
        username: "AlexToday111",
        submissionCalendar: JSON.stringify({ [day]: 3 }),
        submitStatsGlobal: {
          acSubmissionNum: [
            { difficulty: "All", count: 100 },
            { difficulty: "Easy", count: 50 },
            { difficulty: "Medium", count: 30 },
            { difficulty: "Hard", count: 20 },
          ],
        },
      },
    },
  };
}
let directory;
afterEach(async () => {
  vi.restoreAllMocks();
  if (directory) {
    for (const file of await readdir(directory))
      await unlink(join(directory, file));
    await rmdir(directory);
    directory = undefined;
  }
});

it("creates one compatible solved metric and a complete real-calendar window", () => {
  const snapshot = createSnapshot(response(), now);
  expect(snapshot.solved).toEqual({
    total: 100,
    easy: 50,
    medium: 30,
    hard: 20,
  });
  expect(Object.keys(snapshot.submissions)).toHaveLength(365);
  expect(snapshot.submissions["2026-10-20"]).toBe(3);
  expect(snapshot.submissions["2026-10-19"]).toBe(0);
});

it.each([
  (r) => {
    r.errors = [{ message: "partial response" }];
  },
  (r) => {
    r.data.matchedUser.username = "OtherUser";
  },
  (r) => {
    r.data.matchedUser.submitStatsGlobal.acSubmissionNum.pop();
  },
  (r) => {
    r.data.matchedUser.submitStatsGlobal.acSubmissionNum[0].count = 101;
  },
  (r) => {
    r.data.matchedUser.submitStatsGlobal.acSubmissionNum[1].count = -1;
  },
  (r) => {
    r.data.matchedUser.submissionCalendar = "{}";
  },
  (r) => {
    r.data.matchedUser.submissionCalendar = "not JSON";
  },
])("rejects partial, invalid, mismatched and empty API responses", (mutate) => {
  const data = response();
  mutate(data);
  expect(() => createSnapshot(data, now)).toThrow();
});

it("rejects zeroed, incomplete and future-dated saved snapshots", () => {
  const snapshot = createSnapshot(response(), now);
  expect(() =>
    validateSnapshot(
      { ...snapshot, solved: { total: 0, easy: 0, medium: 0, hard: 0 } },
      now,
    ),
  ).toThrow();
  expect(() =>
    validateSnapshot({ ...snapshot, submissions: {} }, now),
  ).toThrow();
  expect(() =>
    validateSnapshot({ ...snapshot, updatedAt: "2030-01-01T00:00:00Z" }, now),
  ).toThrow();
});

it("rejects older snapshots and regressed solved counts", () => {
  const previous = createSnapshot(response(), now);
  expect(() =>
    preventRegression(
      { ...previous, updatedAt: "2026-10-19T12:00:00Z" },
      previous,
    ),
  ).toThrow();
  expect(() =>
    preventRegression(
      { ...previous, solved: { total: 99, easy: 49, medium: 30, hard: 20 } },
      previous,
    ),
  ).toThrow();
});

async function setup() {
  directory = await mkdtemp(join(tmpdir(), "leetcode-test-"));
  const snapshotPath = join(directory, "snapshot.json");
  const cachePath = join(directory, "cache.json");
  const snapshot = createSnapshot(response(), now);
  await writeFile(snapshotPath, JSON.stringify(snapshot));
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
  return { snapshotPath, cachePath, snapshot };
}

it("preserves values AND freshness timestamp after network failure", async () => {
  const { snapshotPath, snapshot } = await setup();
  const result = await refreshLeetCode({
    snapshotPath,
    now,
    attempts: 2,
    fetchImpl: vi.fn().mockRejectedValue(new Error("offline")),
  });
  expect(result.refreshed).toBe(false);
  expect(JSON.parse(await readFile(snapshotPath, "utf8"))).toEqual(snapshot);
});

it("restores the newest valid cached data instead of the older checkout on failed refresh", async () => {
  const { snapshotPath, cachePath, snapshot } = await setup();
  const older = new Date("2026-10-18T12:00:00Z");
  await writeFile(
    snapshotPath,
    JSON.stringify(createSnapshot(response(older), older)),
  );
  await writeFile(cachePath, JSON.stringify(snapshot));
  await refreshLeetCode({
    snapshotPath,
    cachePath,
    now,
    attempts: 1,
    fetchImpl: vi.fn().mockRejectedValue(new Error("offline")),
  });
  expect(JSON.parse(await readFile(snapshotPath, "utf8"))).toEqual(snapshot);
});

it("retries a failed request and atomically saves the validated success", async () => {
  const { snapshotPath, cachePath } = await setup();
  const fetchImpl = vi
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 503 })
    .mockResolvedValueOnce({ ok: true, json: async () => response() });
  const result = await refreshLeetCode({
    snapshotPath,
    cachePath,
    now,
    fetchImpl,
  });
  expect(result.refreshed).toBe(true);
  expect(fetchImpl).toHaveBeenCalledTimes(2);
  expect(await readFile(cachePath, "utf8")).toEqual(
    await readFile(snapshotPath, "utf8"),
  );
  expect((await readdir(directory)).sort()).toEqual([
    "cache.json",
    "snapshot.json",
  ]);
});

it("fails closed without writing when both the source and saved data are invalid", async () => {
  const { snapshotPath } = await setup();
  await writeFile(snapshotPath, "{}");
  await expect(
    refreshLeetCode({
      snapshotPath,
      now,
      attempts: 1,
      fetchImpl: vi
        .fn()
        .mockResolvedValue({ ok: true, json: async () => ({ data: null }) }),
    }),
  ).rejects.toThrow("No verified");
  expect(await readFile(snapshotPath, "utf8")).toBe("{}");
});
