import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  "index.html",
  "munchminer/index.html",
  "circuit-stance/index.html",
  "about-us/index.html",
  "404.html",
];
const failures = [];
for (const file of pages) {
  const html = await fs.readFile(path.join(root, file), "utf8");
  for (const [name, pattern] of [
    ["language", /<html lang="en"/],
    ["description", /<meta name="description" content="[^"]+"/],
    [
      "canonical",
      /<link rel="canonical" href="https:\/\/www\.fluffybrown\.com/,
    ],
    ["main landmark", /<main id="main"/],
    ["one h1", /<h1[ >]/],
  ])
    if (!pattern.test(html)) failures.push(`${file}: missing ${name}`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    failures.push(`${file}: expected one h1`);
  if (/(?:href="#"|\/src\/main\.ts|cdnjs|index-22YcpPm-\.js)/.test(html))
    failures.push(`${file}: placeholder or retired loader`);
  for (const image of html.matchAll(/<img\b[^>]*>/g))
    if (!/\balt="[^"]*"/.test(image[0]))
      failures.push(`${file}: image lacks alt`);
  for (const match of html.matchAll(/(?:href|src)="([^" ]+)"/g)) {
    const value = match[1];
    if (/^(https:|mailto:)/.test(value)) continue;
    const [url, hash] = value.split("#");
    let target = url
      ? path.join(root, url.replace(/^\//, ""))
      : path.join(root, file);
    try {
      if ((await fs.stat(target)).isDirectory())
        target = path.join(target, "index.html");
      await fs.access(target);
    } catch {
      failures.push(`${file}: missing target ${value}`);
      continue;
    }
    if (hash) {
      const targetHtml = await fs.readFile(target, "utf8");
      if (!targetHtml.includes(`id="${hash}"`))
        failures.push(`${file}: missing anchor ${value}`);
    }
  }
  for (const schema of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/g,
  ))
    try {
      JSON.parse(schema[1]);
    } catch {
      failures.push(`${file}: invalid structured data`);
    }
}
const cname = (await fs.readFile(path.join(root, "CNAME"), "utf8")).trim();
if (cname !== "www.fluffybrown.com") failures.push("CNAME changed");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `PASS: ${pages.length} pages; metadata, landmarks, image alt text, internal links/anchors, structured data and unchanged CNAME.`,
);
