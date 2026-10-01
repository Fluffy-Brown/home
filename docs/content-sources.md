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
- Expanded player guide: the store explicitly describes a turn-based strategy
  roguelike, modular chip actions, iterative testing and tiered scoring with wins
  raising rank and losses risking a restart. The programming/arena examples are
  limited to those systems and visibly present character selection, stat panels,
  hexagonal chip boards and health bars in the official screenshots. No specific
  chip effect, preset build, unlock count or unverified combat mode is claimed.
- The current official store's static screenshot list was freshly downloaded and
  inspected on 1 October 2026. Its first four URLs still match the previously used
  images. Those images were not presented as newly updated artwork.
- The redesigned public pages instead use faithful captures from the first-listed
  official **Release Trailer**, Steam movie ID **257398019**. The current API
  identifies video asset 1323588216 and the following official DASH source:
  https://video.akamai.steamstatic.com/store_trailers/3180830/1323588216/5921cae35ce21b54c79946909bc00ff7be9f6de4/1786608596/dash_h264.mpd?t=1786609656
- Selected captures: chip board and shop at **00:23**, arena at **00:38**, battle
  stance choices at **00:33**, Hall of Fame at **00:58**. Captions identify their
  source and time. Stance descriptions are limited to the visible cooldown/action
  effects; no quantities, percentages or unverified modes are promoted.
- Circuit Stance's existing project is Fluffy-Brown/HelloWar. Project settings
  identify productName CircuitStance, company FluffyBrown and Steam app 3180830.
  The inspected project revision was
  **0beff776bd25c785e51a054475b21b4e8bbabf54**, dated 10 September 2026.
- Current project cover: `HelloWar/Assets/Image/NEW/CoverBG.png` (last asset
  commit `4f15d54ccb5f736af49d07a9553e4609686908e9`, 8 April 2026).
  Current transparent title: `HelloWar/Assets/Resources/GameLogo/GameTitle.png`
  (last asset commit `d2d2653f909389fb253b22880c733c68e514e4c4`, 20 May 2026).
  The homepage treats the cover/title as artwork, separately from gameplay captures.
- All selected images were visually inspected. WebP conversion and responsive
  resizing preserve their aspect ratio and scene contents. Original transparency
  is preserved on the title art. Source hashes are in assets-provenance.json.
- The historical four-character gallery is no longer rendered publicly. Original
  character assets and complete stories remain archived in config.json and
  characters/. They are not asserted to represent the current shipped roster.

## MunchMiner

- Project repository: https://github.com/Fluffy-Brown/MunchMiner
- Authoritative reading entry: `Docs/README.md`, including its current
  2026-09-30 overrides and explicit warnings that older player guides are historical.
- Exact authoritative specification:
  `Docs/MunchMiner-Gameplay-Implementation-Spec-v0.5.md` in the MunchMiner project.
  Its current top clauses were read on 1 October 2026, including 2026-09-30
  town research, retired personal-Dudu access, permanent station Dudu, logistics,
  and survival corrections. Later dated overrides take precedence over historical
  passages in the same document.
- Product background: `Docs/MunchMiner-Game-Design-Document.md` (last synchronized
  2026-09-16), read with the newer implementation specification taking precedence.
- Supported high-level current direction: one red-helmet miner, fixed side-view 2D,
  offline solo play, excavation, rails and powered facilities, station Dudu freight,
  workshop toy recipes, and an evening toy market. Marksa's would-be villainy
  and village story are from the project design document.
- Expanded excavation and logistics guide follows the 2026-09-30 current clauses:
  no player stamina costs; moisture recovery through plasma contact; permanent,
  always-automatic station Dudu; town research shared by building kind; higher
  eligible material levels for stations/minefields. The 2026-09-29 electricity,
  relay and terrain clauses establish circuit overload, powered rail routes,
  player-built rift exits and the relationship between ground, rails and ropes.
  The continuous-time override establishes persistent terrain/cargo and active
  mine simulation in town, with settlement only at actual exit arrival and no
  offline progression. Retired personal cart fleets, manual dispatch and older
  stamina/water mechanics are not promoted.
- Workshop sections 4.2–4.3 establish three successful first-sample assembly
  steps, learned batch recipes, unchanged quality of existing stock after recipe
  upgrades, finished-stock selection, staff roles and wages. The three displayed
  mineral recipe examples use the documented Iron Toy Mine Cart, Wind-up Frog
  and Crystal Kaleidoscope ingredient sets and single-toy yields.
- Evening-market sections 5.1–5.4 establish exact toy requests, customer patience,
  recruitment and escort, one-at-a-time on-site production after arrival, separate
  handover/payment, toy-horn promotion and settlement. Tower copy follows the
  player-facing summary: sales feed the tower and stronger signals attract more
  humans. No numeric progression targets or guaranteed income are advertised.
- No release date, target platform, downloadable build or MunchMiner store link
  was verified. The site says “In development” and promises only to publish
  availability information when confirmed.
- The project's `steam_appid.txt` is 3180830, matching Circuit Stance. It is a legacy
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

## Typography

- Bungee display typeface and its OFL license were downloaded from the official
  Google Fonts repository on 1 October 2026:
  https://github.com/google/fonts/tree/main/ofl/bungee
- Existing local Poppins body fonts are retained. Fonts are served locally with
  font-display swap; there are no runtime font-service requests.
