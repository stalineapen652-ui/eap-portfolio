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
  var SEEN_KEY = 'eap-loader-seen';
  var loader = document.getElementById('loader');
  if (!loader) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alreadySeen = false;
  try { alreadySeen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { /* privacy mode etc. */ }

  if (reduceMotion || alreadySeen) {
    loader.hidden = true;
    return;
  }

  var ROLL_COUNT = 33;
  var CADENCE = 0.085; // seconds per image cut — the "speed" dial
  var rollEnd = ROLL_COUNT * CADENCE;
  var inkStart = rollEnd - 0.08;
  var inkFadeStart = inkStart + 0.9 + 0.05;
  var titleStart = inkStart + 0.9 - 0.15;
  var subStart = titleStart + 1.3;
  var doneAt = subStart + 1.0; // when we auto-dismiss the overlay

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
