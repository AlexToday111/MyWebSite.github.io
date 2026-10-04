import { mkdir, writeFile } from "node:fs/promises";

const username = process.argv[2] || "AlexToday111";
const query = `query ($username: String!) {
  matchedUser(username: $username) {
    username
    submissionCalendar
    submitStatsGlobal { acSubmissionNum { difficulty count } }
  }
}`;

const response = await fetch("https://leetcode.com/graphql/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Referer: `https://leetcode.com/u/${encodeURIComponent(username)}/`,
  },
  body: JSON.stringify({ query, variables: { username } }),
  signal: AbortSignal.timeout(20000),
});
if (!response.ok) throw new Error(`LeetCode returned HTTP ${response.status}`);
const result = await response.json();
const user = result.data?.matchedUser;
if (result.errors || !user)
  throw new Error("LeetCode profile could not be loaded");

// LeetCode's calendar counts submissions, including repeated attempts.
const calendar = JSON.parse(user.submissionCalendar);
const now = new Date();
const today = Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate(),
);
const days = Array.from({ length: 365 }, (_, index) => {
  const timestamp = today - (364 - index) * 86400000;
  const count = calendar[String(timestamp / 1000)] ?? 0;
  if (!Number.isInteger(count) || count < 0)
    throw new Error("Invalid calendar data");
  return { date: new Date(timestamp).toISOString().slice(0, 10), count };
});
const snapshot = {
  username: user.username,
  updatedAt: now.toISOString(),
  solved: Object.fromEntries(
    user.submitStatsGlobal.acSubmissionNum.map(({ difficulty, count }) => [
      difficulty === "All" ? "total" : difficulty.toLowerCase(),
      count,
    ]),
  ),
  submissions: Object.fromEntries(days.map(({ date, count }) => [date, count])),
};
await mkdir(new URL("../data/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../data/leetcode.json", import.meta.url),
  `${JSON.stringify(snapshot, null, 2)}\n`,
);
console.log(
  `LeetCode: ${snapshot.solved.total} solved, ${days.filter((day) => day.count > 0).length} active days. Snapshot saved.`,
);
