/* ============================================================
   ABOUT · interactions
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis;
    if (!reduced && typeof Lenis !== "undefined") {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
    }
    // Trigger positions above are calculated on DOMContentLoaded, before
    // images have loaded and settled the page's real height — recalculate
    // once everything has actually loaded (see js/script.js for the same fix).
    window.addEventListener("load", () => ScrollTrigger.refresh());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    /* intro */
    gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".about-head-inner .reveal",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 });

    /* pencil path draws on as you scroll */
    const path = document.getElementById("about-path");
    if (path && !reduced) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
            strokeDashoffset: 0, ease: "none",
            scrollTrigger: { trigger: "#about-timeline", start: "top 65%", end: "bottom 75%", scrub: 1 }
        });
    }

    /* dots pop with squash */
    const dots = document.querySelectorAll(".path-dot");
    const cards = document.querySelectorAll(".timeline-card");
    dots.forEach((dot, i) => {
        gsap.from(dot, {
            scale: 0, transformOrigin: "center", duration: 0.5, ease: "back.out(2.5)",
            scrollTrigger: { trigger: cards[i] || "#about-timeline", start: "top 70%", toggleActions: "play none none reverse" }
        });
    });

    /* cards rise + word reveal + paragraph */
    cards.forEach((card) => {
        const fromX = card.classList.contains("tc-left") ? -40 : 40;
        gsap.fromTo(card,
            { opacity: 0, y: 70, x: fromX },
            {
                opacity: 1, y: 0, x: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" }
            });
        gsap.fromTo(card.querySelectorAll(".about-word"),
            { yPercent: 110, opacity: 0 },
            {
                yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.4)",
                scrollTrigger: { trigger: card, start: "top 74%", toggleActions: "play none none reverse" }
            });
        const para = card.querySelector(".tc-para");
        if (para) gsap.fromTo(para,
            { opacity: 0, y: 24 },
            {
                opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                scrollTrigger: { trigger: para, start: "top 88%", toggleActions: "play none none reverse" }
            });
    });

    /* footer */
    gsap.from(".footer-card > *", {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".site-footer", start: "top 82%", toggleActions: "play none none reverse" }
    });

    document.querySelectorAll('.to-top').forEach(btn => btn.addEventListener("click", (e) => {
        e.preventDefault();
        lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
    }));

    /* hamburger + header reveal handled by nav.js */
});
