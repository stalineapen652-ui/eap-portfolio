# Multilingual name overlay in the intro loader

Date: 2026-09-08
Status: Approved

## Context

The intro loader (`js/loader.js`, `css/loader.css`) plays once per page load on
`index.html`: a 33-image roll at 85ms/cut ("hardcut" flashes, each zooming in
slightly), then an ink-bleed wipe into a large "STALIN EAPEN" name reveal in
Bebas Neue.

The request: during the image-roll phase, also show the name "Stalin Eapen"
cycling through 10+ languages/scripts, hovering/flashing over the images the
same way the images themselves flash — centered, using fonts that match the
site's display typography, before the ink wipe and the existing English name
reveal take over unchanged.

## Scope

In scope: the image-roll phase only (`.cuts`), and the fonts loaded for it.
Out of scope: the ink-bleed wipe, the final `.titlewrap`/`.title3d` English
name reveal, and the Bebas Neue `<link>` that reveal still uses — none of
that changes.

## Content: languages and fonts

"Stalin Eapen" is a proper name — each non-Latin entry is a phonetic
transliteration into that script, not a translation. 11 display slots cycle
through 11 texts (Spanish and German share one Latin-script slot, since the
name is spelled identically in both):

| # | Text | Language/script | Font | Notes |
|---|------|------------------|------|-------|
| 1 | STALIN EAPEN | English (Latin) | Unbounded, 900 | site's heading font |
| 2 | സ്റ്റാലിൻ ഈപ്പൻ | Malayalam | Baloo Chettan 2, 700 | |
| 3 | ஸ்டாலின் ஈப்பன் | Tamil | Baloo Thambi 2, 700 | |
| 4 | STALINE EAPEN | French (Latin) | Unbounded, 900 | |
| 5 | स्तालिन एपेन | Hindi | Teko, 700 | condensed, closest proportions to the loader's existing display type |
| 6 | ستالين إيبن | Arabic | Lalezar | `dir="rtl"` |
| 7 | STALIN EAPEN | Spanish/German (Latin) | Unbounded, 900 | one slot represents both |
| 8 | Сталин Эапен | Russian | Oswald, 700 | condensed Cyrillic |
| 9 | 斯大林·埃彭 | Chinese | ZCOOL QingKe HuangYou | single-weight display face |
| 10 | スターリン・イーペン | Japanese | Rampart One | single-weight display face |
| 11 | 스탈린 이펜 | Korean | Black Han Sans | single-weight display face |

The three Latin-script entries are interleaved among the others (not
clustered together) per user request.

All entries render in `var(--accent-2)` (#f4a261), the same sand color the
final name reveal already uses, so the overlay reads as part of the same
visual idea.

## Fonts to load

`Unbounded` is already loaded (via `@import` in `css/style.css`). Add one new
Google Fonts request for the rest:

```
https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@700&family=Baloo+Thambi+2:wght@700&family=Teko:wght@700&family=Lalezar&family=Oswald:wght@700&family=ZCOOL+QingKe+HuangYou&family=Rampart+One&family=Black+Han+Sans&display=swap
```

Added as a `<link rel="stylesheet">` in `index.html`'s `<head>`, alongside the
existing Bebas Neue link.

## Markup / DOM

`js/loader.js` currently builds `.cuts` (33 `<img>`s with computed
`animation-delay`) and appends it to `#loader`, then builds `.ink` and
`.titlewrap`. This adds one more piece, built and appended the same way,
**after `.cuts` and before `.ink`** so it visually sits on top of the rolling
images and disappears (covered by the ink circle) before the wipe:

```html
<div class="lang-roll">
  <span class="langcut" lang="en" style="animation-delay:0s; ...">STALIN EAPEN</span>
  <span class="langcut" lang="ml" style="animation-delay:0.255s; ...">സ്റ്റാലിൻ ഈപ്പൻ</span>
  <!-- ... 9 more ... -->
</div>
```

Each `<span>` carries its own inline `font-family` (via a CSS class per
language, e.g. `.langcut.lang-ml`) and `dir="rtl"` on the Arabic one.

## Timing

Reuses the existing constants in `loader.js` (`ROLL_COUNT = 33`,
`CADENCE = 0.085`). The language changes every 3 image-cuts:

```js
var LANG_SWAP_CUTS = 3;
var langInterval = LANG_SWAP_CUTS * CADENCE; // 0.255s
var langSlots = Math.floor(ROLL_COUNT / LANG_SWAP_CUTS); // 11
```

Slot `i` (0-indexed) gets `animation-delay: (i * langInterval) + 's'`,
`animation-duration: langInterval + 's'` — the same per-item math already
used for the image cuts, so no JS render loop or `setInterval` is introduced.

## Animation

Each `.langcut` span reuses the **existing `loaderHardcut` keyframe**
(defined in `css/loader.css` for the image cuts: hard-cut in with a slight
zoom, hard-cut out) so the name flashes with the identical rhythm and motion
as the photos — this is the direct answer to "make my name hover the same
way." No new keyframe is needed for the motion itself.

```css
.lang-roll { position: absolute; inset: 0; pointer-events: none; }
.langcut {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 0 6vw;
  opacity: 0;
  color: var(--accent-2);
  text-transform: uppercase;
  font-size: clamp(32px, 9vw, 120px);
  line-height: 1;
  text-shadow: 2px 2px 0 var(--accent-deep), 0 6px 24px rgba(0,0,0,.6);
  animation-name: loaderHardcut;
  animation-timing-function: steps(1, end);
  animation-fill-mode: forwards;
}
```

Per-language font classes (`.lang-ml { font-family: 'Baloo Chettan 2', sans-serif; }`,
etc.) set only `font-family`; two condensed faces (Teko, Oswald) may need a
touch more `font-weight`/size tuning once seen live, since condensed display
faces can look lighter at the same pixel size as Unbounded 900 — call this
out for a quick visual pass during implementation rather than pre-guessing.

## Accessibility / performance

- `#loader` is already `aria-hidden="true"` — no screen-reader impact.
- `prefers-reduced-motion: reduce` already hides `#loader` entirely
  (`css/loader.css`); unchanged, so this whole overlay is skipped for users
  who've asked for reduced motion.
- Added weight: one extra font request (7 families, several single-weight)
  plus 11 small `<span>` elements. Negligible next to the 33-image roll
  already being loaded.

## Out of scope / not changing

- The ink-bleed wipe and final English name reveal (still Bebas Neue,
  unchanged).
- `ENABLE_ONCE_PER_SESSION` behavior in `loader.js` (currently disabled for
  review purposes) — not touched by this work.
