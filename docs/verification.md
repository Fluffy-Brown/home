# Website verification - 1 October 2026

## Game studio redesign

The redesign is prepared on isolated local branch
`dot/game-studio-redesign-local`. The remote review branch remains at `2faac72`.
This revision has no remote write, new remote CI run, merge or production deploy.

- All five public pages share the new dark, colourful visual direction: local
  Bungee display typography, mint/yellow/coral accents, large game artwork,
  angled posters, playful studio emblem and clear contact navigation.
- Homepage game cards include richer summaries and three gameplay highlights.
- Both game pages use illustrated chapters, section navigation, expandable system
  explanations, annotated screenshots and keyboard-accessible image dialogs.
- MunchMiner covers excavation and inventory, permanent station Dudu and relay
  freight, facilities and power capacity, workshop samples/batches and recipes,
  shared building research, evening-market service, staff and settlement. Offline
  solo play, development status and Marksa's story remain explicit.
- Circuit Stance covers modular chip programming, battle stance choices, arena
  feedback, iterative builds and tiered rank. Current project cover/title assets
  and official release-trailer captures replace the rejected public imagery.
  Original character art/stories remain archived without a public legacy gallery.
- Source notes use project-relative references and include image provenance.

## Passed checks

- `npm run build`: five static pages plus sitemap and robots.txt.
- `npm run check`: descriptions, canonical hostname, language, main landmark,
  one h1, image alt text, internal file/anchor targets, valid JSON-LD, no placeholder
  CTAs or missing development-source loader, unchanged CNAME.
- JavaScript source syntax, Git whitespace and deterministic generated output.
- Installed Microsoft Edge with Playwright, using the MT local preview.
- Twenty route/viewport checks: home, MunchMiner, Circuit Stance, studio and 404
  at 320, 390, 768 and 1440 pixels. No horizontal overflow, broken visible images
  or runtime exceptions. Lazy images were scrolled into view and decoded.
- Direct navigation and refresh work for every page; unknown routes render a
  complete 404 with working navigation.
- Nineteen axe WCAG 2 A/AA and WCAG 2.1 AA scans: five pages at desktop/mobile,
  one initial screenshot dialog, both fully expanded game pages at desktop/mobile,
  and four additional open-dialog states. Zero violations.
- Six additional responsive checks: all game anchors land below the sticky
  header, and all system explanations/notes fit at 1440, 390 and 320 pixels.
- Mobile menu expansion, Escape/focus return and studio navigation.
- Gallery opening, next/arrow keys, Escape, dialog width and focus restoration.
- FAQ disclosure, first keyboard skip link and main focus.
- Mobile content/navigation with JavaScript disabled.
- Reduced-motion removes smooth scrolling and decorative poster rotation.
- Current trailer images are present; rejected static stills and historical
  character cards are absent from the rendered Circuit Stance page.
- Desktop/mobile pages, gameplay chapters, menu, FAQ and gallery states were
  visually inspected. Focused section captures temporarily hide the sticky
  navigation overlay only in the screenshot, so section text remains visible.
- Retained Steam and Facebook links were verified in this review session. No new
  external destinations were introduced; the expired Discord invite is omitted.

## Baseline and practical limits

The original live homepage loaded on MT with HTTP 200. At 390 pixels its scroll
width was 1163 pixels. The original direct `/about-us` route rendered an empty
body because the 404 entry loaded missing development source. The local redesign
fits all tested widths and uses physical directory pages for direct routing.

The shared client script is 2876 bytes and stylesheet is 33527 bytes. There are
40 optimized media files totalling 5075216 bytes, including archived earlier
screenshots. The public pages request the selected responsive WebP assets, with
explicit geometry and below-fold lazy loading. Fonts are local with font-display
swap. No framework or runtime CDN requests are required.

Automated accessibility checks and visual review do not constitute full
assistive-technology certification. No real iOS/Android device, Safari session
or Lighthouse score is claimed. The previous remote refresh had passing CI;
this redesigned revision is local and has no new remote CI result. Live
post-publication checks await approval and publication through the existing
GitHub Pages deployment.
