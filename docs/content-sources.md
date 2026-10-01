# Content evidence — reviewed 1 October 2026

## Identity and deployment

- Existing repository: https://github.com/Fluffy-Brown/home
- Existing CNAME: `www.fluffybrown.com` (retained exactly).
- Baseline commit: `e38e343f24fbb3073f75852fc7a055ca1e801751`.
- Live GET of https://fluffybrown.com redirected to https://www.fluffybrown.com,
  then returned HTTP 200 from GitHub Pages. The live entry matched repository output.
- The original repository had compiled Vue/Element Plus bundles, no package.json,
  application source, AGENTS.md or checked-in deployment workflow.
- Original 404.html loaded nonexistent `/src/main.ts`. The refresh replaces it with
  a full static error page and creates physical directories for each public route.
- Production Pages configuration must remain unchanged. The added check workflow
  is validation only, with read-only repository permissions.
- Existing public deployment `2227350307` records ref `main` and the same baseline
  SHA, with a successful `github-pages` status on 21 February 2025. Publication of
  approved changes should use this existing main-to-Pages path.

## Circuit Stance

- Official Steam: https://store.steampowered.com/app/3180830/
- Official app details: https://store.steampowered.com/api/appdetails?appids=3180830
- Retrieved on 1 October 2026: title `Circuit Stance`, developer `Fluffy Brown`,
  publisher `Anotherindie`, `release_date.coming_soon=false`. The API lists
  `12 Aug, 2026`; the website uses the simpler supported status “Available on Steam”.
- Descriptions of modular robot AI chips, arena strategy and iterative tactical
  builds are based on the official store description. No unsupported platform,
  multiplayer-mode, award or audience claims were added.
- `media/circuit-stance-1` through `-4` are faithful WebP conversions of the
  first four current official Steam screenshots. No scene elements were added.
- The existing logo, four character artworks and complete character stories from
  config.json are retained under “From our original character gallery”. This
  does not assert that the historical gallery is the current shipped roster.

## MunchMiner

- Existing local project: `C:\Users\mtsai\Desktop\workspace\MunchMiner`.
- Existing remote: `git@github.com:Fluffy-Brown/MunchMiner.git`.
- Local HEAD when reviewed: `b789e3857ead780bbc44f6ecba18e22b4b2b1f4a`;
  uncommitted authoritative-document edits took precedence over historical HEAD text.
- Authoritative reading entry: `Docs/README.md`, including its current
  2026-09-30 overrides and explicit warnings that older player guides are historical.
- Exact authoritative specification:
  `C:\Users\mtsai\Desktop\workspace\MunchMiner\Docs\MunchMiner-Gameplay-Implementation-Spec-v0.5.md`.
  Its current top clauses were read on 1 October 2026, including 2026-09-30
  town research, retired personal-Dudu access, permanent station Dudu, logistics,
  and survival corrections. This local working copy contained pre-existing user
  edits; it was read only and neither reset nor committed by this website task.
- Product background: `Docs/MunchMiner-Game-Design-Document.md` (last synchronized
  2026-09-16), read with the newer implementation specification taking precedence.
- Supported high-level current direction: one red-helmet miner, fixed side-view 2D,
  offline solo play, excavation, rails and powered facilities, station Dudu freight,
  workshop toy recipes, and an evening toy market. Marksa's would-be villainy
  and village story are from the project design document.
- No release date, target platform, downloadable build or MunchMiner store link
  was verified. The site says “In development” and promises only to publish
  availability information when confirmed.
- The local `steam_appid.txt` is 3180830, matching Circuit Stance. It is a legacy
  reused value and must not be used as MunchMiner's store link.
- Development screenshots, visibly inspected before use:
  - `Docs/Verification/Network/02-fresh-town.png` → `media/munchminer-town-*`
  - `Docs/Verification/Network/13-original-first-station.png` → `media/munchminer-mine-*`
  - `Docs/Verification/NetworkV2/09-fresh-D-crafted-stall-selection.png` → `media/munchminer-workshop-*`
  - `Docs/Verification/NetworkV2/08-fresh-D-market-entry.png` → `media/munchminer-market-*`
- Screenshot folder names do not establish multiplayer. These are development
  images; page captions state that visuals and gameplay may change. Candidate
  and historical screenshots do not establish complete gameplay acceptance.

## Contact and links

- `info@fluffybrown.com`, Melbourne + World and Facebook profile
  https://www.facebook.com/profile.php?id=61556983167805 come from the original site.
- The original X and Steam `#` placeholders are removed from rendered navigation.
  The verified Circuit Stance Steam URL replaces the store placeholder.
- Original Discord invite `jR5CJsfc` returned Discord API code 10006
  (`Unknown Invite`) on 1 October 2026. It is omitted until a new official invite
  is verified. Do not invent a replacement.
