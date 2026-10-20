# LeetCode data and refresh

The portfolio is a static Next.js export hosted on GitHub Pages. The browser imports
`data/leetcode.json`; it does not query LeetCode at runtime. `updatedAt` is the UTC
time at which the live snapshot was acquired, not the build or deployment time.
The UI displays that timestamp, including the time and UTC zone.

## Source and metrics

`npm run update:leetcode` sends a public, unauthenticated GraphQL request to
`https://leetcode.com/graphql/` for **AlexToday111**. All four solved counts come
from the same `matchedUser.submitStatsGlobal.acSubmissionNum` response. The total
must equal Easy + Medium + Hard. The heatmap uses `submissionCalendar`, a different
metric counting submissions, including repeat attempts. Activity totals and streaks
are calculated from that calendar, not from solved counts. Missing dates in a
valid nonempty source calendar mean no submissions on those dates.

## Validation and failure behavior

`leetcode-snapshot.mjs` checks the profile, timestamp, complete difficulty counts,
nonnegative integer values, their sum, and the complete saved 365-day window.
Empty calendars, zeroed solved counts, partial GraphQL responses, malformed data,
future timestamps, older snapshots and regressing solved counts are rejected.
Writes use a temporary file and atomic rename. A failed request never changes the
last successful timestamp. The updater retries three times with a 20-second timeout
per request, then retains the newest valid saved snapshot. With no valid source or
fallback, it fails the build instead of manufacturing data.

## GitHub Pages automation

`.github/workflows/pages.yml` runs on main pushes, manual dispatch, and daily at
03:17 UTC (06:17 Moscow time; GitHub may delay scheduled jobs). Before refresh it
restores `.cache/leetcode/leetcode.json` using GitHub Actions cache. The updater
compares the cache and checked-in JSON by freshness, refreshes and validates, then
saves a run-specific cache before building. `LEETCODE_CACHE_PATH` is optional for
local runs. No credentials are needed or exposed. The existing Pages deployment
concurrency group prevents overlapping deployments.

Caches can expire or be evicted. The checked-in JSON remains a validated fallback;
it should be refreshed before releases. An unexpected legitimate decrease in solved
counts requires manual investigation rather than silently relaxing validation.
This conservative policy is deliberate for this active profile.

## Discrepancy audit (20 October 2026)

- The checked-in JSON was dated 8 October: **1481 = 797 + 352 + 332**.
- The earlier updater changed JSON only in its build workspace. It neither committed
  the refreshed file nor persisted a fallback between workflow runs. A local build
  therefore rendered the old checkout even when a previous deployment used newer data.
- The 18 October scheduled deployment succeeded. The 19 October run failed during
  **Build static site**; the LeetCode refresh step succeeded. This identifies a build
  failure, not an API failure. Its precise build error was not verified in this audit.
- **1717 = 797 + 407 + 513** is internally consistent, but those historical values
  have not been independently verified from the old deployment artifact.
- The live endpoint was successfully queried for the correct profile on 20 October:
  **1767 = 797 + 456 + 514**. The checked-in snapshot now contains that verified result
  and the actual returned submission calendar. Neither older screenshot was assumed
  to represent the current profile.

Tests: `scripts/leetcode-snapshot.test.js` covers validation, regression protection,
API failures, retries, persisted fallback selection and atomic writes.
