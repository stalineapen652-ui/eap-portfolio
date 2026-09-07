// script.js
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideMenu = document.getElementById("side-Menu");

hamburgerBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("show-menu");
});
