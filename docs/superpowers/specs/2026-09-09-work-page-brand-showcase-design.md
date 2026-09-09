# Work page rework — brand-story showcase

Date: 2026-09-09
Status: Approved

## Context

`pages/work.html` currently shows a hero, then three shallow sections (Alf's
Cycles, Rasam, a "social media" gallery) built from a handful of images with
2-3 sentence captions. It reads as a gallery, not a case-study page.

The request: rework the page completely into a detailed showcase that tells
the story of each brand — how its aesthetic direction was chosen and how it
differs from the generic convention in its category — pulling real content
and screenshots from the live sites, plus a lighter grid of smaller Behance
pieces.

## Scope

In scope: `pages/work.html`, `pages/work.css`, `pages/work.js`, and new
images under `assets/projects/` captured from the live sites. Out of scope:
`about.html`, `contact.html`, `index.html`, the shared header/footer/nav
components (`css/style.css`, `js/nav.js`) — reused as-is, not redesigned.

## Page structure

Single page, top to bottom:

1. **Hero** — kept close to the current copy/layout; the `.infinity-track`
   image stack refreshed to include Kickershoe and Malker frames (currently
   only Alf's/Rasam appear there).
2. **Chapter nav** — a slim sticky row of 4 anchor links (`01 Kickershoe · 02
   Rasam · 03 Malker · 04 Alf's`), active-state highlighted by scroll
   position. Gives a long page quick orientation and previews the "four very
   different brands" idea before the reader scrolls into it.
3. **Four case-study chapters**, in this order: **Kickershoe → Rasam →
   Malker → Alf's Cycles** (order per user request — opens on the boldest/
   most art-directed piece, closes on the most personal one).
4. **"More work" grid** — smaller Behance pieces, card grid, no case-study
   treatment.
5. **Footer** — unchanged.

## Chapter template

Each chapter (`<section class="chapter chapter--<name>">`) follows the same
internal structure so the four read as one system despite the tint changes:

```
<span class="chapter-index">0N</span>
<span class="chapter-meta">role · sector · year</span>
<h2 class="chapter-title">Project Name</h2>
<p class="chapter-brief">one-line brief</p>

<div class="chapter-beat">
  <h3>The Brief</h3>
  <p>...</p>
</div>
<div class="chapter-beat">
  <h3>The Direction</h3>
  <p>...</p>
</div>
<div class="chapter-beat">
  <h3>The Result</h3>
  <p>...</p>
</div>

<div class="chapter-gallery"> <!-- 1 dominant image + 1-2 supporting --> </div>
[optional: live-link chip, e.g. "Visit rasam.ae ↗"]
```

### 01 — Kickershoe

- Meta: `Concept · Motion-comic brand site · kickershoe.com`
- Brief: A sneaker-brand launch competing with a hundred other "shop now"
  product pages fighting for the same five seconds of attention.
- Direction: Instead of specs and trainers-on-white product photography,
  build a motion-comic universe — four creatures (a mantis, a goat, an
  elephant, a goldfish) each carrying the true "origin myth" behind one
  shoe. Case-file typography, redacted field notes, illustrated evidence
  shots instead of feature-bullet lists. The dark purple-to-green palette,
  sampled straight from the artwork, later became this portfolio's own
  accent gradient.
- Result: A product page that reads like the first issue of a comic, not a
  catalog — visitors "read" the shoe before they ever see a price.
- Images: hero 4-panel creature carousel, one "case file / evidence" detail
  section, one lore/field-notes section. Fresh screenshots.

### 02 — Rasam

- Meta: `Client work · Website + brand identity + social · Dubai · rasam.ae`
- Brief: Chef Avinash Mohan needed a home for RASAM that matched five-star-
  kitchen credentials, not a template indistinguishable from every other
  "fine dining, Dubai" site.
- Direction: Deep green and gold instead of the genre's usual white-and-
  gold; a kolam (South Indian floor-art) motif standing in for stock
  ornamental borders; an editorial serif headline paired with tracked-out
  uppercase labels; real chef/dish photography, not stock food imagery. The
  pantry/shop section routes straight to WhatsApp ordering — no separate
  checkout system to build or maintain.
- Result: Live at rasam.ae, 4.5★ across 1,900+ Google reviews; the identity
  carried through to social media and the ordering pantry too.
- Images: hero, chef or pantry/shop section, one supporting detail. Mix of
  fresh screenshot + existing `assets/projects/rasam.webp` /
  `assets/rasamlogo.webp` / `ras1-5.webp`.

### 03 — Malker Trusted Care

- Meta: `Client work · Website · NDIS-registered homecare · Australia ·
  malkertrustedcare.com.au`
- Brief: A disability-support and homecare provider needed a site a nervous
  first-time visitor could trust within seconds — built for that visitor,
  not to impress other designers.
- Direction: The aesthetic decision here *is* restraint — clean blue and
  white, credibility signals (NDIS Registered Provider badge, phone/email
  visible from the first screen) placed above anything decorative, real
  care photography over stock imagery, one unambiguous "Free Consultation"
  CTA. No mascot, no ornamental motif — the opposite instinct to Kickershoe
  or Rasam, deliberately.
- Result: A site that reads as credible and calm for a healthcare audience —
  proof the same instinct scales down to "no flourish at all" when the
  brief calls for it.
- Images: hero, testimonial/values section. Fresh screenshots (no existing
  dedicated assets beyond the single hero thumbnail already in
  `assets/malker.webp`).

### 04 — Alf's Cycles

- Meta: `Concept · Narrative-driven website · Keswick, est. 1987 ·
  coursework final project`
- Brief: A local bike shop's brief, reframed — not a repairs-and-price-list
  brochure, but a site that feels like walking into a shop with 35 years of
  history and a personality of its own.
- Direction: Warm cream and red instead of a "sporty" blue/black bike-shop
  palette; a hand-drawn fox mascot doing bike tricks as the site's actual
  visual voice; a dedicated "Alf's stories" section most repair-shop sites
  would cut as unnecessary. "The bikes time forgot, and we found. Not
  restored. Resurrected."
- Result: The most personal, illustration-led project on this page — closes
  the showcase on the reminder that the story-first instinct isn't reserved
  for paying clients.
- Images: existing `alfmobile.webp` / `alflaptop.webp` / `alf-cycle.webp`,
  plus one fresh screenshot of the mascot artwork and/or "why choose Alf's"
  section for variety.

## Visual treatment (brand-tinted chapters)

Each chapter sits inside the site's existing dark shell (`--paper` etc.) but
overrides two custom properties, scoped to that section only, so the
surrounding page chrome (header, footer, chapter nav) stays constant:

```css
.chapter--kickershoe { --chapter-tint: <dark violet-black wash>; --chapter-accent: <muted toxic green, sampled from artwork on capture>; }
.chapter--rasam      { --chapter-tint: <deep green wash>;        --chapter-accent: <gold>; }
.chapter--malker      { --chapter-tint: <clean blue wash, lighter/brighter panel than the others>; --chapter-accent: <blue>; }
.chapter--alfs        { --chapter-tint: <warm cream/red wash>;   --chapter-accent: <red>; }
```

Exact hex values are pulled from the captured screenshots during
implementation rather than pre-guessed here — `--chapter-accent` drives the
index number, kicker label, and beat-heading color; `--chapter-tint` drives
a low-opacity background wash/gradient behind the chapter, not a full
background-color swap (keeps contrast and the dark base intact). Alf's may
reuse the existing cream (`#fff8ee`) `.project-box` card treatment directly
for its gallery images, since that literally is the brand's own palette.

## Behance "more work" grid

A compact card grid below the four chapters: title + one-line descriptor +
thumbnail, linking to the piece on Behance. Candidates from the profile:
Qua Brand identity, RASAM Brand identity designing, PLutus Logo animation,
Stew Maker Logo motion, Wix Website Design, Website Design & Development,
Just Do It. Thumbnails cropped from the Behance profile grid via browser
screenshot (the user's own copyrighted work, screenshotted for their own
portfolio use). No per-project case-study text — title + descriptor only.

## Assets to capture

- Kickershoe: hero carousel, one case-file/evidence section, one lore
  section — fresh screenshots from kickershoe.com.
- Malker: hero, testimonial/values section — fresh screenshots from
  malkertrustedcare.com.au.
- Alf's: one or two fresh screenshots (mascot artwork, "why choose Alf's")
  from the live `/alfs` page, supplementing existing assets.
- Rasam: existing assets reused; one fresh screenshot only if a gap remains
  once existing assets are laid out.
- Behance: cropped thumbnails from the profile's project grid.

All saved under `assets/projects/` as `.webp` (matching existing naming/
format convention), referenced with relative paths matching the pattern
already used in `work.html` (`../assets/...`).

## Technical implementation

Reuse the existing GSAP fade-up (`.fade-up`) and parallax (`.box-parallax`)
patterns from `work.js` for the new chapters and grid — no new JS
dependency. Add:
- `.chapter-nav` component + a small scroll-spy (IntersectionObserver or a
  ScrollTrigger callback, consistent with the file's existing use of
  ScrollTrigger) to toggle its active link.
- New chapter/gallery CSS in `work.css`, built on the existing `.project-*`
  class patterns rather than a parallel system, extended with the
  `--chapter-tint`/`--chapter-accent` custom properties above.
- The existing crossfading-gallery pattern (`.gallery-img`/`.active` +
  `setInterval`) may be reused for any chapter that ends up with more than
  3 images (e.g. Rasam, which has the most existing assets).

## Accessibility / performance

- All new images get descriptive `alt` text (project + what's shown, not
  just "Rasam screenshot 2").
- Chapter nav links are real anchors (`<a href="#kickershoe">`) — keyboard
  and screen-reader navigable without JS.
- `prefers-reduced-motion` handling in `work.js` already gates
  parallax/Lenis smooth-scroll; unchanged, so it also covers the new
  sections.
- New screenshots compressed to `.webp` at a similar size budget to existing
  `assets/projects/*.webp` files — this page is already image-heavy, no new
  request-count/format pattern introduced.

## Out of scope / not changing

- `about.html`, `contact.html`, `index.html`, shared header/footer/nav.
- Full scrollytelling/pinned-scroll treatment (considered and rejected in
  favor of the simpler chapter structure above).
- Building out full case-study pages per project (kept to one page, per
  user request).
