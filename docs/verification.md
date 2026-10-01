# Website verification — 1 October 2026

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
