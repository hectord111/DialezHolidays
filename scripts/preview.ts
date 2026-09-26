/**
 * Serves dist/public like Vercel does (cleanUrls + 404.html) to check the
 * production build locally: pnpm run build && pnpm run preview
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "public");
const PORT = Number(process.env.PORT ?? 4173);
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    const candidates = url === "/" ? ["index.html"] : [url.slice(1), `${url.slice(1).replace(/\/$/, "")}.html`];
    const file = candidates.map(c => path.join(OUT, c)).find(f => f.startsWith(OUT) && fs.existsSync(f) && fs.statSync(f).isFile());
    if (!file) {
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      res.end(fs.readFileSync(path.join(OUT, "404.html")));
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Preview: http://localhost:${PORT}`));
