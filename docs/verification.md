# Website verification — 1 October 2026

## Expanded game-information revision

This revision is prepared on the isolated local branch
`dot/game-details-revision-local`. The remote review branch remains at `2faac72`;
the revision has not been pushed, merged or deployed.

- Homepage: richer summaries and three gameplay highlights for each game.
- MunchMiner: excavation and inventory, automatic station freight, relay delivery,
  facility roles and power capacity, first-sample/batch recipes, shared building
  research, and the sequence of evening-market service and settlement.
- Circuit Stance: modular chip builds, character/board preparation, reading arena
  feedback, iterative testing and the documented tiered ranking.
- Both game pages: six section-navigation links and four annotated screenshots.
  All original character stories remain intact. Current MunchMiner offline solo
  and in-development status remains explicit.
- Content evidence now uses project-relative source references without absolute
  workstation paths or local working-copy details.
- Fresh browser run: all twenty route/viewport checks and eleven axe scans passed,
  with no overflow, broken images, runtime exceptions or violations. The complete
  interaction suite passed, including every new section anchor and preserved lore.
- Four additional game-page checks (desktop/mobile for both games): exact anchor
  scroll offset below the sticky header, expanded screenshot captions, open-dialog
  axe scans, dialog width and Escape/focus restoration all passed.
- Full game-page screenshots and focused gameplay-section previews were visually
  inspected. Focused section captures hide the navigation overlay only while
  capturing the image, so all section text is visible; the site itself is unchanged.
- Build, internal links/anchors, metadata, structured data, source syntax and Git
  whitespace checks passed. No new external destinations were introduced.

The previous remote commit's validation workflow succeeded. This local revision
has no new remote CI result; publishing the review branch awaits an approved route.

## Final passing checks

- `npm run build`: five static pages plus sitemap and robots.txt, no install required.
- `npm run check`: page language, descriptions, canonical hostname, main landmark,
  one h1, alt text, internal file/anchor targets, valid JSON-LD, no placeholder CTAs
  or missing source loader, unchanged CNAME.
- JavaScript syntax check and Git whitespace check.
- Browser: installed Microsoft Edge via Playwright, local preview on MT.
- Twenty page/viewport checks: home, MunchMiner, Circuit Stance, studio and 404 at
  320, 390, 768 and 1440 pixels; no overflow, missing images or runtime exceptions.
  Lazy images were scrolled into view and decoded before validation/screenshots.
- Direct navigation and refresh work for every page. Unknown routes render a
  complete 404 with working navigation.
- Eleven axe WCAG 2 A/AA and WCAG 2.1 AA checks: five pages at desktop and mobile,
  plus the open screenshot dialog; zero violations in the final run.
- Mobile menu expands, Escape closes it and returns focus, and studio navigation works.
- Screenshot viewer: opening, next, arrow keys, Escape and focus restoration pass.
- FAQ disclosure, first keyboard skip link and main focus pass.
- Mobile pages/navigation remain available with JavaScript disabled.
- Reduced-motion removes smooth scrolling and decorative hero rotation.
- Desktop/mobile full-page screenshots and menu/dialog/FAQ states were visibly reviewed.
- Official Steam page and retained Facebook destination returned HTTP 200.
  The expired Discord invite returned Unknown Invite and was omitted.

## Baseline and practical limits

The live homepage loaded locally with HTTP 200. At 390 pixels its scroll width was
1163 pixels. The live `/about-us` refresh had an empty body because the 404 entry
loaded missing development source. The final local pages fit each tested viewport.

The new client script is approximately 3 KB, stylesheet approximately 19 KB, and
all 24 new responsive screenshot variants total 2,876,516 bytes. Images are locally
hosted WebP, sized responsively, with explicit geometry and below-fold lazy loading.
Fonts are local with font-display swap; there are no framework or CDN requests.

Automated accessibility checks and visual inspection do not constitute a full
assistive-technology certification. No real iOS/Android device or Safari session
was available in this execution environment. No Lighthouse score is claimed.
Live post-publication checks await user approval and production publication.
The new GitHub validation workflow is checked separately after the review-branch push.
