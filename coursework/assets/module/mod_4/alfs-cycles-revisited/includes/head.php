<?php
/*
 * SHARED <head> SECTION
 * Expects: $pageTitle, $pageDescription, $pathPrefix, $canonical
 * Provides common meta, SEO/geo tags, JSON-LD, fonts and stylesheet.
 */
$pathPrefix = $pathPrefix ?? './';
$pageTitle = $pageTitle ?? "Alf's Cycles | Keswick's Local Bike Shop Since 1987";
$pageDescription = $pageDescription ?? "Alf's Cycles - Keswick's trusted bike shop since 1987. Quality bikes, expert repairs, friendly local cycling knowledge.";
$canonical = $canonical ?? '/';
?>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">
<meta name="theme-color" content="#d5161b">

<!-- SEO: keywords + author -->
<meta name="keywords"
  content="bike shop keswick, bicycle repair cumbria, cycling lake district, vintage bicycles, bike servicing, alf's cycles">
<meta name="author" content="Alf's Cycles">
<meta name="robots" content="index, follow">

<!-- Geolocation meta (Keswick, Cumbria) -->
<meta name="geo.region" content="GB-CMA">
<meta name="geo.placename" content="Keswick, Cumbria">
<meta name="geo.position" content="54.6013;-3.1346">
<meta name="ICBM" content="54.6013, -3.1346">

<!-- Open Graph for social sharing -->
<meta property="og:type" content="website">
<meta property="og:title" content="<?= htmlspecialchars($pageTitle) ?>">
<meta property="og:description" content="<?= htmlspecialchars($pageDescription) ?>">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="Alf's Cycles">

<link rel="canonical" href="<?= htmlspecialchars($canonical) ?>">
<link rel="icon" type="image/png" href="<?= $pathPrefix ?>assets/icons/logo.png">

<title><?= htmlspecialchars($pageTitle) ?></title>

<!-- Preload primary display font to reduce layout shift -->
<link rel="preload" as="font" type="font/woff2" href="<?= $pathPrefix ?>assets/fonts/anton-regular.woff2" crossorigin>

<link rel="stylesheet" href="<?= $pathPrefix ?>assets/css/styles.css">

<!-- LocalBusiness structured data for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BicycleStore",
  "name": "Alf's Cycles",
  "image": "<?= $pathPrefix ?>assets/icons/logo.png",
  "telephone": "+44-17687-72345",
  "priceRange": "GBP",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "47 Market Street",
    "addressLocality": "Keswick",
    "addressRegion": "Cumbria",
    "postalCode": "CA12 5BT",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 54.6013,
    "longitude": -3.1346
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "17:30"
  }],
  "sameAs": ["https://www.instagram.com/alfscycles"]
}
</script>