<?php
$pageTitle       = "Repairs & Servicing | Alf's Cycles";
$pageDescription = "Expert bike repairs and servicing at Alf's Cycles, Keswick. Fast turnaround, fair prices, quality work.";
$pathPrefix      = '../';
$currentPage     = 'repair';
$canonical       = '/alfs/pages/repair.php';
?>
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <?php include __DIR__ . '/../includes/head.php'; ?>
</head>
<body>

    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" tabindex="-1">

        <!-- PAGE HERO -->
        <section aria-label="Repairs hero">
            <article>
                <h1>REPAIRS &amp;<br>SERVICING</h1>
                <figure>
                    <img src="../assets/svg/alf_doing_repair.svg"
                         alt="Illustrated mechanic repairing a bicycle"
                         width="700" height="700" loading="eager">
                </figure>
            </article>
        </section>

        <!-- SERVICE PACKAGES -->
        <section aria-label="Service packages">
            <article>
                <section>
                    <h2>FULL SERVICE</h2>
                    <p>(includes deep clean)</p>
                    <strong>&pound;55</strong>
                </section>

                <section>
                    <h2>PREMIUM SERVICE</h2>
                    <p>(high-end bikes, full overhaul)</p>
                    <strong>&pound;75</strong>
                </section>

                <section>
                    <h2>BASIC SERVICE</h2>
                    <p>(safety check &amp; tune)</p>
                    <strong>&pound;25</strong>
                </section>
            </article>

            <p>Get your bike back on the road fast with our expert technicians and premium parts. We handle most repairs in under 48 hours, and we'll always call you first if any extra work is needed — so there are no surprises, only smooth, reliable rides.</p>
        </section>

        <!-- COMMON REPAIRS -->
        <section aria-label="Common repairs">
            <h2>COMMON REPAIRS</h2>

            <article>
                <section>
                    <h3>Puncture Repair</h3>
                    <strong>&pound;10</strong>
                </section>

                <section>
                    <h3>Brake Adjustment</h3>
                    <strong>&pound;10</strong>
                </section>

                <section>
                    <h3>Gear Tuning</h3>
                    <strong>&pound;10</strong>
                </section>

                <section>
                    <h3>Wheel Truing</h3>
                    <strong>&pound;10</strong>
                </section>

                <section>
                    <h3>Chain Replacement</h3>
                    <strong>&pound;10</strong>
                </section>
            </article>
        </section>

        <!-- EMERGENCY REPAIRS -->
        <section aria-label="Emergency repairs">
            <h2>EMERGENCY REPAIRS</h2>
            <p>Broken chain mid-ride or bike trouble out of nowhere? Swing by during our opening hours and our friendly mechanics will work quickly to get you rolling again, often on the spot. We'll assess the issue, explain what needs fixing, and do everything we can right away — so you can spend less time waiting and more time enjoying the ride.</p>
        </section>

        <!-- WINTER SERVICE SPECIAL -->
        <section aria-label="Winter service special">
            <article>
                <h2 aria-label="Ten percent off">10%</h2>
                <section>
                    <h3>WINTER SERVICE<br>SPECIAL</h3>
                    <p>Book your bike in during October to February and get 10% off full services. Beat the spring rush!</p>
                </section>
            </article>
        </section>

    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>

</body>
</html>
