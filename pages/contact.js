/* ============================================================
   CONTACT · interactions
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof gsap !== "undefined") gsap.registerPlugin(ScrollTrigger);

    let lenis;
    if (!reduced && typeof Lenis !== "undefined") {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on("scroll", () => ScrollTrigger && ScrollTrigger.update());
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
    }
    // Trigger positions above are calculated on DOMContentLoaded, before
    // images/fonts have loaded and settled the page's real height —
    // recalculate once everything has actually loaded (see js/script.js
    // for the same fix).
    if (typeof ScrollTrigger !== "undefined") {
        window.addEventListener("load", () => ScrollTrigger.refresh());
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    /* intro */
    gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".contact-left .reveal",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.12 })
        .fromTo(".contact-right",
            { opacity: 0, y: 30, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)" }, "-=0.7")
        .to(".contact-foot", { opacity: 1, duration: 0.6 }, "-=0.3");

    /* subtle pointer parallax on the big title */
    const main = document.querySelector(".contact-main");
    const big = document.querySelector(".contact-big");
    if (main && big && !reduced && window.matchMedia("(pointer:fine)").matches) {
        const xTo = gsap.quickTo(big, "x", { duration: 0.7, ease: "power3" });
        const yTo = gsap.quickTo(big, "y", { duration: 0.7, ease: "power3" });
        main.addEventListener("mousemove", (e) => {
            const px = e.clientX / window.innerWidth - 0.5;
            const py = e.clientY / window.innerHeight - 0.5;
            xTo(px * 24); yTo(py * 24);
        });
        main.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    }

    /* hamburger + header reveal handled by nav.js */
});
