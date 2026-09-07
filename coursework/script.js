// script.js
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideMenu = document.getElementById("side-Menu");

// pre-existing: this page has no #hamburgerBtn/#side-Menu (leftover from an
// earlier layout) — guarded so it doesn't throw on load
if (hamburgerBtn && sideMenu) {
  hamburgerBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("show-menu");
  });
}
