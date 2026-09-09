# Work Page Brand-Story Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `pages/work.html` into a detailed brand-story showcase: four full case-study "chapters" (Kickershoe, Rasam, Malker, Alf's Cycles) with real screenshots/content pulled from the live sites, plus a smaller Behance "more work" grid.

**Architecture:** Single page, extended in place. A new `.chapter` component (with per-brand CSS custom-property tints) replaces the old shallow `.project-box` sections; a sticky `.chapter-nav` gives quick orientation; the old crossfading "social media" gallery is retired in favor of a `.more-work` grid. All new interaction (fade-ups, parallax, scroll-spy) reuses the existing GSAP/ScrollTrigger setup already in `pages/work.js` — no new dependency.

**Tech Stack:** Static HTML/CSS/JS, GSAP + ScrollTrigger + Lenis (already loaded via CDN in `pages/work.html`). No build step, no test runner — this is a static site served via `python -m http.server` (see `.claude/launch.json`, config name `portfolio-2026`) and deployed to Vercel. Verification in this plan is therefore **visual/manual via the browser preview**, not automated tests.

**Design spec:** `docs/superpowers/specs/2026-09-09-work-page-brand-showcase-design.md`

---

## Assets already prepared

Before Task 1, the following images were downloaded from the live project sites and Stalin's Behance profile, converted to `.webp` (quality 82, resized to sane web widths), and saved into `assets/projects/` — **these already exist on disk, no task recreates them**:

```
assets/projects/kickershoe-shoe.webp       (1166×652 — Mantis boot product shot)
assets/projects/kickershoe-mantis.webp     (1000×695 — Issue 001 story panel)
assets/projects/kickershoe-elephant.webp   (1000×695 — Issue 003 story panel)
assets/projects/kickershoe-logo.svg
assets/projects/rasam-banner-fresh.webp    (1600×678 — kolam being drawn by hand)
assets/projects/rasam-ornament.webp        (800×799 — gold kolam motif graphic)
assets/projects/malker-family.webp         (804×584 — mother & son, homepage hero)
assets/projects/malker-doctor.webp         (333×510 — care professional portrait)
assets/projects/malker-diversity.webp      (353×434 — "Different Abilities" graphic)
assets/projects/alfs-mascot-wheelie.webp   (876×730 — fox mascot mid-wheelie)
assets/projects/alfs-logo.png
assets/projects/behance-qua.webp
assets/projects/behance-rasam-identity.webp
assets/projects/behance-plutus.webp
assets/projects/behance-stewmaker.webp
assets/projects/behance-wix-website.webp
assets/projects/behance-website-dev.webp
assets/projects/behance-justdoit.webp
```

Already-existing assets reused as-is: `assets/projects/alflaptop.webp`, `assets/projects/rasam.webp`, `assets/alfmobile.webp`, `assets/rasamlogo.webp`.

---

### Task 1: Chapter system CSS + chapter nav + hero track refresh

**Files:**
- Modify: `pages/work.css` (append new component CSS)
- Modify: `pages/work.html:56-73` (hero `.infinity-track` image list)
- Modify: `pages/work.html:38-39` (insert `<nav class="chapter-nav">` right after `</header>`, before `<main>`... actually after hero, see step 3)

- [ ] **Step 1: Refresh the hero infinity track**

In `pages/work.html`, find the `<div class="infinity-track">...</div>` block (currently lines 58-71) and replace its contents so the rotating preview represents all four case studies, not just two, with a clean two-cycle repeat (required for the existing `infinityScroll` keyframe's `translateY(-50%)` loop to stay seamless):

```html
                <div class="infinity-track">
                    <img src="../assets/projects/kickershoe-shoe.webp" alt="Kickershoe">
                    <img src="../assets/projects/rasam-banner-fresh.webp" alt="Rasam">
                    <img src="../assets/projects/malker-family.webp" alt="Malker Trusted Care">
                    <img src="../assets/projects/alflaptop.webp" alt="Alf's Cycles">
                    <img src="../assets/projects/kickershoe-shoe.webp" alt="Kickershoe">
                    <img src="../assets/projects/rasam-banner-fresh.webp" alt="Rasam">
                    <img src="../assets/projects/malker-family.webp" alt="Malker Trusted Care">
                    <img src="../assets/projects/alflaptop.webp" alt="Alf's Cycles">
                </div>
```

- [ ] **Step 2: Add the chapter-nav markup**

Still in `pages/work.html`, immediately after the closing `</section>` of `.work-hero` (currently line 74) and before the `<!-- ALF'S CYCLES -->` comment, insert:

```html

        <!-- CHAPTER NAV -->
        <nav class="chapter-nav" aria-label="Jump to a project">
            <a href="#kickershoe" class="chapter-nav-link" data-chapter="kickershoe"><span class="num">01</span> Kickershoe</a>
            <a href="#rasam" class="chapter-nav-link" data-chapter="rasam"><span class="num">02</span> Rasam</a>
            <a href="#malker" class="chapter-nav-link" data-chapter="malker"><span class="num">03</span> Malker</a>
            <a href="#alfs" class="chapter-nav-link" data-chapter="alfs"><span class="num">04</span> Alf's</a>
        </nav>
```

(The `<!-- ALF'S CYCLES -->` section right after this is replaced in Task 5 — leave it in place for now, Task 1 only adds the nav above it.)

- [ ] **Step 3: Add the chapter/chapter-nav CSS system**

Append to the end of `pages/work.css`:

```css
/* ───────── CHAPTER NAV ───────── */
.chapter-nav {
    position: sticky;
    top: 1rem;
    z-index: 20;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0 auto 3rem;
    padding: 0 4.5%;
}
.chapter-nav-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.1rem;
    border-radius: 100px;
    border: 1px solid var(--ink-faint);
    background: rgba(26, 23, 21, 0.6);
    backdrop-filter: blur(8px);
    font-size: 0.78rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--ink-soft);
    font-weight: 600;
    transition: color 0.3s, border-color 0.3s, background 0.3s;
}
.chapter-nav-link .num { opacity: 0.6; }
.chapter-nav-link.active,
.chapter-nav-link:hover {
    color: var(--ink);
    border-color: var(--accent-2);
    background: rgba(47, 38, 32, 0.85);
}

/* ───────── CHAPTERS ───────── */
.chapter { position: relative; padding: 6rem 4.5%; overflow: hidden; }
.chapter-tint { position: absolute; inset: 0; background: var(--chapter-tint); pointer-events: none; z-index: 0; }
.chapter-inner { position: relative; z-index: 1; max-width: 1150px; margin: 0 auto; }
.chapter-head { margin-bottom: 2.6rem; max-width: 70ch; }
.chapter-index {
    display: inline-block;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--chapter-accent);
    letter-spacing: 1px;
    margin-bottom: 0.6rem;
}
.chapter-meta {
    display: block;
    font-size: 0.78rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 1rem;
}
.chapter-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.6rem, 6vw, 5rem);
    line-height: 0.94;
    letter-spacing: -2px;
    margin-bottom: 1rem;
}
.chapter-brief {
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 56ch;
}
.chapter-beats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.8rem;
    margin-bottom: 2.8rem;
}
.chapter-beat h3 {
    font-family: var(--font-display);
    font-size: 0.95rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--chapter-accent);
    margin-bottom: 0.7rem;
}
.chapter-beat p { font-size: 0.92rem; line-height: 1.7; color: var(--ink-soft); }
.chapter-gallery { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.2rem; }
.chapter-gallery img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 18px;
    box-shadow: var(--shadow-sm);
}
.chapter-gallery-main { grid-row: span 2; aspect-ratio: 4 / 3.1; }
.chapter-gallery-sub { aspect-ratio: 4 / 3; }
.chapter-live-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.6rem;
    padding: 0.7rem 1.4rem;
    border-radius: 100px;
    background: var(--chapter-accent);
    color: #0d0b0a;
    font-size: 0.85rem;
    font-weight: 700;
    transition: transform 0.3s var(--ease-spring);
}
.chapter-live-link:hover { transform: translateY(-2px); }

/* per-brand tints — restrained washes on top of the page's own dark
   surface, not a full palette swap (see design spec) */
.chapter--kickershoe {
    --chapter-tint: radial-gradient(circle at 15% 0%, rgba(57,255,20,0.10) 0%, transparent 45%),
                     radial-gradient(circle at 100% 100%, rgba(154,28,227,0.18) 0%, transparent 55%);
    --chapter-accent: #7cf25c;
}
.chapter--rasam {
    --chapter-tint: radial-gradient(circle at 85% 0%, rgba(217,178,95,0.12) 0%, transparent 45%),
                     radial-gradient(circle at 0% 100%, rgba(20,80,55,0.35) 0%, transparent 55%);
    --chapter-accent: #d9b25f;
}
.chapter--malker {
    --chapter-tint: radial-gradient(circle at 10% 10%, rgba(111,168,245,0.14) 0%, transparent 50%);
    --chapter-accent: #6fa8f5;
}
.chapter--alfs {
    --chapter-tint: radial-gradient(circle at 90% 10%, rgba(226,96,79,0.14) 0%, transparent 50%);
    --chapter-accent: #e2604f;
}

@media screen and (max-width: 820px) {
    .chapter-beats { grid-template-columns: 1fr; }
    .chapter-gallery { grid-template-columns: 1fr; }
    .chapter-gallery-main { grid-row: auto; }
    .chapter-nav { position: static; }
}
```

- [ ] **Step 4: Verify in the browser**

Use the preview tool: start the `portfolio-2026` server (`.claude/launch.json`), navigate to `/pages/work.html`. Confirm:
- The hero's rotating image stack now shows the Kickershoe shoe shot, Rasam kolam photo, Malker family photo, and Alf's laptop mockup cycling smoothly (no visible jump/seam).
- A pill-shaped nav row with "01 Kickershoe · 02 Rasam · 03 Malker · 04 Alf's" appears below the hero and stays visible (sticky) as you scroll past it.
- No console errors (`read_console_messages`).

- [ ] **Step 5: Commit**

```bash
git add pages/work.html pages/work.css
git commit -m "Add chapter nav + chapter CSS system, refresh hero image stack

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Kickershoe chapter

**Files:**
- Modify: `pages/work.html` (insert new section before `<!-- ALF'S CYCLES -->`)

- [ ] **Step 1: Insert the Kickershoe chapter**

Immediately before the existing `<!-- ALF'S CYCLES -->` comment, insert:

```html
        <!-- CHAPTER 01 — KICKERSHOE -->
        <section id="kickershoe" class="chapter chapter--kickershoe fade-up">
            <div class="chapter-tint" aria-hidden="true"></div>
            <div class="chapter-inner">
                <div class="chapter-head">
                    <span class="chapter-index">01</span>
                    <span class="chapter-meta">Concept · Motion-comic brand site · kickershoe.com</span>
                    <h2 class="chapter-title">Kickershoe</h2>
                    <p class="chapter-brief">A sneaker launch competing with a hundred other "shop now" product
                        pages fighting for the same five seconds of attention — so instead of specs and studio
                        photography, the brand became a motion comic.</p>
                </div>
                <div class="chapter-beats">
                    <div class="chapter-beat">
                        <h3>The Brief</h3>
                        <p>Launch a new shoe line in a category where every competitor leads with the same
                            white-background product shot and a bullet list of materials.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Direction</h3>
                        <p>Give every shoe an origin myth instead of a spec sheet. Four creatures — a mantis, a
                            goat, an elephant, a goldfish — each carry the true story behind one silhouette, told
                            through case-file typography, redacted field notes and illustrated evidence photography
                            rather than feature bullets. The dark purple-to-green palette was sampled straight from
                            this artwork — it's the same gradient this portfolio's own accent colour is built
                            from.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Result</h3>
                        <p>A product page that reads like the first issue of a comic, not a catalog — visitors
                            "read" the shoe before they ever see a price tag.</p>
                    </div>
                </div>
                <div class="chapter-gallery box-parallax">
                    <img src="../assets/projects/kickershoe-shoe.webp" alt="The Mantis boot floating in green light, product shot for Kickershoe's origin comic" class="chapter-gallery-main">
                    <img src="../assets/projects/kickershoe-mantis.webp" alt="The mantis and his frog friend hidden in the tall grass at night, Kickershoe Issue 001" class="chapter-gallery-sub">
                    <img src="../assets/projects/kickershoe-elephant.webp" alt="A young elephant dribbling a basketball alone on a city street court at night, Kickershoe Issue 003" class="chapter-gallery-sub">
                </div>
                <a href="https://kickershoe.com/" target="_blank" class="chapter-live-link">Visit kickershoe.com ↗</a>
            </div>
        </section>

```

- [ ] **Step 2: Verify in the browser**

Reload `/pages/work.html`. Confirm the Kickershoe chapter renders between the chapter-nav and the (still old, for now) Alf's Cycles section: index "01", green-accented headings, three beat columns readable, gallery showing the shoe as the large image with the mantis/elephant panels beside it, "Visit kickershoe.com ↗" pill button working. Click "01 Kickershoe" in the chapter nav and confirm it jumps to this section.

- [ ] **Step 3: Commit**

```bash
git add pages/work.html
git commit -m "Add Kickershoe case-study chapter

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Rasam chapter (replaces old section)

**Files:**
- Modify: `pages/work.html` (replace the `<!-- RASAM -->` section)

- [ ] **Step 1: Replace the old Rasam section**

Find the existing block:

```html
        <!-- RASAM -->
        <section class="project-section fade-up">
            <div class="project-box">
                <div class="project-header">
                    <span class="proj-index">02 — Web · Social</span>
                    <h2 class="project-title">Rasam<br>Project</h2>
                    <p class="project-text">For Rasam, a Dubai-based cuisine brand, we developed a premium social media
                        and website experience centered around a strong cultural narrative. The approach focused on raw,
                        content-driven storytelling to maintain authenticity while elevating the brand's visual
                        identity. The result was impactful and the project proved to be a great success.</p>
                </div>
                <a href="https://rasam.ae/" target="_blank" class="rasam-linkbox box-parallax">
                    <img src="../assets/rasam.webp" alt="Rasam website welcome" class="rasam-img">
                    <span class="rasam-visit">Visit live site ↗</span>
                </a>
            </div>
        </section>
```

and replace it entirely with:

```html
        <!-- CHAPTER 02 — RASAM -->
        <section id="rasam" class="chapter chapter--rasam fade-up">
            <div class="chapter-tint" aria-hidden="true"></div>
            <div class="chapter-inner">
                <div class="chapter-head">
                    <span class="chapter-index">02</span>
                    <span class="chapter-meta">Client work · Website + brand identity + social · Discovery Gardens, Dubai</span>
                    <h2 class="chapter-title">Rasam</h2>
                    <p class="chapter-brief">Chef Avinash Mohan needed a home for RASAM that matched five-star-kitchen
                        credentials — not a template indistinguishable from every other "fine dining, Dubai" site.</p>
                </div>
                <div class="chapter-beats">
                    <div class="chapter-beat">
                        <h3>The Brief</h3>
                        <p>Give a South Indian fine-dining restaurant a premium web presence built around its
                            chef's career and its cultural roots, not a generic booking-site template.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Direction</h3>
                        <p>Deep green and gold instead of the genre's usual white-and-gold; a kolam — traditional
                            South Indian floor art — standing in for stock ornamental borders; an editorial serif
                            headline paired with tracked-out uppercase labels; real photography of the chef and the
                            dishes, never stock food imagery. The pantry/shop section routes straight to WhatsApp
                            ordering, so there's no separate checkout system to build or maintain.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Result</h3>
                        <p>Live at rasam.ae with a 4.5★ rating across 1,900+ Google reviews — the identity carried
                            through to social media and the ordering pantry too.</p>
                    </div>
                </div>
                <div class="chapter-gallery box-parallax">
                    <img src="../assets/projects/rasam-banner-fresh.webp" alt="A kolam being drawn by hand on the ground, the motif at the centre of Rasam's brand" class="chapter-gallery-main">
                    <img src="../assets/projects/rasam.webp" alt="Rasam restaurant website homepage" class="chapter-gallery-sub">
                    <img src="../assets/rasamlogo.webp" alt="Rasam restaurant logo lockup" class="chapter-gallery-sub">
                </div>
                <a href="https://rasam.ae/" target="_blank" class="chapter-live-link">Visit rasam.ae ↗</a>
            </div>
        </section>
```

- [ ] **Step 2: Verify in the browser**

Reload `/pages/work.html`. Confirm the Rasam chapter now matches the same structure as Kickershoe (index "02", gold-accented headings, green-tinted wash), the kolam photo is the dominant image, and "Visit rasam.ae ↗" opens the live site in a new tab. Click "02 Rasam" in the chapter nav to confirm the anchor jump works.

- [ ] **Step 3: Commit**

```bash
git add pages/work.html
git commit -m "Rework Rasam section into the new chapter format

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Malker chapter (new)

**Files:**
- Modify: `pages/work.html` (insert new section after the Rasam chapter, before Alf's)

- [ ] **Step 1: Insert the Malker chapter**

Immediately after the Rasam `</section>` (added in Task 3) and before `<!-- ALF'S CYCLES -->`, insert:

```html
        <!-- CHAPTER 03 — MALKER -->
        <section id="malker" class="chapter chapter--malker fade-up">
            <div class="chapter-tint" aria-hidden="true"></div>
            <div class="chapter-inner">
                <div class="chapter-head">
                    <span class="chapter-index">03</span>
                    <span class="chapter-meta">Client work · Website · NDIS-registered homecare · Australia</span>
                    <h2 class="chapter-title">Malker<br>Trusted Care</h2>
                    <p class="chapter-brief">A disability-support and homecare provider needed a site a nervous
                        first-time visitor could trust within seconds — built for that visitor, not to impress
                        other designers.</p>
                </div>
                <div class="chapter-beats">
                    <div class="chapter-beat">
                        <h3>The Brief</h3>
                        <p>Present an NDIS-registered homecare service to families who are often reaching out at a
                            difficult moment, and need to trust the provider immediately.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Direction</h3>
                        <p>Here the aesthetic decision <em>is</em> restraint — clean blue and white, credibility
                            signals (the NDIS Registered Provider badge, phone and email) visible from the first
                            screen, real care photography instead of stock imagery, one unambiguous "Free
                            Consultation" call to action. No mascot, no ornamental motif — the opposite instinct to
                            Kickershoe or Rasam, deliberately.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Result</h3>
                        <p>A site that reads as credible and calm for a healthcare audience — proof the same
                            instinct scales down to "no flourish at all" when the brief calls for it.</p>
                    </div>
                </div>
                <div class="chapter-gallery box-parallax">
                    <img src="../assets/projects/malker-family.webp" alt="A mother and son smiling together at home, from the Malker Trusted Care homepage" class="chapter-gallery-main">
                    <img src="../assets/projects/malker-doctor.webp" alt="A smiling care professional in scrubs, from the Malker Trusted Care site" class="chapter-gallery-sub">
                    <img src="../assets/projects/malker-diversity.webp" alt="Different Abilities, Equal value-statement graphic from Malker Trusted Care" class="chapter-gallery-sub">
                </div>
                <a href="https://malkertrustedcare.com.au/" target="_blank" class="chapter-live-link">Visit malkertrustedcare.com.au ↗</a>
            </div>
        </section>

```

- [ ] **Step 2: Verify in the browser**

Reload `/pages/work.html`. Confirm the Malker chapter appears between Rasam and Alf's, index "03", blue-accented headings, the family photo as the dominant image. Click "03 Malker" in the chapter nav to confirm the anchor jump works.

- [ ] **Step 3: Commit**

```bash
git add pages/work.html
git commit -m "Add Malker Trusted Care case-study chapter

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Alf's Cycles chapter (replaces old section, closes the four)

**Files:**
- Modify: `pages/work.html` (replace the `<!-- ALF'S CYCLES -->` section)

- [ ] **Step 1: Replace the old Alf's Cycles section**

Find the existing block:

```html
        <!-- ALF'S CYCLES -->
        <section class="project-section fade-up">
            <div class="project-box">
                <div class="project-header">
                    <span class="proj-index">01 — Web · Story</span>
                    <h2 class="project-title">Alf's<br>Cycles</h2>
                    <p class="project-text">The Alf Cycle project was all about storytelling through design. I explored
                        a narrative-driven approach, making the website feel like a journey rather than just a layout.
                        One of my favourite parts was creating a visual character that helped shape the mood and
                        identity of the experience.</p>
                </div>
                <div class="project-images">
                    <img src="../assets/alfmobile.webp" alt="Alf Cycles screenshot 1" class="full-width-img box-parallax">
                    <img src="../assets/alflaptop.webp" alt="Alf Cycles screenshot 2" class="full-width-img box-parallax">
                </div>
            </div>
        </section>
```

and replace it entirely with:

```html
        <!-- CHAPTER 04 — ALF'S CYCLES -->
        <section id="alfs" class="chapter chapter--alfs fade-up">
            <div class="chapter-tint" aria-hidden="true"></div>
            <div class="chapter-inner">
                <div class="chapter-head">
                    <span class="chapter-index">04</span>
                    <span class="chapter-meta">Concept · Narrative-driven website · Keswick, est. 1987</span>
                    <h2 class="chapter-title">Alf's<br>Cycles</h2>
                    <p class="chapter-brief">The bikes time forgot, and we found. Not restored. Resurrected.</p>
                </div>
                <div class="chapter-beats">
                    <div class="chapter-beat">
                        <h3>The Brief</h3>
                        <p>A local bike shop's brief, reframed: not a repairs-and-price-list brochure, but a site
                            that feels like walking into a shop with 35 years of history and a personality of its
                            own.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Direction</h3>
                        <p>Warm cream and red instead of a "sporty" blue-and-black bike-shop palette; a hand-drawn
                            fox mascot doing bike tricks as the site's actual visual voice; a dedicated "Alf's
                            stories" section most repair-shop sites would cut as unnecessary.</p>
                    </div>
                    <div class="chapter-beat">
                        <h3>The Result</h3>
                        <p>The most personal, illustration-led project on this page — closing proof that the
                            story-first instinct isn't reserved for paying clients.</p>
                    </div>
                </div>
                <div class="chapter-gallery box-parallax">
                    <img src="../assets/projects/alfs-mascot-wheelie.webp" alt="Illustrated cyclist mid-wheelie, the Alf's Cycles mascot" class="chapter-gallery-main">
                    <img src="../assets/projects/alflaptop.webp" alt="Alf's Cycles website on a laptop screen" class="chapter-gallery-sub">
                    <img src="../assets/alfmobile.webp" alt="Alf's Cycles website on a mobile screen" class="chapter-gallery-sub">
                </div>
                <a href="https://www.stalineapen.uk/alfs" target="_blank" class="chapter-live-link">Visit the live site ↗</a>
            </div>
        </section>
```

- [ ] **Step 2: Verify in the browser**

Reload `/pages/work.html`. Confirm all four chapters now appear in order (Kickershoe, Rasam, Malker, Alf's), Alf's shows index "04" with red-accented headings and the mascot artwork as the dominant image, and "Visit the live site ↗" opens `stalineapen.uk/alfs`. Click "04 Alf's" in the chapter nav to confirm the jump works, and scroll through the full page once top-to-bottom checking all four chapters read cleanly back-to-back.

- [ ] **Step 3: Commit**

```bash
git add pages/work.html
git commit -m "Rework Alf's Cycles section into the new chapter format, closing the showcase

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Retire the old social gallery, add the "More work" Behance grid

**Files:**
- Modify: `pages/work.html` (replace `<!-- SOCIAL MEDIA -->` section)
- Modify: `pages/work.css` (remove `.section-social`/`.social-*`/`.gallery-img` rules, add `.more-work` rules)
- Modify: `pages/work.js` (remove the crossfading-gallery `setInterval` block)

- [ ] **Step 1: Replace the old social-media gallery section**

Find the existing block:

```html
        <!-- SOCIAL MEDIA -->
        <section class="project-section section-social fade-up">
            <span class="proj-index center">03 — Graphic · Social</span>
            <h2 class="social-title">social media</h2>
            <div class="social-box box-parallax">
                <div class="social-gallery">
                    <img src="../assets/tarzx.webp" class="gallery-img active" alt="Social 1">
                    <img src="../assets/alf-cycle.webp" class="gallery-img" alt="Social 2">
                    <img src="../assets/ras1.webp" class="gallery-img" alt="Social 3">
                    <img src="../assets/qua.webp" class="gallery-img" alt="Social 4">
                    <img src="../assets/ra2.webp" class="gallery-img" alt="Social 5">
                    <img src="../assets/tarzx.webp" class="gallery-img" alt="Social 6">
                    <img src="../assets/ra3.webp" class="gallery-img" alt="Social 7">
                    <img src="../assets/sickshoes.webp" class="gallery-img" alt="Social 8">
                    <img src="../assets/rasamlogo.webp" class="gallery-img" alt="Social 9">
                    <img src="../assets/ra4.webp" class="gallery-img" alt="Social 10">
                    <img src="../assets/ra5.webp" class="gallery-img" alt="Social 11">
                </div>
            </div>
        </section>
```

and replace it entirely with:

```html
        <!-- MORE WORK — BEHANCE -->
        <section class="more-work fade-up">
            <div class="more-work-head">
                <span class="proj-index center">Also on Behance</span>
                <h2 class="more-work-title">more work</h2>
                <p class="more-work-lead">Smaller logo, motion and brand-identity pieces — the sketchbook behind
                    the four case studies above.</p>
            </div>
            <div class="more-work-grid">
                <a href="https://www.behance.net/gallery/222139617/Qua-Brand-identity-designs" target="_blank" class="more-work-card">
                    <img src="../assets/projects/behance-qua.webp" alt="Qua Nutrition brand identity design" loading="lazy">
                    <span class="more-work-card-title">Qua Brand Identity</span>
                </a>
                <a href="https://www.behance.net/gallery/222138837/RASAM-Brand-identity-designing" target="_blank" class="more-work-card">
                    <img src="../assets/projects/behance-rasam-identity.webp" alt="RASAM brand identity designing" loading="lazy">
                    <span class="more-work-card-title">RASAM Brand Identity</span>
                </a>
                <a href="https://www.behance.net/gallery/217248899/PLutus-Logo-animation" target="_blank" class="more-work-card">
                    <img src="../assets/projects/behance-plutus.webp" alt="PLutus logo animation" loading="lazy">
                    <span class="more-work-card-title">PLutus Logo Animation</span>
                </a>
                <a href="https://www.behance.net/gallery/213921327/Stew-Maker-Logo-motion" target="_blank" class="more-work-card">
                    <img src="../assets/projects/behance-stewmaker.webp" alt="Stew Maker logo motion" loading="lazy">
                    <span class="more-work-card-title">Stew Maker Logo Motion</span>
                </a>
                <a href="https://www.behance.net/gallery/227295425/Wix-Website-Design" target="_blank" class="more-work-card">
                    <img src="../assets/projects/behance-wix-website.webp" alt="Wix website design" loading="lazy">
                    <span class="more-work-card-title">Wix Website Design</span>
                </a>
                <a href="https://www.behance.net/gallery/227269799/Website-Design-Development" target="_blank" class="more-work-card">
                    <img src="../assets/projects/behance-website-dev.webp" alt="Website design and development" loading="lazy">
                    <span class="more-work-card-title">Website Design &amp; Development</span>
                </a>
                <a href="https://www.behance.net/gallery/174715469/Just-Do-It" target="_blank" class="more-work-card">
                    <img src="../assets/projects/behance-justdoit.webp" alt="Just Do It. creative piece" loading="lazy">
                    <span class="more-work-card-title">Just Do It.</span>
                </a>
            </div>
        </section>
```

- [ ] **Step 2: Remove the old social-gallery CSS, add `.more-work` CSS**

In `pages/work.css`, delete this block (the "Social media gallery" section):

```css
/* Social media gallery */
.section-social { text-align: center; }
.social-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.2rem, 6vw, 4.5rem);
    letter-spacing: -1px;
    margin-bottom: 2rem;
    text-transform: lowercase;
}
.social-box {
    max-width: 560px;
    margin: 0 auto;
    aspect-ratio: 4 / 5;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    border: 6px solid #fff8ee;
    box-shadow: var(--shadow);
    background: var(--paper-2);
}
.social-gallery { position: relative; width: 100%; height: 100%; }
.gallery-img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.04);
    transition: opacity 0.9s ease, transform 0.9s ease;
}
.gallery-img.active { opacity: 1; transform: scale(1); }
```

and add this in its place:

```css
/* More work — Behance grid */
.more-work { padding: 6rem 4.5%; text-align: center; }
.more-work-head { max-width: 640px; margin: 0 auto 3rem; }
.more-work-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.2rem, 6vw, 4rem);
    letter-spacing: -1px;
    text-transform: lowercase;
    margin: 0.6rem 0 1rem;
}
.more-work-lead { font-size: 0.98rem; line-height: 1.7; color: var(--ink-soft); }
.more-work-grid {
    max-width: 1150px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    text-align: left;
}
.more-work-card {
    display: block;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--ink-faint);
    background: var(--paper-2);
    transition: transform 0.35s var(--ease-out), border-color 0.35s;
}
.more-work-card:hover { transform: translateY(-4px); border-color: var(--accent-2); }
.more-work-card img { width: 100%; aspect-ratio: 4 / 3.1; object-fit: cover; }
.more-work-card-title { display: block; padding: 0.8rem 1rem; font-size: 0.85rem; font-weight: 600; color: var(--ink); }

@media screen and (max-width: 980px) {
    .more-work-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Remove the now-dead crossfading-gallery script**

In `pages/work.js`, delete this block:

```js
    /* crossfading social gallery */
    const galleryImgs = document.querySelectorAll(".gallery-img");
    if (galleryImgs.length) {
        let i = 0;
        setInterval(() => {
            galleryImgs[i].classList.remove("active");
            i = (i + 1) % galleryImgs.length;
            galleryImgs[i].classList.add("active");
        }, 2600);
    }
```

- [ ] **Step 4: Verify in the browser**

Reload `/pages/work.html`. Confirm the old crossfading gallery is gone, replaced by a "more work" heading and a 4-column grid (2-column on a resized/mobile viewport — check with `resize_window` preset `mobile`) of 7 Behance thumbnails, each opening its real Behance project page in a new tab on click. Check `read_console_messages` for errors (there should be none from the removed `setInterval` referencing now-absent elements).

- [ ] **Step 5: Commit**

```bash
git add pages/work.html pages/work.css pages/work.js
git commit -m "Replace social-media gallery with a Behance 'more work' grid

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: Chapter-nav scroll-spy + full-page verification pass

**Files:**
- Modify: `pages/work.js` (add IntersectionObserver-based active-link toggling)

- [ ] **Step 1: Add the scroll-spy**

In `pages/work.js`, inside the existing `document.addEventListener("DOMContentLoaded", () => { ... })` callback, add this block right after the `/* gentle image parallax */` block (i.e. after its closing `}`, before `/* crossfading social gallery */` was — now before `/* footer */`):

```js
    /* chapter-nav scroll-spy */
    const navLinks = document.querySelectorAll(".chapter-nav-link");
    const chapters = document.querySelectorAll(".chapter[id]");
    if (navLinks.length && chapters.length && "IntersectionObserver" in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => link.classList.toggle(
                        "active", link.dataset.chapter === entry.target.id
                    ));
                }
            });
        }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
        chapters.forEach((ch) => spy.observe(ch));
    }
```

- [ ] **Step 2: Verify the scroll-spy in the browser**

Reload `/pages/work.html`. Scroll slowly through the four chapters and confirm the matching chapter-nav pill (01/02/03/04) gains the `.active` state (visible highlight) as each chapter enters the middle of the viewport, using `read_page` or a screenshot at each scroll position to confirm the `active` class is present on the right link.

- [ ] **Step 3: Full-page verification pass**

Using the browser preview against `/pages/work.html`:
- `read_console_messages` — confirm no errors anywhere on the page.
- `computer` screenshot at the top of the page, and after scrolling through each of the four chapters and the "more work" grid — confirm every image loads (no broken-image icons) and text contrast is readable against each chapter's tint.
- `resize_window` to `mobile` (375×812) and reload — confirm chapters stack to one column (`chapter-beats` and `chapter-gallery` both single-column per the `max-width: 820px` media query), the chapter-nav still works (static position, no overlap), and the more-work grid drops to 2 columns.
- Click every `chapter-live-link` and every Behance card once to confirm all seven external links plus the four project links open the correct URLs (check via `read_network_requests` or by confirming the new tab's URL).

- [ ] **Step 4: Commit**

```bash
git add pages/work.js
git commit -m "Add chapter-nav scroll-spy

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Out of scope (per design spec)

- `about.html`, `contact.html`, `index.html`, shared header/footer/nav — untouched.
- Pinned/scrollytelling treatment — deliberately not used (see design spec's rejected alternatives).
- Full per-project sub-pages — everything stays on the single `work.html` page.
