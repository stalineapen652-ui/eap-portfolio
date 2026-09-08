<?php
$pageTitle = "Alf's Cycles | Your Local Cycling Experts Since 1987";
$pageDescription = "Alf's Cycles - Keswick's trusted bike shop since 1987. Quality bikes, expert repairs and friendly local cycling knowledge.";
$pathPrefix = './';
$currentPage = 'home';
$canonical = '/alfs/';
?>
<!DOCTYPE html>
<html lang="en-GB">

<head>
    <?php include __DIR__ . '/includes/head.php'; ?>
</head>

<body>

    <?php include __DIR__ . '/includes/header.php'; ?>

    <main id="main" tabindex="-1">

        <!-- HERO -->
        <section aria-label="Welcome">
            <article>
                <figure>
                    <img src="./assets/icons/alf_doingWheelie_1.webp"
                        alt="Illustrated cyclist mid-wheelie, the Alf's Cycles mascot" width="540" height="540"
                        loading="eager">
                </figure>

                <section>
                    <!-- Rotating hero headline. aria-label gives screen readers
                         one stable announcement; the visible spans are aria-hidden
                         and cycled by JS (see /assets/js/scripts.js). -->
                    <h1
                        aria-label="Alf's Cycles — Keswick's local bike shop for the bikes time forgot, built and ridden since 1987">
                        <span data-rotator aria-hidden="true">
                            <span data-rotator-item data-active>THE BIKES TIME FORGOT<br>AND WE FOUND.</span>
                            <span data-rotator-item>Not restored.<br>Resurrected.</span>
                            <span data-rotator-item>EVERY GREAT RIDE<br>STARTS HERE.</span>
                        </span>
                    </h1>
                    <p>Your cycling experts since 1987</p>

                    <a href="./pages/contact.php" aria-label="Say hello — go to the contact page">
                        <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <circle cx="12" cy="12" r="11" fill="#00000f"></circle>
                            <path
                                d="M7 6.5h10a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-4.2l-3.3 2.7v-2.7H7A1.5 1.5 0 0 1 5.5 14V8A1.5 1.5 0 0 1 7 6.5z"
                                fill="#ffffff"></path>
                            <circle cx="9.5" cy="11" r="0.8" fill="#00000f"></circle>
                            <circle cx="12" cy="11" r="0.8" fill="#00000f"></circle>
                            <circle cx="14.5" cy="11" r="0.8" fill="#00000f"></circle>
                        </svg>
                        <span>Say hello</span>
                    </a>
                </section>
            </article>
        </section>

        <!-- TAGLINE -->
        <section aria-label="Tagline">
            <h2>KESWICK'S TRUSTED BIKE SHOP FOR OVER 35 YEARS. WE'VE GOT EVERYTHING YOU NEED TO KEEP ROLLING.</h2>

            <p>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <a href="https://www.google.com/maps/place/Keswick+Cumbria" target="_blank" rel="noopener noreferrer">
                    Pop in — 47 Market Street, Keswick
                </a>
            </p>
        </section>

        <!-- WHAT WE DO — each tile is a clickable navigation link -->
        <section aria-label="What we do">
            <h2>WHAT WE DO&hellip;</h2>

            <article>
                <a href="./pages/products.php" aria-label="Vintage Royal Master Cruiser — browse bikes">
                    <img src="./assets/images/vintage-cruiser.webp"
                        alt="Restored vintage cruiser bicycle leaning against a wall" width="400" height="500"
                        loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Vintage Royal Master Cruiser</strong>
                    <span>Bikes for every soul, from first tiny pedals to champion strides.</span>
                </a>

                <a href="./pages/repair.php" aria-label="Repair services">
                    <img src="./assets/images/mechanic-repairing-bicycle.webp"
                        alt="Mechanic adjusting the drivetrain on a bike at our workshop" width="400" height="500"
                        loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Repair</strong>
                    <span>From rusted chains to faded chrome, our cycle repair service treats every bike like a piece of
                        living history.</span>
                </a>

                <a href="./pages/story.php" aria-label="Read Alf's stories">
                    <img src="./assets/images/beautiful-fluffy-domestic-cat-sitting-by-window-with-bars-brick-wall.webp"
                        alt="Alf the shop cat sitting in a sunlit window — the inspiration for Alf's Cycles" width="400"
                        height="500" loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Alf's stories</strong>
                    <span>The shop, the cat, the rides — strictly personal.</span>
                </a>

                <a href="./pages/products.php" aria-label="Accessories">
                    <img src="./assets/images/metal-lock-bike-wheel.webp"
                        alt="Heavy-duty bike lock fastened around a wheel and frame" width="400" height="500"
                        loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Accessories</strong>
                    <span>Helmets, locks, lights and more.</span>
                </a>

                <a href="./pages/repair.php" aria-label="Servicing">
                    <img src="./assets/images/expirienced-young-master-is-repairing-customer-s-bicycle-workplace-1.webp"
                        alt="Experienced mechanic tuning a bicycle on a workshop stand" width="400" height="500"
                        loading="lazy">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Servicing</strong>
                    <span>Expert maintenance and tune-ups.</span>
                </a>
            </article>
        </section>

        <!-- WHY CHOOSE ALF'S -->
        <section aria-label="Why choose Alf's">
            <article>
                <figure>
                    <img src="./assets/svg/alf_doingWheelie.svg" alt="Illustrated cyclist popping a wheelie" width="450"
                        height="450" loading="lazy">
                </figure>
                <section>
                    <h2>WHY<br>CHOOSE<br>ALF'S?</h2>
                    <p>Family-run since 1987. Alf started in a small garage and built this shop through honest service
                        and fair prices. Today, we're still fixing punctures, tuning gears, and helping you find the
                        perfect ride. <a href="./pages/story.php">Read more&hellip;</a></p>
                </section>
            </article>
        </section>

        <!-- DECORATIVE -->
        <section aria-hidden="true">
            <img src="./assets/svg/thumbnail.webp" alt="" width="1400" height="500" loading="lazy">
        </section>

    </main>

    <?php include __DIR__ . '/includes/footer.php'; ?>

</body>

</html>