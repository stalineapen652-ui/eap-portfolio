// ===================================
// MOBILE MENU TOGGLE
// ===================================

function toggleMenu() {
    const menu = document.querySelector('header nav ul');
    menu.classList.toggle('active');
}

// Close menu when clicking a link
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('header nav ul');
        menu.classList.remove('active');
    });
});

// ===================================
// HORIZONTAL SCROLL DRAG FUNCTIONALITY
// ===================================

const scrollContainer = document.querySelector('main > section:nth-of-type(3) > article');

// Desktop drag functionality
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
});

// Mobile touch support
let touchStartX = 0;
let touchScrollLeft = 0;

scrollContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].pageX;
    const walk = (touchStartX - touchX) * 1.5;
    scrollContainer.scrollLeft = touchScrollLeft + walk;
});

// ===================================
// HEADER HIDE/SHOW ON SCROLL
// ===================================

let lastScrollTop = 0;
const header = document.querySelector('header');
let scrollTimeout;

window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past 100px
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 10);
});