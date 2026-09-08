<?php
/*
 * SITE FOOTER
 * Expects: $pathPrefix (e.g. "./" from root, "../" from /pages).
 */
$pathPrefix = $pathPrefix ?? './';
$year       = date('Y');
?>
<footer>
    <article>
        <section>
            <h2>CONTACT</h2>
            <p>
                <a href="https://www.instagram.com/alfscycles"
                   target="_blank" rel="noopener noreferrer"
                   aria-label="Alf's Cycles on Instagram (opens in a new tab)">
                    @alfscycles
                </a>
            </p>
            <p>
                <a href="tel:+441768772345" aria-label="Call Alf's Cycles on 0 1 7 6 8 7 7 2 3 4 5">
                    017687 72345
                </a>
            </p>
        </section>

        <section>
            <nav aria-label="Footer">
                <ul>
                    <li><a href="<?= $pathPrefix ?>index.php">Home</a></li>
                    <li><a href="<?= $pathPrefix ?>pages/story.php">About</a></li>
                    <li><a href="<?= $pathPrefix ?>pages/products.php">Products</a></li>
                    <li><a href="<?= $pathPrefix ?>pages/repair.php">Repair</a></li>
                    <li><a href="<?= $pathPrefix ?>pages/contact.php">Contact</a></li>
                    <li><a href="<?= $pathPrefix ?>accessibility.php">Accessibility</a></li>
                </ul>
            </nav>

            <address>
                <strong>Visit us</strong>
                47 Market Street<br>
                Keswick, Cumbria<br>
                CA12 5BT<br>
                <a href="https://www.google.com/maps/place/Keswick+Cumbria"
                   target="_blank" rel="noopener noreferrer"
                   aria-label="Open Alf's Cycles location in Google Maps (opens in a new tab)">
                    View on map
                </a>
            </address>
        </section>
    </article>

    <small>&copy; <?= $year ?> Alf's Cycles &middot; Keswick's Local Bike Shop Since 1987</small>
</footer>

<script src="<?= $pathPrefix ?>assets/js/scripts.js" defer></script>
