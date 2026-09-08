<?php
$pageTitle       = "Accessibility Statement | Alf's Cycles";
$pageDescription = "Alf's Cycles accessibility statement — our commitment to WCAG 2.1 AA, a plain-English guide to web accessibility, and how to get help if you hit a barrier.";
$pathPrefix      = '/alfs/';
$currentPage     = '';
$canonical       = '/alfs/accessibility.php';
?>
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <?php include __DIR__ . '/includes/head.php'; ?>
</head>
<body>

    <?php include __DIR__ . '/includes/header.php'; ?>

    <main id="main" tabindex="-1">

        <section aria-label="Accessibility statement">
            <article>

                <h1>Accessibility Statement</h1>

                <p>Alf's Cycles is committed to making this website usable by as many people as possible. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA — the standard most government and public-sector sites in the UK are required to meet under the Public Sector Bodies Accessibility Regulations 2018.</p>

                <p>This page is partly a statement and partly a short, plain-English guide to web accessibility. We've kept it here because we think understanding <em>why</em> these things matter is more useful than just a checklist.</p>


                <h2>What is web accessibility?</h2>

                <p>Web accessibility means designing and building websites so they work for everyone — including people who use a screen reader, navigate only with a keyboard, have low vision, are colour-blind, use voice control, or just have an old phone and a patchy connection. Accessibility is not a niche concern: roughly <strong>1 in 5 people in the UK lives with a disability</strong> (Family Resources Survey, DWP), and most of us will need accessibility features at some point — temporarily (a broken arm, a noisy train, bright sunlight on a screen) or permanently.</p>

                <p>An accessible website is also faster, easier to use on a phone, easier for search engines to index, and easier to translate. Building things this way costs little extra if it's done from the start; retrofitting afterwards is where the cost lives.</p>


                <h2>The four principles of WCAG (POUR)</h2>

                <p>WCAG is built on four ideas. The acronym is <strong>POUR</strong>:</p>

                <h3>1. Perceivable</h3>
                <p>Information must be presentable to users in ways they can perceive. Images need text alternatives (<code>alt</code> text), videos need captions, colour can't be the only way to convey information, and there must be enough contrast between text and background. On this site, we use a minimum contrast ratio of <strong>4.5:1</strong> for normal text — about double what unaided black-and-cream might offer at the wrong shade.</p>

                <h3>2. Operable</h3>
                <p>Every interactive element must be usable by a keyboard alone — not just a mouse. Users must have enough time to read and interact with content, and we shouldn't trigger seizures (so no rapid flashing). Navigation should be predictable: the same link should go to the same place from every page.</p>

                <h3>3. Understandable</h3>
                <p>Text should be readable. Pages should behave in predictable ways. When the user makes a mistake (say, in a form), the site should explain what went wrong in plain language and suggest how to fix it.</p>

                <h3>4. Robust</h3>
                <p>Content must work with current and future tools, including assistive technologies. In practice that means writing valid HTML, using semantic elements (<code>nav</code>, <code>main</code>, <code>article</code>, etc.) instead of generic <code>div</code> wrappers, and leaning on standards rather than browser quirks.</p>


                <h2>Who benefits?</h2>

                <ul>
                    <li><strong>People who are blind or have low vision</strong> rely on screen readers (which speak the page aloud), screen magnifiers, or high-contrast modes.</li>
                    <li><strong>People with motor or dexterity impairments</strong> may use a keyboard only, a switch device, eye-tracking or voice control — anything that isn't a precise mouse pointer.</li>
                    <li><strong>People who are deaf or hard of hearing</strong> need captions for audio and video.</li>
                    <li><strong>People with cognitive or learning differences</strong> benefit from clear language, consistent layouts and the ability to control motion (no auto-playing animation).</li>
                    <li><strong>Everyone else</strong> — from someone on a slow rural connection to a tourist using Google Translate — benefits from semantic HTML, captions and readable type.</li>
                </ul>


                <h2>Common assistive technologies</h2>

                <h3>Screen readers</h3>
                <p>Software that reads the page aloud, in order. The two most widely used are <strong>NVDA</strong> (free, Windows), <strong>JAWS</strong> (paid, Windows), <strong>VoiceOver</strong> (built into macOS and iOS), and <strong>TalkBack</strong> (built into Android). Screen readers rely heavily on correct HTML structure — they can't infer meaning from visual styling alone.</p>

                <h3>Screen magnifiers</h3>
                <p>Tools like <strong>ZoomText</strong> or the built-in OS magnifier enlarge a portion of the screen. Sites that re-flow at 200% zoom without horizontal scrolling are much easier to use with magnifiers.</p>

                <h3>Keyboard-only navigation</h3>
                <p>Many people don't use a mouse at all. They tab through links and buttons using the <kbd>Tab</kbd> key, activate them with <kbd>Enter</kbd> or <kbd>Space</kbd>, and rely on a visible focus outline to know where they are. Try it on this site — pressing <kbd>Tab</kbd> from the top should reveal a "Skip to main content" link.</p>

                <h3>Voice control</h3>
                <p>Tools like <strong>Dragon NaturallySpeaking</strong> or built-in OS voice control let users navigate by saying "click contact" or "scroll down." Voice control depends on links having sensible visible names — "click here" links are a nightmare.</p>


                <h2>Adjust your own settings</h2>

                <p>Your browser and operating system already offer powerful accessibility tools you may not have tried:</p>

                <ul>
                    <li><strong>Zoom the page</strong>: <kbd>Ctrl</kbd> + <kbd>+</kbd> (Windows/Linux) or <kbd>⌘</kbd> + <kbd>+</kbd> (macOS). This site re-flows up to 400% zoom without losing content.</li>
                    <li><strong>Reader mode</strong>: most browsers (Firefox, Safari, Edge) have a one-click button that strips the page down to its text — perfect for long articles like our <a href="./pages/story.php">Our Story</a> page.</li>
                    <li><strong>Reduce motion</strong>: enable "Reduce motion" in your OS settings to stop the rotating headline on the home page and the slide-in mobile menu. This site listens for <code>prefers-reduced-motion</code>.</li>
                    <li><strong>Force dark mode</strong> or high-contrast mode: in your OS settings. The site uses sufficient colour contrast in either direction.</li>
                </ul>


                <h2>What we've done on this site</h2>

                <ul>
                    <li>Semantic HTML5 throughout — proper headings (one <code>h1</code> per page, no skipped levels), landmarks (<code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code>) and lists. Zero <code>&lt;div&gt;</code>, zero classes, zero IDs (with one exception: <code>id="main"</code> for the skip-link target).</li>
                    <li>A "Skip to main content" link as the first focusable element — invisible until you tab to it.</li>
                    <li>ARIA labels on every navigation region, status pill and interactive control. The rotating hero headline uses a fixed <code>aria-label</code> so screen readers get one stable announcement.</li>
                    <li>Colour contrast verified at <strong>5.13:1 or better</strong> for every text/background pair, meeting WCAG AA for both normal and large text.</li>
                    <li>All images have meaningful <code>alt</code> text; the decorative cat-paw illustration uses <code>alt=""</code> and <code>aria-hidden="true"</code>.</li>
                    <li>Tap targets are at least <strong>44 × 44 pixels</strong> for buttons, links and form fields (WCAG 2.5.5).</li>
                    <li>Fully responsive from <strong>320 px upward</strong>, mobile-first — no horizontal scroll at any width.</li>
                    <li>Forms use proper <code>label</code> association, <code>required</code> attributes, <code>autocomplete</code> hints, and confirmation / error messages with <code>role="status"</code> and <code>role="alert"</code> so screen readers announce them.</li>
                    <li>The shop-open status pill in the header is announced via <code>aria-live="polite"</code> when its state changes between Open and Closed.</li>
                    <li>The horizontal "What we do" gallery on the home page supports mouse drag, touch swipe, <em>and</em> keyboard arrow-key scrolling.</li>
                    <li>Animations respect the <code>prefers-reduced-motion</code> media query — the rotating headline and slide-in menu hold still for users who've asked for it.</li>
                    <li>Page structure validated against W3C HTML and CSS validators.</li>
                </ul>


                <h2>Known limitations</h2>

                <p>We're not perfect. Things we are still working on:</p>
                <ul>
                    <li>The horizontal scroll gallery on the home page is operable with keyboard arrows and mouse drag, but some assistive technologies may treat it as a generic scroll region rather than a list of links. We are actively reviewing this with a more explicit list semantic.</li>
                    <li>Three of the bike-photo files on the site could be smaller. We're scheduled to recompress them to WebP at a lower quality level — until then the home page weighs a little more than it should on slow connections.</li>
                    <li>The shop-status pill currently uses the visitor's local time. A traveller in another timezone will see a status calculated against their clock, not ours. We're considering switching it to Europe/London time.</li>
                </ul>


                <h2>Need help?</h2>

                <p>If you encounter any accessibility barrier on this site — anything from a hard-to-read colour to a form field that confuses your screen reader — please get in touch. We aim to respond within five working days.</p>
                <p>
                    <a href="tel:+441768772345" aria-label="Call Alf's Cycles on 0 1 7 6 8 7 7 2 3 4 5">017687 72345</a>
                    &middot;
                    <a href="./pages/contact.php">Send us a message</a>
                </p>


                <h2>Further reading</h2>

                <ul>
                    <li><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">W3C — WCAG (Web Content Accessibility Guidelines, opens in a new tab)</a></li>
                    <li><a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noopener noreferrer">W3C — Introduction to Web Accessibility (opens in a new tab)</a></li>
                    <li><a href="https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag" target="_blank" rel="noopener noreferrer">GOV.UK — Understanding WCAG 2.2 (opens in a new tab)</a></li>
                    <li><a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">WebAIM WAVE — accessibility checker (opens in a new tab)</a></li>
                    <li><a href="https://www.a11yproject.com/checklist/" target="_blank" rel="noopener noreferrer">The A11Y Project — accessibility checklist (opens in a new tab)</a></li>
                </ul>


                <p><small>Statement last reviewed: <?= date('F Y') ?>. This site is built and maintained as a Greenwich University Module 1 coursework project; the company itself is a fictional case study.</small></p>

            </article>
        </section>

    </main>

    <?php include __DIR__ . '/includes/footer.php'; ?>

</body>
</html>
