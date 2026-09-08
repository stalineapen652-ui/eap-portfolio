<?php
/*
 * SITE HEADER & PRIMARY NAVIGATION
 * Expects: $pathPrefix (e.g. "./" from root, "../" from /pages),
 *          $currentPage (e.g. "home", "bikes", "story", "repair", "contact").
 *
 * Includes the live shop-open status pill so it's visible on every page.
 */
$pathPrefix  = $pathPrefix  ?? './';
$currentPage = $currentPage ?? '';

$navItems = [
    'bikes'   => ['label' => 'BIKES',   'href' => $pathPrefix . 'pages/products.php'],
    'story'   => ['label' => 'STORY',   'href' => $pathPrefix . 'pages/story.php'],
    'repair'  => ['label' => 'REPAIR',  'href' => $pathPrefix . 'pages/repair.php'],
    'contact' => ['label' => 'CONTACT', 'href' => $pathPrefix . 'pages/contact.php'],
];
?>
<!-- Skip link: only id reference in the project, retained for WCAG keyboard support -->
<a href="#main">Skip to main content</a>

<header>
    <nav aria-label="Primary">
        <a href="<?= $pathPrefix ?>index.php" aria-label="Alf's Cycles home">
            <img src="<?= $pathPrefix ?>assets/icons/logo.webp" alt="Alf's Cycles" width="180" height="72">
        </a>

        <ul>
            <?php foreach ($navItems as $key => $item): ?>
                <li>
                    <a href="<?= $item['href'] ?>"<?= $currentPage === $key ? ' aria-current="page"' : '' ?>>
                        <?= $item['label'] ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>

        <!-- Live open/closed status — refreshes every minute via scripts.js -->
        <?php include __DIR__ . '/opening-hours.php'; ?>

        <button type="button" aria-label="Toggle navigation menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>
    </nav>
</header>
