/* ============================================================
   HERO water-reveal canvas.
   Same verified technique as the loader/mockups: an offscreen
   grayscale layer gets holes punched in it (destination-out) at
   the cursor's recent trail, then gets composited on top of the
   full-color base — the color "survives" underneath because it's
   drawn on its own layer, never overwritten by the gray pass.
   Skipped entirely on touch / no-hover devices (see .no-hover
   class + hero.css) and under prefers-reduced-motion.
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
  var W = 0, H = 0; // kept in sync with the canvas's actual displayed size (see resize())

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    var newW = Math.round(r.width * dpr), newH = Math.round(r.height * dpr);
    // guard against a 0×0 read (e.g. layout not settled yet, tab not
    // yet visible/painted) — keep the previous size and just retry
    // shortly rather than zeroing out the canvas.
    if (!newW || !newH) { setTimeout(resize, 200); return; }
    W = canvas.width = grayCanvas.width = newW;
    H = canvas.height = grayCanvas.height = newH;
  }
  resize();
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  var img = new Image();
  var ready = false;
  img.onload = function () { ready = true; };
  img.src = canvas.dataset.src;

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

  var LIFE = 1500;
  function frame() {
    if (ready && W && H) {
      var now = performance.now();
      gctx.clearRect(0, 0, W, H);
      gctx.filter = 'grayscale(1) contrast(1.05) brightness(.8)';
      cover(gctx, img);
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
      cover(ctx, img);
      ctx.drawImage(grayCanvas, 0, 0);
    }
  }
  setInterval(frame, 16);
})();
