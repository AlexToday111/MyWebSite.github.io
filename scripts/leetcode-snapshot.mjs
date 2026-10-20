import { readFile, mkdir, writeFile, rename, rm } from "node:fs/promises";
import { dirname } from "node:path";

const DAY = 86400000;
export const USERNAME = "AlexToday111";
const endpoint = "https://leetcode.com/graphql/";
const query = `query ($username: String!) {
  matchedUser(username: $username) {
    username
    submissionCalendar
    submitStatsGlobal { acSubmissionNum { difficulty count } }
  }
}`;
const integer = (value) => Number.isSafeInteger(value) && value >= 0;
const midnight = (date) =>
  Date.parse(date.toISOString().slice(0, 10) + "T00:00:00Z");

export function validateSnapshot(snapshot, now = new Date()) {
  if (snapshot?.username !== USERNAME)
    throw new Error("Unexpected LeetCode profile");
  const updated = Date.parse(snapshot.updatedAt);
  if (!Number.isFinite(updated) || updated > now.getTime() + 300000)
    throw new Error("Invalid snapshot timestamp");
  const counts = snapshot.solved;
  if (
    !counts ||
    !["total", "easy", "medium", "hard"].every((key) => integer(counts[key])) ||
    counts.total <= 0 ||
    counts.total !== counts.easy + counts.medium + counts.hard
  ) {
    throw new Error("Incomplete or inconsistent solved counts");
  }
  const calendar = snapshot.submissions;
  if (
    !calendar ||
    typeof calendar !== "object" ||
    Array.isArray(calendar) ||
    Object.keys(calendar).length !== 365
  )
    throw new Error("Incomplete activity calendar");
  const end = midnight(new Date(updated));
  let activity = 0;
  for (let offset = 0; offset < 365; offset++) {
    const date = new Date(end - offset * DAY).toISOString().slice(0, 10);
    if (!integer(calendar[date])) throw new Error("Invalid activity count");
    activity += calendar[date];
  }
  if (activity === 0) throw new Error("Empty activity response");
  return snapshot;
}

export function createSnapshot(result, now = new Date()) {
  const user = result?.data?.matchedUser;
  if (result?.errors || !user || user.username !== USERNAME)
    throw new Error("LeetCode profile could not be verified");
  const entries = user.submitStatsGlobal?.acSubmissionNum;
  if (
    !Array.isArray(entries) ||
    entries.length !== 4 ||
    new Set(entries.map((item) => item.difficulty)).size !== 4
  )
    throw new Error("Incomplete difficulty response");
  const calendar = JSON.parse(user.submissionCalendar);
  if (
    !calendar ||
    typeof calendar !== "object" ||
    Array.isArray(calendar) ||
    !Object.keys(calendar).length
  )
    throw new Error("Empty submission calendar");
  for (const [timestamp, count] of Object.entries(calendar)) {
    const seconds = Number(timestamp);
    if (
      !Number.isSafeInteger(seconds) ||
      seconds % 86400 !== 0 ||
      !integer(count)
    )
      throw new Error("Invalid source calendar entry");
  }
  const end = midnight(now);
  const snapshot = {
    username: user.username,
    updatedAt: now.toISOString(),
    solved: Object.fromEntries(
      entries.map(({ difficulty, count }) => [
        difficulty === "All" ? "total" : difficulty.toLowerCase(),
        count,
      ]),
    ),
    submissions: Object.fromEntries(
      Array.from({ length: 365 }, (_, index) => {
        const time = end - (364 - index) * DAY;
        return [
          new Date(time).toISOString().slice(0, 10),
          calendar[String(time / 1000)] ?? 0,
        ];
      }),
    ),
  };
  return validateSnapshot(snapshot, now);
}

export function preventRegression(candidate, previous) {
  if (!previous) return candidate;
  if (Date.parse(candidate.updatedAt) < Date.parse(previous.updatedAt))
    throw new Error("Refusing an older snapshot");
  for (const key of ["total", "easy", "medium", "hard"]) {
    if (candidate.solved[key] < previous.solved[key])
      throw new Error(`Refusing regressed ${key} count`);
  }
  return candidate;
}

async function readValid(path, now) {
  if (!path) return null;
  try {
    return validateSnapshot(JSON.parse(await readFile(path, "utf8")), now);
  } catch (error) {
    if (error.code !== "ENOENT")
      console.warn(`Ignored invalid saved snapshot: ${error.message}`);
    return null;
  }
}

async function atomicWrite(path, snapshot) {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.tmp-${process.pid}`;
  try {
    await writeFile(temp, `${JSON.stringify(snapshot, null, 2)}\n`);
    await rename(temp, path);
  } finally {
    await rm(temp, { force: true });
  }
}

export async function refreshLeetCode({
  snapshotPath,
  cachePath,
  fetchImpl = fetch,
  now = new Date(),
  attempts = 3,
}) {
  const saved = (
    await Promise.all([readValid(snapshotPath, now), readValid(cachePath, now)])
  )
    .filter(Boolean)
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  let snapshot = saved[0];
  let refreshed = false;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referer: `https://leetcode.com/u/${USERNAME}/`,
        },
        body: JSON.stringify({ query, variables: { username: USERNAME } }),
        signal: AbortSignal.timeout(20000),
        cache: "no-store",
      });
      if (!response.ok)
        throw new Error(`LeetCode returned HTTP ${response.status}`);
      snapshot = preventRegression(
        createSnapshot(await response.json(), now),
        snapshot,
      );
      refreshed = true;
      break;
    } catch (error) {
      console.warn(
        `LeetCode refresh attempt ${attempt}/${attempts}: ${error.message}`,
      );
    }
  }
  if (!snapshot)
    throw new Error(
      "No verified LeetCode data available; refusing to publish empty statistics",
    );
  await atomicWrite(snapshotPath, snapshot);
  if (cachePath) await atomicWrite(cachePath, snapshot);
  console.log(
    `LeetCode: ${refreshed ? "live refresh" : "retained last valid snapshot"}, ${snapshot.solved.total} solved; updated ${snapshot.updatedAt}`,
  );
  return { snapshot, refreshed };
}
