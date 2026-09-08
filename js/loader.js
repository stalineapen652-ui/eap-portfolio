/* ============================================================
   INTRO LOADER
   Plays once per browser tab session (sessionStorage), builds the
   33-image roll with per-image delays computed here, then hands
   off to an ink-bleed wipe and the big name reveal. All animation
   timing lives in CSS (loader.css) — this file only:
     1. decides whether to play it at all,
     2. generates the per-image delay math once,
     3. removes the overlay when it's done (or skipped).
   ============================================================ */
(function () {
  // NOTE: was skipping itself on repeat visits within the same tab
  // session (sessionStorage) — during active review that reads as
  // "the loader doesn't show up" on every reload after the first.
  // Disabled for now; re-enable once the design is signed off (see
  // ENABLE_ONCE_PER_SESSION below).
  var ENABLE_ONCE_PER_SESSION = false;
  var MIN_VISIBLE_MS = 3000; // hard floor — plays at least this long no matter what

  var SEEN_KEY = 'eap-loader-seen';
  var loader = document.getElementById('loader');
  if (!loader) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alreadySeen = false;
  if (ENABLE_ONCE_PER_SESSION) {
    try { alreadySeen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { /* privacy mode etc. */ }
  }

  if (reduceMotion || alreadySeen) {
    loader.hidden = true;
    return;
  }

  // Force every loader/hero web font to start downloading right now,
  // in parallel, instead of waiting on the browser's normal "only fetch
  // once something needs to paint in it" discovery. Without this, each
  // one is only requested the instant its first <span> gets appended
  // below and paints — for the more obscure ones (Lalezar, Black Han
  // Sans, ZCOOL QingKe HuangYou, Frijole) that request can still be in
  // flight when its 255ms slot is already over, so the fallback font
  // flashes for that whole slot instead of the intended one.
  if (document.fonts && document.fonts.load) {
    [
      '700 40px "Baloo Chettan 2"', '700 40px "Baloo Thambi 2"', '700 40px "Teko"',
      '40px "Lalezar"', '700 40px "Oswald"', '40px "ZCOOL QingKe HuangYou"',
      '40px "Rampart One"', '40px "Black Han Sans"', '40px "Frijole"'
    ].forEach(function (spec) {
      try { document.fonts.load(spec); } catch (e) { /* unsupported browser — swap still falls back fine */ }
    });
  }

  var ROLL_COUNT = 33;
  var CADENCE = 0.085; // seconds per image cut — the "speed" dial
  var rollEnd = ROLL_COUNT * CADENCE;

  // Multilingual name overlay, flashed on top of the image roll — same
  // hard-cut/zoom motion as the images (reuses loaderHardcut), just on a
  // slower cadence so each one is readable. "Stalin Eapen" is a proper
  // name: non-Latin entries are phonetic transliterations, not
  // translations. Spanish and German share one Latin-script slot since
  // the name is spelled identically in both. Latin entries are
  // interleaved among the others rather than clustered at the start.
  var LANG_ROLL = [
    { text: 'STALIN EAPEN', lang: 'en', cls: 'lang-latin' },
    { text: 'സ്റ്റാലിൻ ഈപ്പൻ', lang: 'ml', cls: 'lang-ml' },
    { text: 'ஸ்டாலின் ஈப்பன்', lang: 'ta', cls: 'lang-ta' },
    { text: 'STALINE EAPEN', lang: 'fr', cls: 'lang-latin' },
    { text: 'स्तालिन एपेन', lang: 'hi', cls: 'lang-hi' },
    { text: 'ستالين إيبن', lang: 'ar', cls: 'lang-ar', rtl: true },
    { text: 'STALIN EAPEN', lang: 'es', cls: 'lang-latin' },
    { text: 'Сталин Эапен', lang: 'ru', cls: 'lang-ru' },
    { text: '斯大林·埃彭', lang: 'zh', cls: 'lang-zh' },
    { text: 'スターリン・イーペン', lang: 'ja', cls: 'lang-ja' },
    { text: '스탈린 이펜', lang: 'ko', cls: 'lang-ko' }
  ];
  var LANG_SWAP_CUTS = 3; // change language every 3 image-cuts
  var langInterval = LANG_SWAP_CUTS * CADENCE;
  var langSlots = Math.floor(ROLL_COUNT / LANG_SWAP_CUTS);
  var inkStart = rollEnd - 0.08;
  var inkFadeStart = inkStart + 0.9 + 0.05;
  var titleStart = inkStart + 0.9 - 0.15;
  var subStart = titleStart + 1.3;
  var doneAt = Math.max(subStart + 1.0, MIN_VISIBLE_MS / 1000); // auto-dismiss time, floored to MIN_VISIBLE_MS

  // build the image roll
  var cuts = document.createElement('div');
  cuts.className = 'cuts';
  for (var i = 1; i <= ROLL_COUNT; i++) {
    var img = document.createElement('img');
    img.src = 'assets/loader/roll-' + String(i).padStart(2, '0') + '.webp';
    img.alt = '';
    img.style.animationDuration = CADENCE + 's';
    img.style.animationDelay = ((i - 1) * CADENCE) + 's';
    cuts.appendChild(img);
  }
  loader.appendChild(cuts);

  // Dark backdrop between the images and the text — see css/loader.css
  // for why (keeps every language readable, not just the ones that
  // happen to land on a dark photo).
  var langScrim = document.createElement('div');
  langScrim.className = 'lang-scrim';
  loader.appendChild(langScrim);

  var langRoll = document.createElement('div');
  langRoll.className = 'lang-roll';
  for (var j = 0; j < langSlots; j++) {
    var entry = LANG_ROLL[j % LANG_ROLL.length];
    var span = document.createElement('span');
    span.className = 'langcut ' + entry.cls;
    span.lang = entry.lang;
    if (entry.rtl) span.dir = 'rtl';
    span.textContent = entry.text;
    span.style.animationDuration = langInterval + 's';
    span.style.animationDelay = (j * langInterval) + 's';
    langRoll.appendChild(span);
  }
  loader.appendChild(langRoll);

  // Equalize every language to the same rendered width, single line,
  // same centered position — 8 different scripts across 9 different
  // fonts naturally run at wildly different widths-per-character at a
  // shared font-size (that's what the old static clamp() gave: some
  // scripts flashed by tiny, others wrapped to two lines or overflowed).
  // Once fonts are actually loaded, measure each string's real
  // single-line rendered width in its own font — a *clone* of the
  // actual span (same class, so it inherits the exact same font/
  // weight/letter-spacing the real one will render with; only
  // repositioned off-screen and given a fixed reference font-size),
  // not canvas measureText, which just sums per-character advance
  // widths and doesn't apply complex-script shaping (Malayalam/Tamil
  // conjuncts, Arabic joining) — that measured meaningfully narrower
  // than what actually renders, letting those scripts overflow anyway.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      var REF_PX = 100; // arbitrary fixed size to measure at, then scale from
      var MIN_PX = 30, MAX_PX = 210;
      var target = Math.min(window.innerWidth * 0.86, 1150);
      var spans = langRoll.querySelectorAll('.langcut');
      for (var k = 0; k < spans.length; k++) {
        var span = spans[k];
        var clone = span.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.inset = 'auto';
        clone.style.top = '-9999px';
        clone.style.left = '-9999px';
        clone.style.padding = '0';
        clone.style.width = 'auto';
        clone.style.opacity = '1';
        clone.style.fontSize = REF_PX + 'px';
        // appended inside #loader, not document.body — the CSS this
        // relies on (display:flex, white-space:nowrap, the per-language
        // font-family) is all written as "#loader .langcut"/"#loader
        // .lang-*", so a clone living outside #loader wouldn't match
        // any of those rules and would silently measure in whatever
        // the browser's block-level fallback font happens to be.
        loader.appendChild(clone);
        var naturalWidth = clone.getBoundingClientRect().width;
        clone.remove();
        if (!naturalWidth) continue;
        var size = REF_PX * (target / naturalWidth);
        size = Math.max(MIN_PX, Math.min(MAX_PX, size));
        span.style.fontSize = size + 'px';
      }
    });
  }

  var ink = document.createElement('div');
  ink.className = 'ink';
  ink.style.animationDelay = inkStart + 's, ' + inkFadeStart + 's';
  loader.appendChild(ink);

  var titlewrap = document.createElement('div');
  titlewrap.className = 'titlewrap';
  titlewrap.style.animationDelay = titleStart + 's';
  titlewrap.innerHTML =
    '<div class="title3d">STALIN<br>EAPEN</div>' +
    '<div class="subtitle2" style="animation-delay:' + subStart + 's">WEB &amp; UI DESIGNER — LONDON</div>';
  loader.appendChild(titlewrap);

  var skip = document.createElement('button');
  skip.className = 'skip';
  skip.type = 'button';
  skip.textContent = 'SKIP →';
  loader.appendChild(skip);

  function dismiss() {
    if (loader.classList.contains('is-leaving') || loader.hidden) return;
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) {}
    loader.classList.add('is-leaving');
    window.setTimeout(function () { loader.hidden = true; }, 650);
  }

  skip.addEventListener('click', dismiss);
  window.setTimeout(dismiss, doneAt * 1000);
})();
