<?php
$pageTitle       = "Page Not Found | Alf's Cycles";
$pageDescription = "The page you were looking for has slipped a chain. Head back to the home page to keep rolling.";
// Use absolute /alfs/ paths — 404.php can be served as the error page for
// any URL on the site (e.g. /alfs/foo/bar/), and relative paths would
// resolve against that URL, breaking every asset and link.
$pathPrefix      = '/alfs/';
$currentPage     = '';
$canonical       = '/alfs/404.php';

http_response_code(404);
?>
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <?php include __DIR__ . '/includes/head.php'; ?>
</head>
<body>

    <?php include __DIR__ . '/includes/header.php'; ?>

    <main id="main" tabindex="-1">

        <!-- 404 HERO — mirrors the home page hero layout -->
        <section aria-label="Page not found">
            <article>
                <figure>
                    <img src="/alfs/assets/icons/alf_doingWheelie_1.webp"
                         alt="Illustrated cyclist mid-wheelie, the Alf's Cycles mascot"
                         width="540" height="540" loading="eager">
                </figure>

                <section>
                    <h1>404</h1>
                    <p>Looks like this page slipped a chain.</p>
                    <p>The page you were after isn't here — but the road back is short.</p>

                    <a href="/alfs/index.php" aria-label="Back to the home page">
                        <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <circle cx="12" cy="12" r="11" fill="#00000f"></circle>
                            <path d="M14 7l-5 5 5 5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span>Back to home</span>
                    </a>
                </section>
            </article>
        </section>

        <!-- Where would you like to go? — link cards (mirrors home "What we do") -->
        <section aria-label="Where to go next">
            <h2>WHERE TO NEXT&hellip;</h2>

            <article>
                <a href="/alfs/pages/products.php" aria-label="Browse bikes and accessories">
                    <img src="/alfs/assets/images/vintage-cruiser.webp"
                         alt="Restored vintage cruiser bicycle"
                         width="400" height="500" loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Bikes &amp; accessories</strong>
                    <span>Vintage cruisers, classic path racers, kids' bikes and the kit to ride them.</span>
                </a>

                <a href="/alfs/pages/repair.php" aria-label="Repair and servicing">
                    <img src="/alfs/assets/images/mechanic-repairing-bicycle.webp"
                         alt="Mechanic adjusting the drivetrain on a bike at our workshop"
                         width="400" height="500" loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Repair &amp; servicing</strong>
                    <span>Fair prices, fast turnaround. Most jobs done in under 48 hours.</span>
                </a>

                <a href="/alfs/pages/story.php" aria-label="Read our story">
                    <img src="/alfs/assets/images/beautiful-fluffy-domestic-cat-sitting-by-window-with-bars-brick-wall.webp"
                         alt="Alf the shop cat sitting in a sunlit window"
                         width="400" height="500" loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Our story</strong>
                    <span>The shop, the cat, the rides — strictly personal.</span>
                </a>

                <a href="/alfs/pages/contact.php" aria-label="Get in touch">
                    <img src="/alfs/assets/images/expirienced-young-master-is-repairing-customer-s-bicycle-workplace-1.webp"
                         alt="Mechanic tuning a bicycle on a workshop stand"
                         width="400" height="500" loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Contact us</strong>
                    <span>Drop by, ring 017687 72345 or send us a message.</span>
                </a>

                <a href="/alfs/accessibility.php" aria-label="Accessibility statement">
                    <img src="/alfs/assets/svg/alf_doingWheelie.svg"
                         alt="Illustrated cyclist popping a wheelie"
                         width="400" height="500" loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Accessibility</strong>
                    <span>How we've built this site to work for everyone.</span>
                </a>
            </article>
        </section>

    </main>

    <?php include __DIR__ . '/includes/footer.php'; ?>

</body>
</html>
