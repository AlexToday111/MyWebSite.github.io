import { fileURLToPath } from "node:url";
import { refreshLeetCode, USERNAME } from "./leetcode-snapshot.mjs";

if (process.argv[2] && process.argv[2] !== USERNAME) {
  throw new Error(
    `This portfolio is mapped to ${USERNAME}; refusing a different profile`,
  );
}
await refreshLeetCode({
  snapshotPath: fileURLToPath(
    new URL("../data/leetcode.json", import.meta.url),
  ),
  cachePath: process.env.LEETCODE_CACHE_PATH,
});
