let subMenu = document.querySelector(".sub-menu");
let megaMenu = document.querySelector(".mega-menu");
let menuBar = document.querySelector(".menu-bar");
let navLinks = document.querySelectorAll("nav a:not(.sub-menu)");
function toggleActive() {
  subMenu.classList.toggle("active");
  megaMenu.classList.toggle("active");
  menuBar.classList.toggle("active");
}
subMenu.onclick = (e) => {
  e.preventDefault();
  toggleActive();
};
menuBar.onclick = (e) => {
  toggleActive();
};
navLinks.forEach((link) => {
  link.onclick = () => {
    if (megaMenu.classList.contains("active")) {
      toggleActive();
    }
  };
});
