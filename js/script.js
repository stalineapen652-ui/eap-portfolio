/* ============================================================
   HOME · Studio Eapen single-page interactions
   Lenis smooth scroll + GSAP
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer:fine)").matches;
    gsap.registerPlugin(ScrollTrigger);

    /* ---- Lenis smooth scroll → drives ScrollTrigger ---- */
    let lenis;
    if (!reduced && typeof Lenis !== "undefined") {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    /* ---- Reveals ---- */
    if (reduced) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
    } else {
        gsap.set(".reveal", { opacity: 0, y: 40 });

        // hero entrance
        gsap.to(".hero .reveal", { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15 });

        // strike-through on "actually"
        setTimeout(() => document.querySelectorAll(".hero h1 .strike").forEach(el => el.classList.add("is-struck")), 1400);

        // section reveals on scroll
        gsap.utils.toArray("section .reveal").forEach(el => {
            if (el.closest(".hero")) return;
            gsap.to(el, {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%" }
            });
        });

        // parallax on the hero illustration (container — img runs its own scale anim)
        gsap.to(".hero-illu-bg", {
            y: -40, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
    }

    /* ---- Footer reveal ---- */
    gsap.from(".footer-card > *", {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".site-footer", start: "top 85%", toggleActions: "play none none reverse" }
    });

    /* ---- Magnetic primary buttons ---- */
    if (!reduced && fine) {
        document.querySelectorAll(".btn-primary").forEach(b => {
            b.addEventListener("mousemove", e => {
                const r = b.getBoundingClientRect();
                gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 });
            });
            b.addEventListener("mouseleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" }));
        });

        /* ---- Project hover tilt ---- */
        document.querySelectorAll(".proj").forEach(p => {
            p.addEventListener("mousemove", e => {
                const r = p.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                gsap.to(p, { rotationY: x * 4, rotationX: -y * 4, transformPerspective: 900, duration: 0.5 });
            });
            p.addEventListener("mouseleave", () => gsap.to(p, { rotationY: 0, rotationX: 0, duration: 0.6 }));
        });
    }

    /* ---- Back to top ---- */
    document.querySelectorAll('.to-top').forEach(btn => btn.addEventListener("click", (e) => {
        e.preventDefault();
        lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
    }));

    /* ---- Smooth in-page anchor links via Lenis ---- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", (e) => {
            const id = a.getAttribute("href");
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            lenis ? lenis.scrollTo(target, { offset: -20 }) : target.scrollIntoView({ behavior: "smooth" });
        });
    });

    /* hamburger + header reveal handled by nav.js */
});
