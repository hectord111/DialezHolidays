import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { matchRoute, normalizePath, preloadPath } from "./routes";
// Self-hosted fonts (no request to Google Fonts): only the latin subsets and
// weights the design uses.
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "./index.css";

/** Shows `.reveal` blocks as they scroll into view (see index.css). */
function revealOnScroll() {
  const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  elements.forEach(el => observer.observe(el));
}

/**
 * Pages are prerendered to static HTML at build time (scripts/prerender.ts).
 * `data-prerendered` on #root says which path the markup belongs to: when it
 * matches the current URL we hydrate it (keeping the server markup), otherwise
 * (dev server, stale HTML) we render from scratch.
 */
async function start() {
  const container = document.getElementById("root")!;
  const path = normalizePath(window.location.pathname);
  await preloadPath(path).catch(error => console.error("[preload]", error));

  const prerendered = container.dataset.prerendered;
  const matchesPrerender =
    container.firstElementChild !== null &&
    (prerendered === path || (prerendered === "*404" && matchRoute(path) === undefined));

  if (matchesPrerender) {
    hydrateRoot(container, <App />);
  } else {
    container.textContent = "";
    createRoot(container).render(<App />);
  }
  // Let React commit before looking for the blocks to reveal.
  requestAnimationFrame(() => requestAnimationFrame(revealOnScroll));
}

start();
