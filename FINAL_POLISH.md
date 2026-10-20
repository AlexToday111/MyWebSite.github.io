# Final polish: implementation report

## Completed

- Protected splash markup and behavior unchanged; original logo files unchanged.
- Added visible carousel progress, stronger 44px controls, localized source-code links,
  optical logo presentation settings, and verified bilingual technical descriptions/highlights.
- Corrected GPA formatting and competition wording; clarified existing experience text
  without adding metrics. Preserved all 16 projects, original stacks, URLs and category order.
- Refreshed the real LeetCode snapshot and added validation, retries, atomic writes,
  regression protection and persisted fallback data in the existing Pages workflow.

## Files changed in this refinement

- `.github/workflows/pages.yml`
- `.gitignore`
- `app/globals.css`
- `components/LeetCodeHeatmap.tsx`
- `components/ProjectCarousel.tsx`
- `components/ProjectCarousel.module.css`
- `components/ProjectCarousel.test.tsx`
- `components/ProjectPreview.tsx`
- `components/ProjectPreview.test.tsx` (new)
- `components/ProfileSection.tsx`
- `components/ProfileSection.module.css`
- `data/leetcode.json`
- `data/projects.ts`
- `data/project-language.ts`
- `data/project-logo-presentation.ts` (new)
- `data/profile.ts`
- `data/profile-language.ts`
- `scripts/update-leetcode.mjs`
- `scripts/leetcode-snapshot.mjs` (new)
- `scripts/leetcode-snapshot.test.js` (new)
- `scripts/LEETCODE.md` (new)
- `FINAL_POLISH.md` (this report)

Existing uncommitted work from earlier portfolio tasks was retained.

## LeetCode findings

See [data reliability audit](scripts/LEETCODE.md) for sources and failure behavior.
The old local snapshot was dated 8 October, while workflow refreshes existed only
inside deployment workspaces. Live verification on 20 October returned
1767 = 797 + 456 + 514. The saved JSON now records that response and acquisition time.
The historical 1717 screenshot was not independently verified. The 19 October
workflow failed at site build, after a successful statistics refresh; its precise
build error was not established. No cache-caused failure was asserted without evidence.

## Validation

- Production build: passed, including the final content edits.
- TypeScript: passed.
- Vitest: 34 tests passed across four files.
- ESLint with the existing installed Next core-web-vitals configuration: no errors;
  two advisory warnings for image elements in ProjectPreview. The repository's default
  `npm run lint` still needs an ESLint configuration; the explicit-config lint run
  was used without adding unrelated repository-wide lint changes.
- Export integrity: 16 cards/highlights, 365 heatmap cells, unchanged contact links,
  matching successful-update timestamp and unchanged protected home-page file.
- Carousel calculations tested with simulated 1440, 1024, 768, 390 and 360px layouts;
  tests include scroll/swipe event updates, keyboard navigation, limits, resize,
  independent categories and reduced motion.

## Manual follow-up

No browser was available in this session. Visual layout, optical logo balance,
real touch/trackpad gestures and absence of overflow need review at all five widths.
The updated GitHub Actions cache/refresh flow needs its first real workflow run
once these changes are published. Actions caches may expire; the checked-in verified
snapshot remains the fallback. No changes were published during this task.
Existing build notices about metadata viewport/themeColor and Browserslist remain.
