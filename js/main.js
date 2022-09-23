let subMenu = document.querySelector(".sub-menu");
let megaMenu = document.querySelector(".mega-menu");
let menuBar = document.querySelector(".menu-bar");
subMenu.onclick = (e) => {
  e.preventDefault();
  subMenu.classList.toggle("active");
  megaMenu.classList.toggle("active");
  menuBar.classList.toggle("active");
};
menuBar.onclick = (e) => {
  menuBar.classList.toggle("active");
  megaMenu.classList.toggle("active");
  subMenu.classList.toggle("active");
};
