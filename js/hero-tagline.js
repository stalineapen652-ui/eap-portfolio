/* ============================================================
   HERO — rotating tagline
   Cycles the hero <h1> through a few short taglines, each set in a
   different "related" display face already loaded on the page (see
   the @font-face block in css/style.css) — Unbounded for the
   original line, then Anybody and Dela Gothic One for the two
   variations. Fades out/up between swaps with a plain CSS
   transition (independent of the GSAP entrance reveal, which has
   already finished by the time this starts). Skipped entirely under
   prefers-reduced-motion — the h1 just keeps the first tagline.
   ============================================================ */
(function () {
  var h1 = document.getElementById('heroTagline');
  if (!h1) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var TAGLINES = [
    { text: "I sketch interfaces that don't sit still.", font: 'display' },
    { text: 'I build brands that move.', font: 'anybody' },
    { text: 'I craft motion worth watching.', font: 'dela' }
  ];

  var HOLD_MS = 4200;   // how long each tagline stays up
  var SWAP_MS = 400;    // fade-out duration before the text/font actually changes
  var START_DELAY_MS = 3200; // let the GSAP entrance reveal finish first

  var i = 0;
  function swap() {
    i = (i + 1) % TAGLINES.length;
    h1.classList.add('tagline-out');
    setTimeout(function () {
      var t = TAGLINES[i];
      h1.textContent = t.text;
      h1.dataset.font = t.font;
      h1.classList.remove('tagline-out');
    }, SWAP_MS);
  }

  setTimeout(function () {
    swap();
    setInterval(swap, HOLD_MS);
  }, START_DELAY_MS);
})();
