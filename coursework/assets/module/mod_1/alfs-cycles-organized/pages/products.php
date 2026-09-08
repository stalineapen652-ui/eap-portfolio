<?php
$pageTitle       = "Bikes & Accessories | Alf's Cycles";
$pageDescription = "Browse classic, kids and vintage bicycles plus accessories from Alf's Cycles in Keswick, Cumbria.";
$pathPrefix      = '../';
$currentPage     = 'bikes';
$canonical       = '/alfs/pages/products.php';
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
        <section aria-label="Products hero">
            <article>
                <section>
                    <h1>CLASSIC RIDES<br>WAITING FOR YOU</h1>
                    <p>HANDPICKED BICYCLES, BUILT TO LAST</p>
                </section>
            </article>
        </section>

        <!-- BIKES GRID -->
        <section aria-label="Bikes and accessories">
            <h2>BIKES &amp; ACCESSORIES&hellip;</h2>

            <article>
                <section>
                    <img src="../assets/images/vintage-lady-cream.webp"
                         alt="Cream-coloured Vintage Lady 700c step-through bicycle"
                         width="400" height="500" loading="lazy">
                    <article>
                        <h3>VINTAGE LADY CREAM</h3>
                        <p>700c step-through frame, traditional styling.</p>
                    </article>
                </section>

                <section>
                    <img src="../assets/images/guvnor-gt-on_white_background_NO_BAG.webp"
                         alt="Guv'nor GT special edition path racer on white background"
                         width="400" height="500" loading="lazy">
                    <article>
                        <h3>GUV'NOR GT</h3>
                        <p>Special edition classic path-racer bicycle.</p>
                    </article>
                </section>

                <section>
                    <img src="../assets/images/kids-bike.webp"
                         alt="Toimsa 16-inch vintage-look kids' bicycle with rear carrier"
                         width="400" height="500" loading="lazy">
                    <article>
                        <h3>TOIMSA VINTAGE</h3>
                        <p>16-inch kids' bike with a retro-look rear carrier rack.</p>
                    </article>
                </section>

                <section>
                    <img src="../assets/images/murray-bicycle.webp"
                         alt="Vintage Murray American cruiser bicycle"
                         width="400" height="500" loading="lazy">
                    <article>
                        <h3>MURRAY BICYCLE</h3>
                        <p>Vintage American cruiser, fully restored.</p>
                    </article>
                </section>

                <section>
                    <img src="../assets/images/accessories.webp"
                         alt="Leather bike bag and other vintage cycling accessories"
                         width="400" height="500" loading="lazy">
                    <article>
                        <h3>VINTAGE ACCESSORIES</h3>
                        <p>Leather bags, lights and finishing touches.</p>
                    </article>
                </section>
            </article>
        </section>

    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>

</body>
</html>
