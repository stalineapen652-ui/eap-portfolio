<?php
$pageTitle       = "Contact | Alf's Cycles";
$pageDescription = "Get in touch with Alf's Cycles - Keswick's trusted bike shop. Visit us, call, or send a message.";
$pathPrefix      = '../';
$currentPage     = 'contact';
$canonical       = '/alfs/pages/contact.php';

/*
 * Server-side form handling.
 * Honeypot field + basic validation. POST result is shown above the form.
 */
$formStatus  = '';
$formName    = '';
$formMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Honeypot — bots fill hidden fields
    if (!empty($_POST['website'] ?? '')) {
        $formStatus = 'error';
    } else {
        $formName    = trim(strip_tags($_POST['name']    ?? ''));
        $formMessage = trim(strip_tags($_POST['message'] ?? ''));

        if ($formName === '' || $formMessage === '') {
            $formStatus = 'invalid';
        } else {
            // In production this would mail() or persist the message.
            $formStatus = 'sent';
            $formName = $formMessage = '';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <?php include __DIR__ . '/../includes/head.php'; ?>
</head>
<body>

    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" tabindex="-1">

        <!-- CONTACT HERO + FORM -->
        <section aria-label="Contact us">
            <article>
                <section>
                    <h1>CONTACT</h1>
                    <figure>
                        <img src="../assets/icons/alf_doingWheelie_1.webp"
                             alt="Illustrated cyclist mid-wheelie"
                             width="540" height="540" loading="eager">
                    </figure>
                </section>

                <form method="post" action="contact.php" novalidate>
                    <?php if ($formStatus === 'sent'): ?>
                        <p role="status">Thanks — your message has been sent.</p>
                    <?php elseif ($formStatus === 'invalid'): ?>
                        <p role="alert">Please fill in both your name and message.</p>
                    <?php endif; ?>

                    <label>
                        <span>NAME</span>
                        <input type="text" name="name" required autocomplete="name"
                               value="<?= htmlspecialchars($formName) ?>">
                    </label>

                    <label>
                        <span>EMAIL</span>
                        <input type="email" name="email" autocomplete="email">
                    </label>

                    <label>
                        <span>MESSAGE</span>
                        <textarea name="message" rows="6" required><?= htmlspecialchars($formMessage) ?></textarea>
                    </label>

                    <!-- Honeypot: visually hidden, bots fill it -->
                    <label aria-hidden="true">
                        <span>Website</span>
                        <input type="text" name="website" tabindex="-1" autocomplete="off">
                    </label>

                    <button type="submit">SEND</button>
                </form>
            </article>
        </section>

        <!-- DIRECT CONTACT -->
        <section aria-label="Direct contact">
            <h2>OR REACH US DIRECTLY</h2>
            <article>
                <p><a href="tel:+441768772345">017687 72345</a></p>
                <address>
                    47 Market Street<br>
                    Keswick, Cumbria<br>
                    CA12 5BT
                </address>
            </article>

        </section>

    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>

</body>
</html>
