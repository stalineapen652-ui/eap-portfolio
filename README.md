# Eap! — Portfolio (2026 redesign)

Stalin Eapen's portfolio — UI/UX & web design, built as a plain static site (no framework, no build step): HTML/CSS/JS + [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) for smooth scroll, same stack as the [KICKERSHOE](https://kickershoe.com) site.

## Structure

```
index.html            Homepage — loader, hero, services, work, process, testimonial, footer
pages/                 about.html, work.html, contact.html — each with its own .css/.js
css/                   style.css (shared tokens/header/footer), home.css, hero.css, loader.css
js/                    loader.js, hero-reveal.js, nav.js, script.js
assets/                images, fonts, logo
```

## Highlights

- **Intro loader** (`css/loader.css`, `js/loader.js`): a 33-image roll (KICKERSHOE panels + other project shots) at 85ms/cut, into an ink-bleed wipe using an SVG turbulence filter, into a large Bebas Neue name reveal. Plays once per page load (currently — see `ENABLE_ONCE_PER_SESSION` in `loader.js` to restore the once-per-session behavior), has a Skip control, and is disabled under `prefers-reduced-motion`.
- **Hero water-reveal** (`css/hero.css`, `js/hero-reveal.js`): the hero image is grayscale until the cursor passes over it, revealing color along the trail — same canvas technique as the loader's ink-bleed. Falls back to a static color image on touch/no-hover devices.
- **Typography**: [Unbounded](https://fonts.google.com/specimen/Unbounded) (display) + [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) (body/UI), loaded via the `@import` at the top of `css/style.css`. Unbounded has no italic face — anywhere the old serif leaned on `font-style: italic` for flourish now uses weight/color instead.
- **Dark theme**: `--paper`/`--ink` in `css/style.css` are the two tokens that matter — swap them to re-theme. The floating header/nav and the footer CTA card are pinned to fixed contrast pairs (`--chrome-*`, and the footer's own explicit colors) rather than following the swap, since they depend on staying readable regardless of page theme.

## Local dev

No build step — just serve the folder:

```bash
python -m http.server 4174
```

Then open `http://localhost:4174`. `.claude/launch.json` has this wired up as the `portfolio-2026` preview config.

**Cache-busting note:** local CSS/JS are linked with a `?v=N` query string because a plain `http.server` sends no `Cache-Control` header and Chromium will heuristically cache them — bump the version when an edit isn't showing up. Not needed once this is served by Vercel (see below).

## Deploy

Deployed on [Vercel](https://vercel.com), connected to this repo — every push to `main` triggers an automatic production deploy. No build command; Vercel serves the static files directly. `vercel.json` sets clean URLs (`/about` instead of `/pages/about.html` — existing internal links using the `.html` path still work, they just redirect) and long-lived caching for `/assets/*`.
