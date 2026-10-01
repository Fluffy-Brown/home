import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      let file = path.resolve(root, "." + pathname);
      if (!file.startsWith(root + path.sep) && file !== root)
        throw new Error("Invalid path");
      if (pathname.split("/").some((p) => p.startsWith(".")))
        throw new Error("Hidden path");
      try {
        if ((await fs.stat(file)).isDirectory())
          file = path.join(file, "index.html");
        await fs.access(file);
      } catch {
        file = path.join(root, "404.html");
        res.statusCode = 404;
      }
      res.setHeader(
        "Content-Type",
        types[path.extname(file)] || "application/octet-stream",
      );
      res.end(await fs.readFile(file));
    } catch {
      res.statusCode = 400;
      res.end("Bad request");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Preview: http://127.0.0.1:${port}`),
  );
