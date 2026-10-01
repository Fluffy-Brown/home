import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = JSON.parse(
  await fs.readFile(path.join(root, "content/games.json"), "utf8"),
);
const guides = JSON.parse(
  await fs.readFile(path.join(root, "content/game-guides.json"), "utf8"),
);
const legacy = JSON.parse(
  await fs.readFile(path.join(root, "config.json"), "utf8"),
);
const [mine, circuit] = content.games;
const domain = "https://www.fluffybrown.com";
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arrow = '<span aria-hidden="true">↗</span>';
const button = (href, label, secondary = false) =>
  `<a class="button${secondary ? " button-secondary" : ""}" href="${esc(href)}">${esc(label)} ${arrow}</a>`;
const image = (
  name,
  alt,
  { hero = false, classes = "", sizes = "(max-width: 800px) 100vw, 55vw" } = {},
) =>
  `<img class="${classes}" src="/media/${name}-1280.webp" srcset="/media/${name}-640.webp 640w, /media/${name}-1280.webp 1280w, /media/${name}-1920.webp 1920w" sizes="${sizes}" width="1920" height="1080" alt="${esc(alt)}" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const status = (g) => `<span class="status">${esc(g.status)}</span>`;
const tags = (g) =>
  `<ul class="tags" aria-label="Game features">${g.tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const header = (active) =>
  `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="Fluffy Brown home"><img src="/favicon.png" alt="" width="44" height="44"><span>FLUFFY<br>BROWN<span class="brand-sub">INDEPENDENT GAME STUDIO</span></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu <span aria-hidden="true">☰</span></button><nav id="site-nav" aria-label="Main navigation"><a href="/#games"${active === "games" ? ' aria-current="page"' : ""}>Our games</a><a href="/about-us/"${active === "about" ? ' aria-current="page"' : ""}>The studio</a><a class="nav-contact" href="#contact">Say hello ${arrow}</a></nav></div></header>`;
const footer = `<footer class="site-footer" id="contact"><div class="wrap footer-top"><div><p class="eyebrow">PRESS / PUBLISHING / GOOD CONVERSATIONS</p><h2>LET'S MAKE<br><em>SOMETHING<br>PLAYFUL.</em></h2><a class="email" href="mailto:info@fluffybrown.com">info@fluffybrown.com ${arrow}</a></div><div class="footer-right"><img class="footer-mascot" src="/icon-big.png" alt="Fluffy Brown studio emblem" width="240" height="240"><div class="footer-links"><a href="/munchminer/">MunchMiner</a><a href="/circuit-stance/">Circuit Stance</a><a href="${circuit.store}">Circuit Stance on Steam ${arrow}</a><a href="${esc(legacy.social.facebook)}">Facebook ${arrow}</a><a href="/about-us/">Meet the studio</a></div></div></div><div class="wrap footer-bottom"><span>© ${content.reviewed.slice(0, 4)} Fluffy Brown</span><span>MELBOURNE + WORLD</span><a href="#top">Back to top ↑</a></div></footer>`;
const dialog = `<dialog class="image-dialog" aria-labelledby="image-caption"><form method="dialog"><button class="dialog-close" aria-label="Close screenshot">Close ×</button></form><img id="dialog-image" src="/favicon.png" alt=""><div class="dialog-controls"><button type="button" data-previous aria-label="Previous screenshot">← Previous</button><p id="image-caption"></p><button type="button" data-next aria-label="Next screenshot">Next →</button></div></dialog>`;
const poster = (g, { hero = false } = {}) =>
  `<div class="game-poster ${g.id === "munchminer" ? "mine-poster" : "circuit-poster"}">${image(g.id === "munchminer" ? "munchminer-town" : "circuit-cover", g.id === "munchminer" ? mine.alt : "Circuit Stance cover artwork from the current game project", { hero })}${g.id === "circuit-stance" ? '<img class="game-title-art" src="/media/circuit-title.webp" alt="Circuit Stance" width="442" height="184">' : ""}</div>`;
const page = (
  route,
  title,
  description,
  body,
  {
    active = "",
    theme = "studio",
    imageName = "munchminer-town",
    schema = null,
    noindex = false,
  } = {},
) =>
  `<!doctype html><html lang="en" id="top"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#121520">${noindex ? '<meta name="robots" content="noindex">' : ""}<link rel="canonical" href="${domain}${route}"><meta property="og:type" content="website"><meta property="og:site_name" content="Fluffy Brown"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${domain}${route}"><meta property="og:image" content="${domain}/media/${imageName}-1280.webp"><meta property="og:image:alt" content="${esc(imageName === "munchminer-town" ? mine.alt : "Circuit Stance official release trailer capture")}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/assets/site.css"><script src="/assets/site.js" defer></script>${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>` : ""}</head><body class="theme-${theme}">${header(active)}<main id="main" tabindex="-1">${body}</main>${footer}${dialog}</body></html>\n`;
const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fluffy Brown",
  url: domain,
  email: "info@fluffybrown.com",
  logo: domain + "/favicon.png",
  sameAs: [legacy.social.facebook],
};
const gameSchema = (g) => ({
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: g.name,
  url: domain + g.url,
  description: g.description,
  image: domain + `/media/${g.image}-1280.webp`,
  creator: { "@type": "Organization", name: "Fluffy Brown", url: domain },
  ...(g.store ? { sameAs: g.store } : { playMode: "SinglePlayer" }),
});
const gamesGrid = `<div class="showcase-grid">${content.games.map((g, i) => `<article class="showcase-card showcase-${g.id}"><a class="showcase-art" href="${g.url}" aria-label="Explore ${g.name}">${poster(g)}<span class="card-index" aria-hidden="true">0${i + 1}</span></a><div class="showcase-copy">${status(g)}<p class="eyebrow">${esc(g.genre)}</p><h3><a href="${g.url}">${esc(g.name)} ${arrow}</a></h3><p>${esc(g.homeSummary)}</p><ul class="game-highlights">${g.homeHighlights.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><div class="actions">${button(g.url, "Explore the game")}${g.store ? button(g.store, "Visit Steam", true) : ""}</div></div></article>`).join("")}</div>`;
const homepage = `<section class="studio-hero wrap"><div class="studio-hero-copy"><p class="eyebrow"><span class="signal-dot" aria-hidden="true"></span> MADE WITH A LITTLE MISCHIEF</p><h1 aria-label="Playful worlds. Clever chaos.">PLAYFUL<br><span class="word-outline">WORLDS.</span><br><em>CLEVER<br>CHAOS.</em></h1><p class="hero-description">Dig a new route. Build a robot's brain.<br>Make your next wild idea work.</p><div class="actions">${button("#games", "Enter our worlds")}${button("/about-us/", "Meet the studio", true)}</div></div><div class="hero-art"><span class="orbit orbit-one" aria-hidden="true"></span><span class="orbit orbit-two" aria-hidden="true"></span><a class="hero-world hero-world-mine" href="/munchminer/" aria-label="Explore MunchMiner">${poster(mine, { hero: true })}<span class="hero-world-label"><strong>MunchMiner</strong><span>ON THE WORKBENCH ${arrow}</span></span></a><a class="hero-world hero-world-circuit" href="/circuit-stance/" aria-label="Explore Circuit Stance">${poster(circuit, { hero: true })}<span class="hero-world-label"><strong>Circuit Stance</strong><span>ON STEAM ${arrow}</span></span></a><span class="hero-sticker" aria-hidden="true">SMALL TEAM.<br>BIG PLAYGROUND.</span><span class="spark spark-one" aria-hidden="true">✦</span><span class="spark spark-two" aria-hidden="true">✦</span></div></section><div class="studio-ribbon" aria-hidden="true"><div>CURIOUS WORLDS <span>✦</span> CLEVER SYSTEMS <span>✦</span> FLUFFY BROWN <span>✦</span> CURIOUS WORLDS <span>✦</span> CLEVER SYSTEMS</div></div><section class="section wrap" id="games"><div class="section-heading"><div><p class="eyebrow">PICK YOUR PLAYGROUND</p><h2>OUR GAMES<span class="punctuation">.</span></h2></div><p>Two worlds. Different kinds of trouble.<br>Your ideas are welcome in both.</p></div>${gamesGrid}</section><section class="studio-story"><div class="wrap studio-story-grid"><div><p class="eyebrow">INDEPENDENT. CURIOUS. A LITTLE UNEXPECTED.</p><h2>GOOD GAMES<br>START WITH<br><em>“WHAT IF?”</em></h2></div><div><p class="large-copy">We're Fluffy Brown, a small independent game studio based in Melbourne and connected across the world.</p><p>We like worlds with personality and systems you can get your hands on. Make a plan, try something unusual, and enjoy the moment it all clicks.</p>${button("/about-us/", "Get to know the studio", true)}</div></div></section>`;
const gameNavigation = (guide) =>
  `<nav class="game-navigation wrap" aria-label="On this game page"><span class="eyebrow">JUMP IN</span><ul>${guide.navigation.map(([id, label]) => `<li><a href="#${esc(id)}">${esc(label)}</a></li>`).join("")}</ul></nav>`;
const gameHero = (g, headline) =>
  `<section class="game-hero"><div class="wrap"><a class="breadcrumb" href="/#games">← All games</a><div class="game-intro"><div class="game-hero-copy">${status(g)}<p class="eyebrow">${esc(g.genre)}</p><h1>${esc(g.name)}</h1><p class="game-headline">${headline}</p><p class="game-description">${esc(g.description)}</p>${tags(g)}<div class="actions">${button(g.store || "#the-game", g.store ? "View on Steam" : "Explore the game")}${button(g.store ? "#screenshots" : "#evening-market", g.store ? "See it in action" : "Meet the market", true)}</div></div><div class="game-cover">${g.store ? `<div class="game-poster">${image("circuit-release-build", circuit.alt, { hero: true })}</div>` : poster(g, { hero: true })}<p class="caption">${g.store ? "Chip-board preparation from the current official Steam release trailer." : "Development build. Visuals and gameplay may change."}</p></div></div></div></section>`;
const loop = (g) =>
  `<section class="game-loop section wrap" id="the-game"><div class="section-heading"><div><p class="eyebrow">THE PLAYING PART</p><h2>${g.id === "munchminer" ? "ONE HAUL.<br>LOTS OF POSSIBILITIES." : "YOUR BUILD.<br>ITS MOMENT OF TRUTH."}</h2></div><p>${g.id === "munchminer" ? "The mine and the market are<br>two halves of the same plan." : "Program. Test. Rethink.<br>Then take the next challenge."}</p></div><ol class="loop-track">${g.steps.map(([title, text], i) => `<li><span class="loop-number" aria-hidden="true">0${i + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join("")}</ol></section>`;
const chapter = (section, index, asset, caption) =>
  `<section class="game-chapter ${index % 2 ? "chapter-reverse" : ""}" id="${esc(section.id)}"><div class="wrap chapter-grid"><div class="chapter-visual">${image(asset, caption)}<span class="chapter-badge" aria-hidden="true">0${index + 1}</span><p class="caption">${esc(caption)}</p></div><div class="chapter-copy"><p class="eyebrow">${esc(section.eyebrow)}</p><h2>${esc(section.title)}</h2><p>${esc(section.intro)}</p><div class="system-list">${section.cards.map((card, i) => `<details class="system-row"${i === 0 ? " open" : ""}><summary><span>${esc(card.title)}</span><span class="plus-icon" aria-hidden="true">+</span></summary>${card.paragraphs.map((text) => `<p>${esc(text)}</p>`).join("")}</details>`).join("")}</div>${section.recipes ? `<div class="recipe-examples"><h3>ON THE WORKBENCH</h3><ul>${section.recipes.map(([toy, ingredients]) => `<li><strong>${esc(toy)}</strong><span>${esc(ingredients)} → 1 toy</span></li>`).join("")}</ul><p>${esc(section.recipeNote)}</p></div>` : ""}${section.note ? `<details class="system-note"><summary>${section.id === "rail-and-power" ? "What happens while you are in town?" : section.id === "evening-market" ? "How does the market grow?" : section.id === "iteration" ? "A world with personality" : "A little more to know"}</summary><p>${esc(section.note)}</p></details>` : ""}</div></div></section>`;
const gallery = (g, guide) =>
  `<section class="section wrap" id="screenshots"><div class="section-heading"><div><p class="eyebrow">TAKE A CLOSER LOOK</p><h2>${g.id === "munchminer" ? "DOWN THE MINE.<br>OUT TO THE MARKET." : "INSIDE<br>CIRCUIT STANCE."}</h2></div><p>${g.store ? "Captured from the current official<br>Steam release trailer." : "Screens from development builds.<br>The world is still taking shape."}</p></div><div class="gallery" aria-label="${esc(g.name)} gallery">${guide.screenshots.map((shot, i) => `<figure class="screenshot-card"><a class="gallery-link" href="/media/${shot.image}-1920.webp" data-gallery data-caption="${esc(shot.title + ". " + shot.caption)}" aria-label="Enlarge ${shot.title}">${image(shot.image, shot.alt)}<span class="gallery-zoom" aria-hidden="true">↗</span></a><figcaption><span class="shot-index" aria-hidden="true">0${i + 1}</span><div><h3>${esc(shot.title)}</h3><p>${esc(shot.caption)}</p></div></figcaption></figure>`).join("")}</div></section>`;
const mineFAQ = `<section id="faq" class="section wrap faq-section"><div><p class="eyebrow">BEFORE YOU HEAD UNDERGROUND</p><h2>GOOD TO KNOW<span class="punctuation">.</span></h2><p class="reviewed">Information checked <time datetime="${content.reviewed}">1 October 2026</time>.</p></div><div class="faq"><details><summary>What kind of game is MunchMiner?</summary><p>A side-view 2D mining and toy-market adventure. Excavate a persistent mine, connect powered facilities, bring materials home, craft toys and work the evening market.</p></details><details><summary>Can I play solo?</summary><p>Yes. The current game is built for offline single-player play with one red-helmet miner.</p></details><details><summary>Does the mine reset when I return?</summary><p>No. Your excavated terrain, tracks, facilities and cargo persist. Mine production and physical freight continue as the in-game clock advances in town, rest or a market. There is no offline time progression or income.</p></details><details><summary>When can I play?</summary><p>MunchMiner is in development. Release timing, platforms and availability will appear here when confirmed.</p></details><details><summary>Where can I ask about the game?</summary><p>Say hello at <a href="mailto:info@fluffybrown.com">info@fluffybrown.com</a> for questions, press or publishing enquiries.</p></details></div></section>`;
const mineGuide = guides[mine.id],
  circuitGuide = guides[circuit.id];
const mineAssets = [
  "munchminer-mine",
  "munchminer-mine",
  "munchminer-workshop",
  "munchminer-market",
];
const mineCaptions = [
  "Development mine: excavation, rails and stations.",
  "Development mine: connected tracks around a station.",
  "Finished toy stock selected before opening the market.",
  "The evening market before customers arrive.",
];
const minepage = `${gameHero(mine, "DIG DEEP.<br>MAKE TOYS.<br>WORK THE CROWD.")}${gameNavigation(mineGuide)}${loop(mine)}${mineGuide.sections.map((s, i) => chapter(s, i, mineAssets[i], mineCaptions[i])).join("")}<section class="marksa-story"><div class="wrap marksa-grid"><div><p class="eyebrow">A WOULD-BE EVIL EMPLOYER</p><h2>MARKSA HAS<br><em>A PLAN.</em></h2></div><div><p class="large-copy">Conquer the world. Accidentally make the village a better place.</p><p>Work for Marksa, whose grand schemes keep helping the people around him. As the village's red-helmet miner, you turn underground discoveries into something they want to take home.</p></div></div></section>${gallery(mine, mineGuide)}${mineFAQ}`;
const circuitAssets = [
  "circuit-release-build",
  "circuit-release-arena",
  "circuit-release-overview",
];
const circuitCaptions = [
  "Chip programming, captured from the current Steam release trailer.",
  "Arena play, captured from the current Steam release trailer.",
  "A tactical encounter, captured from the current Steam release trailer.",
];
const circuitpage = `${gameHero(circuit, "BUILD A BRAIN.<br>TEST A TACTIC.<br>THINK AGAIN.")}${gameNavigation(circuitGuide)}${loop(circuit)}${circuitGuide.sections.map((s, i) => chapter(s, i, circuitAssets[i], circuitCaptions[i])).join("")}${gallery(circuit, circuitGuide)}<section id="faq" class="section wrap faq-section"><div><p class="eyebrow">READY FOR YOUR NEXT IDEA?</p><h2>START<br>ON STEAM.</h2>${button(circuit.store, "Visit Circuit Stance on Steam")}</div><div class="faq"><details><summary>What is the core of Circuit Stance?</summary><p>Modular AI-chip programming, tactical arena matches and iterative build testing. The official game description presents a turn-based strategy roguelike with tiered scoring.</p></details><details><summary>Where can I see the current game?</summary><p>The <a href="${circuit.store}">official Steam page</a> has the release trailer, game description and availability. The gameplay images here are faithful still captures from that currently listed release trailer.</p></details><details><summary>Who makes the game?</summary><p>Circuit Stance is developed by Fluffy Brown. For press, publishing or game questions, email <a href="mailto:info@fluffybrown.com">info@fluffybrown.com</a>.</p></details></div></section>`;
const aboutpage = `<section class="about-hero wrap"><div><p class="eyebrow">HELLO. WE'RE FLUFFY BROWN.</p><h1>SMALL TEAM.<br><em>BIG PLAYGROUND.</em></h1><p class="large-copy">Independent games with curious worlds, clever systems and a little mischief.</p><p>Based in Melbourne and connected across the world, we make games around the pleasure of trying an idea and seeing it work. From MunchMiner's underground routes to Circuit Stance's programmable robots, each world gives you a different way to make your mark.</p>${button("/#games", "Meet our games")}</div><div class="about-emblem"><img src="/icon-big.png" alt="Fluffy Brown studio emblem" width="400" height="400"><span class="spark" aria-hidden="true">✦</span><span class="emblem-note">MADE TO PLAY</span></div></section><section class="studio-story"><div class="section wrap"><p class="eyebrow">WHAT WE PUT INTO OUR WORLDS</p><h2>ROOM TO<br><em>EXPERIMENT.</em></h2><div class="values-grid"><article><span aria-hidden="true">✦</span><h3>Players come first</h3><p>Clear choices, satisfying feedback and the sense of progress that comes from learning the game.</p></article><article><span aria-hidden="true">↗</span><h3>Ideas need a playground</h3><p>Systems that invite you to try a plan, see the result and discover another approach.</p></article><article><span aria-hidden="true">◎</span><h3>Decisions matter</h3><p>Strategy lives in the details, from a robot's next action to a freight route through a mine.</p></article></div></div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">COME SEE WHAT WE'RE MAKING</p><h2>TWO WORLDS.<br>PLENTY TO EXPLORE.</h2></div></div>${gamesGrid}</section>`;
const notfound = `<section class="section wrap not-found"><p class="eyebrow">404 / WRONG TURN</p><h1>THIS PORTAL<br><em>GOES NOWHERE.</em></h1><p>The page you were looking for has wandered off.<br>Let's get you back to the games.</p><div class="actions">${button("/", "Back to Fluffy Brown")}${button("/#games", "Explore our games", true)}</div><span class="portal-shape" aria-hidden="true">✦</span></section>`;
const pages = [
  [
    "index.html",
    page(
      "/",
      "Fluffy Brown — Playful Worlds & Clever Games",
      "Discover MunchMiner, our solo mining and toy-market adventure in development, and Circuit Stance, our tactical programming game on Steam.",
      homepage,
      { schema: org },
    ),
  ],
  [
    "munchminer/index.html",
    page(
      mine.url,
      "MunchMiner — Dig, Build & Run a Toy Market | Fluffy Brown",
      mine.description,
      minepage,
      { active: "games", theme: "munchminer", schema: gameSchema(mine) },
    ),
  ],
  [
    "circuit-stance/index.html",
    page(
      circuit.url,
      "Circuit Stance — Program, Battle & Rethink | Fluffy Brown",
      circuit.description,
      circuitpage,
      {
        active: "games",
        theme: "circuit",
        imageName: "circuit-release-overview",
        schema: gameSchema(circuit),
      },
    ),
  ],
  [
    "about-us/index.html",
    page(
      "/about-us/",
      "Meet Fluffy Brown — Independent Game Studio",
      "A small independent game studio based in Melbourne and connected across the world. Meet the team behind MunchMiner and Circuit Stance.",
      aboutpage,
      { active: "about", schema: org },
    ),
  ],
  [
    "404.html",
    page(
      "/404.html",
      "Wrong Turn — Fluffy Brown",
      "Find your way back to Fluffy Brown games.",
      notfound,
      { noindex: true },
    ),
  ],
];
for (const [file, html] of pages) {
  await fs.mkdir(path.dirname(path.join(root, file)), { recursive: true });
  await fs.writeFile(path.join(root, file), html.replace(/></g, ">\n<"));
}
await fs.writeFile(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/munchminer/", "/circuit-stance/", "/about-us/"].map((route) => `<url><loc>${domain}${route}</loc><lastmod>${content.reviewed}</lastmod></url>`).join("")}</urlset>\n`,
);
await fs.writeFile(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`,
);
console.log("Built five static studio/game pages, sitemap and robots.txt.");
