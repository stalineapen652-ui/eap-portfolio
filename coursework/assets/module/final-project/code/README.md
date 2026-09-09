# KICKERSHOE

A shared universe of fictional motion comics — a mantis, a goat, an elephant, a goldfish — each hiding the unofficial origin story behind a legendary shoe or sneaker.

## Pages

- `index.html` — landing page: hero, issue library, "the shoe" case file, lore archive, newsletter signup
- `issue-001.html` / `issue-002.html` / `issue-003.html` / `issue-004.html` — each issue's full motion comic, panel by panel, plus its own lore/case-file section
- `about.html` — the KICKERSHOE concept: what the shared universe is, how issues connect through recurring rivals, the cast, and a "not affiliated" disclaimer
- `404.html` — custom not-found page

## Running it locally

No build step, no dependencies. Either:

1. Open `index.html` directly in a browser, or
2. Serve the folder with any static server, e.g.:

```bash
python -m http.server 4173
```

then visit `http://localhost:4173`.

## What's not here

This is the site's own source, minus deployment/tooling that isn't part of the page code itself: no build step or bundler config, and no third-party analytics (the live site's Vercel Speed Insights and Microsoft Clarity tags are both left out here).

## Code conventions

- **HTML** is written semantically throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`/`<figcaption>`, `<details>` and `<footer>` are used for their structural meaning instead of generic `<div>`s. No `class` attribute is used for layout or styling — the only classes on the page (`icon-mark`, `dot`) style the paths inside reusable inline SVG icons, which is what classes exist for. `id` is used only where there's no alternative: page-section landmarks (also used as in-page anchor targets) and SVG `<defs>`/filter references that the SVG spec requires an id for. CSS in `styles.css` is driven by element type, structural combinators, and attribute selectors instead of class soup.
- **CSS** (`styles.css`) opens with the standard Meyer CSS reset (v2.0), followed by the site's own rules.
- **JavaScript** is inline, small, and dependency-free: panel autoplay/expand behavior per issue page, and a "reduce motion" toggle that respects `prefers-reduced-motion` and lets a visitor turn animation off manually.
