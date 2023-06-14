// Global Variables
let subMenu = document.querySelector(".sub-menu");
let megaMenu = document.querySelector(".mega-menu");
let menuBar = document.querySelector(".menu-bar");
let navLinks = document.querySelectorAll("nav a:not(.sub-menu)");
let noneLinks = document.querySelectorAll("a[href='#']:not(.sub-menu)");
let skillsSection = document.querySelector("#skills");
let skillsBars = document.querySelectorAll(".progress-bar");
let statsSec = document.querySelector("#stats");
let statNums = document.querySelectorAll(".stat-num");
let started = false;

// Mobile Menu
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

// Prevent Links Default Behvior
noneLinks.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
  };
});

// Animate Skills Bars

window.onscroll = () => {
  // console.log(statsSec.offsetTop);
  // console.log(statNums[0].offsetTop);
  // Skills Scroll Effect
  if (
    window.scrollY >= skillsSection.offsetTop - 70 ||
    window.scrollY + skillsSection.offsetHeight >=
      skillsSection.offsetTop + skillsSection.offsetHeight - 90
  ) {
    let timer = 0;
    skillsBars.forEach((bar) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.progress;
      }, timer);
      timer += 250;
    });
  }
  // Stats Scroll Effect
  if (window.scrollY >= statsSec.offsetTop - 250) {
    if (!started) {
      statNums.forEach((stat) => {
        let max = stat.dataset.num;
        let addNum = max / 50;
        let counter = setInterval(() => {
          stat.textContent = +stat.textContent + addNum;
          if (stat.textContent == max) {
            clearInterval(counter);
          }
        }, 20);
      });
    }
    started = true;
  }
};

// Countdown Timer
let eventYear = document.querySelector(".event-year");
// Get next year
const currentYear = new Date().getFullYear();
eventYear.innerHTML = currentYear + 1;
const nextYear = new Date(`JAN 1, ${currentYear + 1} 00:00:00`).getTime();

setInterval(() => {
  // Get the difference of time
  const dateNow = new Date();
  timeDiff = nextYear - dateNow.getTime();

  // Get time units
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  document.querySelector(".seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;
}, 1000);
