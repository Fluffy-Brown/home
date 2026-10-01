# Fluffy Brown official website

The existing public GitHub Pages repository for **https://www.fluffybrown.com**.
`CNAME` preserves the existing domain. Production publication remains approval-gated.

The previous repository contained compiled Vue/Element Plus output only, with no
editable application source or package manifest. The refreshed site uses generated
static HTML with a shared stylesheet and a small progressive enhancement script.
There are no runtime libraries or external font/icon requests.

## Build and preview

Use Node.js 20 or newer. No dependency installation is required.

```sh
npm run build
npm run check
npm run serve
```

Preview at http://127.0.0.1:4173. Pages live at `/`, `/munchminer/`,
`/circuit-stance/`, and `/about-us/`. Directory pages support direct navigation
and refresh on GitHub Pages. `404.html` is a complete rendered page.

## Edit

- `content/games.json`: current project names, descriptions, status and verified links.
- `scripts/build.mjs`: page templates, shared navigation/footer and metadata.
- `assets/site.css`: responsive layout, typography and reduced-motion support.
- `assets/site.js`: mobile menu and keyboard-accessible screenshot viewer.
- `media/`: optimized, faithfully resized game screenshots in 640/1280/1920 variants.
- `config.json`, `characters/`, and the original game images: retained original
  Circuit Stance material. The generator preserves the original character stories.

Run build after edits and commit the source and generated pages together.
The check workflow verifies the generated files are up to date; it does not deploy.

## Publication and maintenance

Dot is the website maintainer. See [maintenance](docs/maintenance.md) and
[content evidence](docs/content-sources.md). Propose changes on a review branch.
Do not merge to `main`, change Pages settings, or publish production without
the user's approval of the concrete tested changes.
