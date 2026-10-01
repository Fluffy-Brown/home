import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = JSON.parse(
  await fs.readFile(path.join(root, "content/games.json"), "utf8"),
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
const tags = (game) =>
  `<ul class="tags" aria-label="Game features">${game.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
const img = (name, alt, { hero = false, classes = "" } = {}) =>
  `<img class="${classes}" src="/media/${name}-1280.webp" srcset="/media/${name}-640.webp 640w, /media/${name}-1280.webp 1280w, /media/${name}-1920.webp 1920w" sizes="${hero ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 50vw"}" width="1920" height="1080" alt="${esc(alt)}" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const header = (active) =>
  `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="Fluffy Brown home"><img src="/favicon.png" width="40" height="40" alt=""><span>FLUFFY BROWN<span class="brand-sub">INDEPENDENT GAMES</span></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu <span aria-hidden="true">☰</span></button><nav id="site-nav" aria-label="Main navigation"><a href="/#games"${active === "games" ? ' aria-current="page"' : ""}>Our games</a><a href="/about-us/"${active === "about" ? ' aria-current="page"' : ""}>The studio</a><a class="nav-contact" href="#contact">Say hello ${arrow}</a></nav></div></header>`;
const footer = `<footer id="contact" class="site-footer"><div class="wrap footer-top"><div><p class="eyebrow">LET'S TALK</p><h2>Good ideas start<br>with a hello.</h2><p>Press, publishing, or a question about our games?</p><a class="email" href="mailto:info@fluffybrown.com">info@fluffybrown.com ${arrow}</a></div><div class="footer-links"><a href="/munchminer/">MunchMiner</a><a href="/circuit-stance/">Circuit Stance</a><a href="${circuit.store}">Circuit Stance on Steam ${arrow}</a><a href="${esc(legacy.social.facebook)}">Facebook ${arrow}</a><a href="/about-us/">About Fluffy Brown</a></div></div><div class="wrap footer-bottom"><span>© ${content.reviewed.slice(0, 4)} Fluffy Brown. All rights reserved.</span><span>Melbourne + World</span><a href="#top">Back to top ↑</a></div></footer>`;
const gallery = (items, label) =>
  `<div class="gallery" aria-label="${esc(label)}">${items.map(([name, alt], i) => `<a class="gallery-link" href="/media/${name}-1920.webp" data-gallery data-caption="${esc(alt)}" aria-label="View screenshot ${i + 1}: ${esc(alt)}">${img(name, alt)}<span>View screenshot ${String(i + 1).padStart(2, "0")} ${arrow}</span></a>`).join("")}</div>`;
const dialog = `<dialog class="image-dialog" aria-labelledby="image-caption"><form method="dialog"><button class="dialog-close" aria-label="Close screenshot">Close ×</button></form><img id="dialog-image" src="/favicon.png" alt=""><div class="dialog-controls"><button type="button" data-previous aria-label="Previous screenshot">← Previous</button><p id="image-caption"></p><button type="button" data-next aria-label="Next screenshot">Next →</button></div></dialog>`;
const steps = (game) =>
  `<ol class="steps">${game.steps.map(([name, text], i) => `<li><span class="step-num" aria-hidden="true">0${i + 1}</span><h3>${esc(name)}</h3><p>${esc(text)}</p></li>`).join("")}</ol>`;
const page = (
  route,
  title,
  description,
  body,
  {
    active = "",
    image = "munchminer-town",
    schema = null,
    noindex = false,
  } = {},
) => `<!doctype html>
<html lang="en" id="top"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#f6f1e7">${noindex ? '<meta name="robots" content="noindex">' : ""}<link rel="canonical" href="${domain}${route}"><meta property="og:type" content="${schema ? "website" : "website"}"><meta property="og:site_name" content="Fluffy Brown"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${domain}${route}"><meta property="og:image" content="${domain}/media/${image}-1280.webp"><meta property="og:image:alt" content="${esc(content.games.find((g) => g.image === image)?.alt || "Fluffy Brown game screenshot")}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/assets/site.css"><script src="/assets/site.js" defer></script>${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>` : ""}</head><body>${header(active)}<main id="main" tabindex="-1">${body}</main>${footer}${dialog}</body></html>\n`;
const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fluffy Brown",
  url: domain,
  email: "info@fluffybrown.com",
  logo: domain + "/favicon.png",
  sameAs: [legacy.social.facebook],
};
const homepage = `<section class="home-hero wrap"><div class="hero-copy"><p class="eyebrow"><span class="small-star" aria-hidden="true">✦</span> A SMALL STUDIO WITH BIG IDEAS</p><h1>A little mischief.<br>A lot of <em>strategy.</em></h1><p class="hero-description">Curious worlds. Clever choices. We make games that give your next good idea somewhere to play.</p><div class="actions">${button("#games", "Find your next adventure")}${button("/about-us/", "Meet the studio", true)}</div></div><div class="hero-art"><a href="/munchminer/" class="hero-image" aria-label="Explore MunchMiner">${img(mine.image, mine.alt, { hero: true })}</a><div class="hero-art-caption"><span><span class="eyebrow">ON OUR WORKBENCH</span><strong>MunchMiner</strong></span><span class="status status-warm">In development</span></div><span class="art-note">A peek inside our next world.</span></div></section><div class="manifesto-strip"><div class="wrap"><span>INDEPENDENT GAMES</span><span aria-hidden="true">✦</span><span>THOUGHTFUL STRATEGY</span><span aria-hidden="true">✦</span><span>A LITTLE UNEXPECTED</span></div></div><section id="games" class="section wrap"><div class="section-heading"><div><p class="eyebrow">MADE BY FLUFFY BROWN</p><h2>Pick your world.</h2></div><p>From a workshop full of toys<br>to an arena full of possibilities.</p></div><div class="game-grid">${content.games.map((g, i) => `<article class="game-card ${i ? "circuit-card" : ""}"><a class="game-image" href="${g.url}" aria-label="Explore ${g.name}">${img(i ? g.image : "munchminer-mine", i ? g.alt : "A MunchMiner mine with stations and connected rail routes")}<span class="image-index" aria-hidden="true">0${i + 1}</span></a><div class="game-card-copy"><span class="status ${i ? "status-cool" : "status-warm"}">${g.status}</span><p class="eyebrow">${esc(g.genre)}</p><h3><a href="${g.url}">${esc(g.name)} ${arrow}</a></h3><p>${esc(g.description)}</p>${tags(g)}<div class="actions">${button(g.url, "Explore the game", true)}${g.store ? `<a class="text-link" href="${g.store}">Visit Steam ${arrow}</a>` : ""}</div></div></article>`).join("")}</div></section><section class="studio-band"><div class="wrap studio-grid"><div><p class="eyebrow">HELLO, WE'RE FLUFFY BROWN</p><h2>Small team.<br>Room to imagine.</h2></div><div><p>Based in Melbourne and connected across the world, we build games around the satisfaction of making a plan, trying it out, and finding your own way.</p><p>Our work brings together playful worlds and decisions that matter.</p>${button("/about-us/", "A little more about us", true)}</div></div></section>`;
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
const gameHero = (g, headline) =>
  `<section class="game-hero wrap"><a class="breadcrumb" href="/#games">← All our games</a><div class="game-intro"><div><span class="status ${g.store ? "status-cool" : "status-warm"}">${g.status}</span><p class="eyebrow">${esc(g.genre)}</p><h1>${esc(g.name)}</h1><p class="game-headline">${headline}</p><p>${esc(g.description)}</p>${tags(g)}<div class="actions">${g.store ? button(g.store, "Play on Steam") : button("#the-game", "Discover the game")}${button("mailto:info@fluffybrown.com", "Get in touch", true)}</div></div><div class="game-cover">${img(g.image, g.alt, { hero: true })}<p class="caption">${g.store ? "From the official Steam gallery." : "Development screenshot. Visuals and gameplay may change."}</p></div></div></section>`;
const minepage = `${gameHero(mine, "Dig. Connect. Craft. Conquer… the toy market.")}<section id="the-game" class="section wrap"><div class="section-heading"><div><p class="eyebrow">ONE MINER. PLENTY OF POSSIBILITIES.</p><h2>From underground<br>to the market stall.</h2></div><p>A solo adventure where the next<br>expedition starts with a good idea.</p></div>${steps(mine)}</section><section class="story-band"><div class="wrap story-grid"><div class="story-title"><span class="small-star" aria-hidden="true">✦</span><p class="eyebrow">MEET YOUR WOULD-BE EVIL EMPLOYER</p><h2>Marksa has a plan.<br>It might even help.</h2></div><div><p>Work for Marksa, a would-be world conqueror whose grand plans keep making life better for the village. As its red-helmet miner, you turn underground discoveries into something people want to take home.</p><p>Excavation, rail logistics, workshop recipes and an evening market connect the two halves of your adventure.</p></div></div></section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">A WORK IN PROGRESS</p><h2>Scenes from MunchMiner.</h2></div><p>Captured from development builds.<br>The game is still taking shape.</p></div>${gallery(
  [
    ["munchminer-town", mine.alt],
    [
      "munchminer-mine",
      "Connected tracks and a station inside the MunchMiner mine",
    ],
    [
      "munchminer-workshop",
      "Toy crafting and stall stock selection in a MunchMiner development build",
    ],
    [
      "munchminer-market",
      "The evening market stalls in a MunchMiner development build",
    ],
  ],
  "MunchMiner development screenshots",
)}</section><section class="section wrap faq-section"><div><p class="eyebrow">BEFORE YOU HEAD UNDERGROUND</p><h2>A few things to know.</h2><p class="reviewed">Project information reviewed <time datetime="${content.reviewed}">1 October 2026</time>.</p></div><div class="faq"><details><summary>What kind of game is MunchMiner?</summary><p>A side-view 2D mining and toy-market adventure. Explore the mine, build a rail network, bring materials home, craft toys and sell them at the evening market.</p></details><details><summary>Is it a single-player game?</summary><p>Yes. The current game is built for offline solo play, with one red-helmet miner.</p></details><details><summary>When can I play?</summary><p>MunchMiner is in development. We will share a release date, platforms and availability here when they are confirmed.</p></details><details><summary>Where can I ask about the game?</summary><p>Email <a href="mailto:info@fluffybrown.com">info@fluffybrown.com</a> for questions, press or publishing enquiries.</p></details></div></section>`;
const circuitpage = `${gameHero(circuit, "Your next idea could change the whole battle.")}<section id="the-game" class="section wrap"><div class="section-heading"><div><p class="eyebrow">BUILD A PLAN. SEE IT PLAY OUT.</p><h2>Strategy with<br>a programmable twist.</h2></div><p>A super AI, a robot squad,<br>and room to experiment.</p></div>${steps(circuit)}</section><section class="section wrap"><div class="section-heading"><div><p class="eyebrow">INSIDE THE ARENA</p><h2>Circuit Stance in action.</h2></div><p>Current images from the<br>official Steam store gallery.</p></div>${gallery(
  [1, 2, 3, 4].map((i) => [
    `circuit-stance-${i}`,
    `Circuit Stance official Steam screenshot ${i}`,
  ]),
  "Circuit Stance official screenshots",
)}</section><section class="character-section"><div class="wrap section"><p class="eyebrow">FROM OUR ORIGINAL CHARACTER GALLERY</p><h2>A few familiar faces.</h2><p class="section-intro">Explore the characters and stories from our original website.</p><div class="character-grid">${legacy.characters.map((c) => `<article class="character-card"><img src="/characters/${c.image}" width="320" height="320" alt="${esc(c.name)} character artwork" loading="lazy" decoding="async"><p class="eyebrow">${esc(c.race)}</p><h3>${esc(c.name.charAt(0) + c.name.slice(1).toLowerCase())}</h3><ul class="tags">${c.tags.map((t) => `<li>${esc(t === "Dexerity" ? "Dexterity" : t)}</li>`).join("")}</ul><details><summary>Read ${esc(c.name.charAt(0) + c.name.slice(1).toLowerCase())}'s story</summary>${c.description.map((p) => `<p>${esc(p)}</p>`).join("")}</details></article>`).join("")}</div></div></section><section class="section wrap play-cta"><div><p class="eyebrow">READY TO TEST YOUR TACTICS?</p><h2>Step into Circuit Stance.</h2><p>Visit the official Steam page for game details and availability.</p></div>${button(circuit.store, "View on Steam")}</section>`;
const aboutpage = `<section class="about-hero wrap"><p class="eyebrow">THE PEOPLE BEHIND THE WORLDS</p><h1>Thoughtful games.<br>A playful outlook.</h1><div class="about-intro"><img src="/icon-big.png" alt="Fluffy Brown studio emblem" width="240" height="240"><div><p class="large-copy">We're Fluffy Brown, an independent game studio based in Melbourne and connected across the world.</p><p>We create games around strategic thinking, creative experimentation and the pleasure of seeing an idea work. From Circuit Stance's programmable robots to MunchMiner's underground routes and toy market, every world gives players a different way to make their mark.</p></div></div></section><section class="studio-band"><div class="wrap section"><p class="eyebrow">WHAT GUIDES OUR WORK</p><h2>Where strategy<br>meets imagination.</h2><div class="values-grid"><article><span class="step-num">01</span><h3>Players come first</h3><p>We aim for clear choices, satisfying feedback and a sense of progress that comes from learning the game.</p></article><article><span class="step-num">02</span><h3>Space to experiment</h3><p>We build systems that invite players to try an idea, see the result and discover a new approach.</p></article><article><span class="step-num">03</span><h3>Decisions that matter</h3><p>Strategy is at the heart of our work, from a robot's next action to a route through a mine.</p></article></div></div></section><section class="section wrap play-cta"><div><p class="eyebrow">OUR WORLDS, SO FAR</p><h2>Come see what we're making.</h2><p>Discover Circuit Stance and follow MunchMiner's development.</p></div>${button("/#games", "Explore our games")}</section>`;
const pages = [
  [
    "index.html",
    page(
      "/",
      "Fluffy Brown — Independent Games & Curious Worlds",
      "Discover MunchMiner, our solo mining and toy-market adventure in development, and Circuit Stance, our tactical programming game on Steam.",
      homepage,
      { schema: org },
    ),
  ],
  [
    "munchminer/index.html",
    page(
      mine.url,
      "MunchMiner — Solo Mining & Toy-Market Adventure | Fluffy Brown",
      mine.description,
      minepage,
      { schema: gameSchema(mine) },
    ),
  ],
  [
    "circuit-stance/index.html",
    page(
      circuit.url,
      "Circuit Stance — Tactical Programming on Steam | Fluffy Brown",
      circuit.description,
      circuitpage,
      { schema: gameSchema(circuit), image: circuit.image },
    ),
  ],
  [
    "about-us/index.html",
    page(
      "/about-us/",
      "About the Studio | Fluffy Brown",
      "Meet Fluffy Brown, the Melbourne-based independent game studio behind Circuit Stance and MunchMiner.",
      aboutpage,
      { active: "about", schema: org },
    ),
  ],
  [
    "404.html",
    page(
      "/404.html",
      "Page Not Found | Fluffy Brown",
      "Find your way back to the games and studio at Fluffy Brown.",
      `<section class="wrap section not-found"><p class="eyebrow">404 — A WRONG TURN</p><h1>This tunnel<br>ends here.</h1><p>The page you're looking for isn't here. Let's find another route.</p><div class="actions">${button("/", "Back to the homepage")}${button("/#games", "Explore our games", true)}</div></section>`,
      { noindex: true },
    ),
  ],
];
for (const [name, html] of pages) {
  await fs.mkdir(path.dirname(path.join(root, name)), { recursive: true });
  await fs.writeFile(path.join(root, name), html.replace(/></g, ">\n<"));
}
await fs.writeFile(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/munchminer/", "/circuit-stance/", "/about-us/"].map((url) => `<url><loc>${domain}${url}</loc><lastmod>${content.reviewed}</lastmod></url>`).join("")}</urlset>\n`,
);
await fs.writeFile(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`,
);
console.log(`Built ${pages.length} static HTML pages, sitemap and robots.txt.`);
