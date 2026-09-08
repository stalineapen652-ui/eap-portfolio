/*
 * Alf's Cycles - site scripts
 * - Mobile menu toggle (aria-expanded driven) + focus-safe off-canvas
 * - Live open/closed status pill (refreshed every minute, shop timezone)
 * - Header hide on scroll-down, show on scroll-up
 * - Horizontal "what we do" gallery drag & touch scrolling
 * - Skip-link focus management
 */
(function () {
    'use strict';

    // ---------------------------------------------------------------
    // MOBILE NAV TOGGLE
    // ---------------------------------------------------------------
    const navButton = document.querySelector('header nav button');
    const navList   = document.querySelector('header nav ul');
    const mobileMQ  = window.matchMedia('(max-width: 767px)');

    function syncNavFocus() {
        // When the off-canvas drawer is closed at mobile, prevent tab focus
        // from landing on links that are slid off-screen.
        if (!navList) return;
        if (mobileMQ.matches && !navList.hasAttribute('data-open')) {
            navList.setAttribute('aria-hidden', 'true');
        } else {
            navList.removeAttribute('aria-hidden');
        }
    }

    if (navButton && navList) {
        navButton.addEventListener('click', () => {
            const open = navList.hasAttribute('data-open');
            if (open) {
                navList.removeAttribute('data-open');
                navButton.setAttribute('aria-expanded', 'false');
            } else {
                navList.setAttribute('data-open', '');
                navButton.setAttribute('aria-expanded', 'true');
            }
            syncNavFocus();
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.removeAttribute('data-open');
                navButton.setAttribute('aria-expanded', 'false');
                syncNavFocus();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.hasAttribute('data-open')) {
                navList.removeAttribute('data-open');
                navButton.setAttribute('aria-expanded', 'false');
                navButton.focus();
                syncNavFocus();
            }
        });

        mobileMQ.addEventListener('change', syncNavFocus);
        syncNavFocus();
    }

    // ---------------------------------------------------------------
    // OPENING STATUS — single pill, refreshed every minute.
    // Hours are read from the element's data-hours JSON (server-rendered
    // from /includes/opening-hours.php so there's a single source of truth).
    // Uses the visitor's local time.
    // ---------------------------------------------------------------
    function formatTime(mins) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return h + ':' + (m < 10 ? '0' + m : m);
    }

    const DAY_ORDER = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    function nowLocal() {
        const d   = new Date();
        const day = DAY_ORDER[(d.getDay() + 6) % 7];   // JS: 0=Sun..6=Sat -> Mon..Sun
        return { day: day, mins: d.getHours() * 60 + d.getMinutes() };
    }

    function updateStatus(badge) {
        let hours;
        try {
            hours = JSON.parse(badge.getAttribute('data-hours'));
        } catch (e) {
            return;
        }
        const { day, mins } = nowLocal();
        const today  = hours[day];
        const isOpen = today && mins >= today[0] && mins < today[1];

        let note = '';
        if (isOpen) {
            note = ' · until ' + formatTime(today[1]);
        } else if (today && mins < today[0]) {
            note = ' · opens ' + formatTime(today[0]);
        } else {
            const idx = DAY_ORDER.indexOf(day);
            for (let i = 1; i <= 7; i++) {
                const next = DAY_ORDER[(idx + i) % 7];
                if (hours[next]) {
                    note = ' · opens ' + (i === 1 ? 'tomorrow' : next) + ' ' + formatTime(hours[next][0]);
                    break;
                }
            }
        }

        const label = isOpen ? 'Open' : 'Closed';
        badge.setAttribute('data-state', isOpen ? 'open' : 'closed');
        badge.setAttribute('title', (label + note).trim());
        badge.textContent = label;            // short pill — detail lives in tooltip
    }

    function refreshAllStatusPills() {
        document.querySelectorAll('[data-shop-status]').forEach(updateStatus);
    }

    refreshAllStatusPills();
    setInterval(refreshAllStatusPills, 60 * 1000);

    // ---------------------------------------------------------------
    // HEADER HIDE/SHOW ON SCROLL (rAF-throttled)
    // ---------------------------------------------------------------
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        let ticking    = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const top = window.pageYOffset || document.documentElement.scrollTop;
                if (top > lastScroll && top > 120) {
                    header.setAttribute('data-hidden', '');
                } else {
                    header.removeAttribute('data-hidden');
                }
                lastScroll = top <= 0 ? 0 : top;
                ticking = false;
            });
        }, { passive: true });
    }

    // ---------------------------------------------------------------
    // HORIZONTAL GALLERY DRAG (mouse + touch + keyboard)
    // ---------------------------------------------------------------
    document.querySelectorAll('main section > article').forEach(scroller => {
        if (scroller.scrollWidth <= scroller.clientWidth) return;

        let isDown = false, startX = 0, scrollX = 0;

        scroller.addEventListener('mousedown', (e) => {
            isDown = true;
            startX  = e.pageX - scroller.offsetLeft;
            scrollX = scroller.scrollLeft;
            scroller.style.cursor = 'grabbing';
        });

        ['mouseleave', 'mouseup'].forEach(evt => {
            scroller.addEventListener(evt, () => {
                isDown = false;
                scroller.style.cursor = 'grab';
            });
        });

        scroller.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scroller.offsetLeft;
            scroller.scrollLeft = scrollX - (x - startX) * 2;
        });

        let touchStart = 0, touchLeft = 0;
        scroller.addEventListener('touchstart', (e) => {
            touchStart = e.touches[0].pageX;
            touchLeft  = scroller.scrollLeft;
        }, { passive: true });
        scroller.addEventListener('touchmove', (e) => {
            scroller.scrollLeft = touchLeft + (touchStart - e.touches[0].pageX) * 1.5;
        }, { passive: true });

        scroller.setAttribute('tabindex', '0');
        scroller.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') scroller.scrollBy({ left: 200, behavior: 'smooth' });
            if (e.key === 'ArrowLeft')  scroller.scrollBy({ left: -200, behavior: 'smooth' });
        });
    });

    // ---------------------------------------------------------------
    // HERO HEADLINE ROTATOR
    // Cycles the visible phrases inside [data-rotator]. The h1's
    // aria-label carries the canonical name for screen readers,
    // so the visible text changing doesn't disrupt assistive tech.
    // Honours prefers-reduced-motion by holding the first phrase.
    // ---------------------------------------------------------------
    const rotator = document.querySelector('[data-rotator]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (rotator && !reduceMotion.matches) {
        const items = rotator.querySelectorAll('[data-rotator-item]');
        if (items.length > 1) {
            let idx = 0;
            setInterval(() => {
                items[idx].removeAttribute('data-active');
                idx = (idx + 1) % items.length;
                items[idx].setAttribute('data-active', '');
            }, 4500);
        }
    }

    // ---------------------------------------------------------------
    // SKIP LINK — move focus to <main>
    // ---------------------------------------------------------------
    const skip = document.querySelector('a[href="#main"]');
    const main = document.getElementById('main');
    if (skip && main) {
        skip.addEventListener('click', () => {
            setTimeout(() => main.focus(), 0);
        });
    }
})();
