/* ============================================================
   WORK · interactions
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

    /* intro */
    gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-left .reveal",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 })
        .fromTo(".hero-right",
            { opacity: 0, y: 50, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out" }, "-=0.7");

    /* section reveals */
    gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(el,
            { opacity: 0, y: 60 },
            {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" }
            });
    });

    /* gentle image parallax */
    if (!reduced) {
        gsap.utils.toArray(".box-parallax").forEach((box) => {
            gsap.fromTo(box, { y: 36 }, {
                y: -36, ease: "none",
                scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: 1 }
            });
        });
    }

    /* crossfading social gallery */
    const galleryImgs = document.querySelectorAll(".gallery-img");
    if (galleryImgs.length) {
        let i = 0;
        setInterval(() => {
            galleryImgs[i].classList.remove("active");
            i = (i + 1) % galleryImgs.length;
            galleryImgs[i].classList.add("active");
        }, 2600);
    }

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
