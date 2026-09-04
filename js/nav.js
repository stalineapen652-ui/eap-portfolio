/* ============================================================
   Shared nav · hamburger + hover/scroll auto-reveal header
   Header is tucked away by default and only reveals when the
   pointer is near the top, while scrolling, or on hover.
   ============================================================ */
(function () {
    const header = document.querySelector(".main-header");
    if (!header) return;
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    const isMobile = () => window.matchMedia("(max-width: 860px)").matches;
    let hovered = false, nearTop = false, hideTimer = null;

    const show = () => header.classList.add("is-visible");
    function hide() {
        if (hovered || nearTop) return;
        if (navMenu && navMenu.classList.contains("active")) return;
        header.classList.remove("is-visible");
    }
    function scheduleHide(delay) {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(hide, delay || 1500);
    }

    // mobile: keep it permanently available (hover/scroll hiding is a desktop nicety)
    if (isMobile()) show();
    window.addEventListener("resize", () => { if (isMobile()) show(); });

    if (!isMobile()) {
        // discoverable on load, then tuck away
        show();
        scheduleHide(2200);
    }

    // pointer near the very top reveals it
    window.addEventListener("mousemove", (e) => {
        if (isMobile()) return;
        nearTop = e.clientY <= 80;
        if (nearTop) { clearTimeout(hideTimer); show(); }
        else scheduleHide(900);
    });

    header.addEventListener("mouseenter", () => { hovered = true; clearTimeout(hideTimer); show(); });
    header.addEventListener("mouseleave", () => { hovered = false; scheduleHide(700); });

    // reveal while scrolling, hide shortly after it settles
    let scrolling;
    window.addEventListener("scroll", () => {
        if (isMobile()) return;
        show();
        clearTimeout(scrolling);
        scrolling = setTimeout(() => scheduleHide(600), 120);
    }, { passive: true });

    // hamburger
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            show();
        });
        navMenu.querySelectorAll("a").forEach((link) =>
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }));
    }
})();
