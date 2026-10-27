# Development

- `app/` — pages, global styles and application providers.
- `components/` — UI grouped by section: `intro`, `profile`, `projects`, `social`; shared state lives in `providers`.
- `data/` — profile, education, project content and translations.
- `public/` — local images, logos, icons and fonts.
- `lib/` — shared utilities; `scripts/` — LeetCode snapshot updates.
- Tests live next to the code they cover.

Run `npm run lint`, `npm run typecheck` and `npm test` before publishing.
`npm run build` exports the website to `out/`; GitHub Pages deploys that directory.

See [LeetCode updates](leetcode.md) and [achievement logo sources](achievement-logos.md).
