/* ============================================================
   HERO water-reveal + rotating background.
   Same verified technique as the loader/mockups: an offscreen
   grayscale layer gets holes punched in it (destination-out) at
   the cursor's recent trail, then gets composited on top of the
   full-color base — the color "survives" underneath because it's
   drawn on its own layer, never overwritten by the gray pass.

   Placeholder background: instead of one static image, the color
   base is now a rotating set of images (the loader's roll-NN.webp,
   per canvas[data-src-pattern]/[data-src-count]) that slow-crossfade
   into each other every HOLD_MS — the water-reveal above still runs
   against whichever image is currently showing. Swap the pattern/
   count once real hero photography replaces the placeholder.

   Skipped entirely on touch / no-hover devices (see .no-hover
   class + hero.css) and under prefers-reduced-motion — those get
   the plain static <img class="hero-fallback-img">.
   ============================================================ */
(function () {
  var section = document.querySelector('.hero-reveal');
  var canvas = document.getElementById('heroCanvas');
  if (!section || !canvas) return;

  var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduceMotion) {
    section.classList.add('no-hover');
    return;
  }

  var ctx = canvas.getContext('2d');
  var grayCanvas = document.createElement('canvas');
  var gctx = grayCanvas.getContext('2d');
  var blendCanvas = document.createElement('canvas'); // this frame's crossfaded color source
  var bctx = blendCanvas.getContext('2d');
  var W = 0, H = 0; // kept in sync with the canvas's actual displayed size (see resize())

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    var newW = Math.round(r.width * dpr), newH = Math.round(r.height * dpr);
    // guard against a 0×0 read (e.g. layout not settled yet, tab not
    // yet visible/painted) — keep the previous size and just retry
    // shortly rather than zeroing out the canvas.
    if (!newW || !newH) { setTimeout(resize, 200); return; }
    W = canvas.width = grayCanvas.width = blendCanvas.width = newW;
    H = canvas.height = grayCanvas.height = blendCanvas.height = newH;
  }
  resize();
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  /* ---- rotating background set ---- */
  var pattern = canvas.dataset.srcPattern || canvas.dataset.src; // fallback: single static image
  var count = parseInt(canvas.dataset.srcCount, 10) || 1;
  var HOLD_MS = 3000;      // how long each image stays up before the next starts fading in
  var CROSSFADE_MS = 1000; // slow dissolve between images

  var slots = []; // lazily-created {img, loaded} per index
  function urlFor(n) {
    return pattern.indexOf('{n}') === -1 ? pattern : pattern.replace('{n}', String(n + 1).padStart(2, '0'));
  }
  function ensureLoaded(idx) {
    if (slots[idx]) return slots[idx];
    var im = new Image();
    var slot = { img: im, loaded: false };
    im.onload = function () { slot.loaded = true; };
    im.src = urlFor(idx);
    slots[idx] = slot;
    return slot;
  }

  var currentIdx = 0, nextIdx = count > 1 ? 1 : 0;
  ensureLoaded(currentIdx);
  if (count > 1) ensureLoaded(nextIdx);

  var phase = 'hold'; // 'hold' | 'fade'
  var phaseStart = performance.now();

  function advance(now) {
    var elapsed = now - phaseStart;
    if (count <= 1) return;
    if (phase === 'hold' && elapsed >= HOLD_MS) {
      phase = 'fade';
      phaseStart = now;
    } else if (phase === 'fade' && elapsed >= CROSSFADE_MS) {
      currentIdx = nextIdx;
      nextIdx = (currentIdx + 1) % count;
      ensureLoaded(nextIdx);
      phase = 'hold';
      phaseStart = now;
    }
  }

  var pts = [];
  var last = null;

  function toLocal(e) {
    var r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H };
  }
  section.addEventListener('mousemove', function (e) {
    var p = toLocal(e);
    if (!isFinite(p.x) || !isFinite(p.y)) return;
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 22) {
      pts.push({ x: p.x, y: p.y, born: performance.now() });
      last = p;
    }
  });

  function cover(target, image) {
    var scale = Math.max(W / image.width, H / image.height);
    var iw = image.width * scale, ih = image.height * scale;
    target.drawImage(image, (W - iw) / 2, (H - ih) / 2, iw, ih);
  }

  function buildBlendFrame() {
    var cur = slots[currentIdx];
    bctx.clearRect(0, 0, W, H);
    if (cur && cur.loaded) cover(bctx, cur.img);
    if (phase === 'fade') {
      var nxt = slots[nextIdx];
      if (nxt && nxt.loaded) {
        var t = Math.min(1, (performance.now() - phaseStart) / CROSSFADE_MS);
        bctx.globalAlpha = t;
        cover(bctx, nxt.img);
        bctx.globalAlpha = 1;
      }
    }
  }

  var LIFE = 1500;
  function frame() {
    var now = performance.now();
    advance(now);
    var cur = slots[currentIdx];
    if (cur && cur.loaded && W && H) {
      buildBlendFrame();

      gctx.clearRect(0, 0, W, H);
      gctx.filter = 'grayscale(1) contrast(1.05) brightness(.8)';
      gctx.drawImage(blendCanvas, 0, 0);
      gctx.filter = 'none';
      gctx.globalCompositeOperation = 'destination-out';
      pts = pts.filter(function (p) { return now - p.born < LIFE; });
      pts.forEach(function (p) {
        var t = (now - p.born) / LIFE;
        var radius = 30 + t * 140;
        if (!isFinite(radius) || radius <= 0) return;
        var alpha = (1 - t) * 0.95;
        var g = gctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        g.addColorStop(0, 'rgba(0,0,0,' + alpha + ')');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        gctx.fillStyle = g;
        gctx.beginPath(); gctx.arc(p.x, p.y, radius, 0, Math.PI * 2); gctx.fill();
      });
      gctx.globalCompositeOperation = 'source-over';

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(blendCanvas, 0, 0);
      ctx.drawImage(grayCanvas, 0, 0);
    }
  }
  setInterval(frame, 16);
})();
