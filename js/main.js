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

// Prevent Links Default Behavior
noneLinks.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
  };
});

// Animate Skills Bars

window.onscroll = () => {
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

// Popup Functionality
function openPopup(popElement, type) {
  // Create Popup Elements
  let popup = document.createElement("div");
  popup.classList.add("popup-box");
  let popupOverlay = document.createElement("div");
  popupOverlay.classList.add("popup-overlay");
  let closePopup = document.createElement("span");
  closePopup.classList.add("close-popup");
  let popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  closePopup.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
  closePopup.onclick = () => {
    popup.remove();
    popupOverlay.remove();
    document.body.classList.remove("popup-active");
    window.removeEventListener("keydown", keyEvents);
  };
  popupContent.appendChild(popElement);
  let nextBtn;
  let prevBtn;
  if (type != "gallery") {
    let loremPara = document.createElement("p");
    loremPara.textContent =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quis architecto ipsa debitis magni sequi consequuntur deleniti dolorum in voluptatem, deserunt eum reiciendis velit minima id amet facere! Magnam, consequatur.";
    popupContent.appendChild(loremPara);
    if (type == "article") {
      for (let i = 0; i < 5; i++) {
        popupContent.appendChild(document.createElement("br"));
        popupContent.appendChild(loremPara.cloneNode(true));
      }
    }
  } else {
    // Define Gallery Buttons
    nextBtn = document.createElement("button");
    nextBtn.classList.add("next-btn");
    nextBtn.innerHTML = '<i class="fa-solid fa-circle-right"></i>';
    prevBtn = document.createElement("button");
    prevBtn.classList.add("prev-btn");
    prevBtn.innerHTML = '<i class="fa-solid fa-circle-left"></i>';
    popup.appendChild(nextBtn);
    popup.appendChild(prevBtn);
    popup.classList.add("gallery");

    // Buttons Controls
    let currentIndex = +popElement.dataset.index;
    let imagesList = document.querySelectorAll(".image-box .image img");
    nextBtn.onclick = () => {
      if (currentIndex < imagesList.length - 1) {
        document
          .querySelector(".popup-box.gallery img")
          .setAttribute(
            "src",
            `${imagesList[currentIndex + 1].getAttribute("src")}`
          );
        currentIndex++;
      }
    };
    prevBtn.onclick = () => {
      if (currentIndex > 0) {
        document
          .querySelector(".popup-box.gallery img")
          .setAttribute(
            "src",
            `${imagesList[currentIndex - 1].getAttribute("src")}`
          );
        currentIndex--;
      }
    };
  }
  popup.appendChild(closePopup);
  popup.appendChild(popupContent);
  document.body.appendChild(popup);
  document.body.appendChild(popupOverlay);
  document.body.classList.add("popup-active");

  // Keyboard Events
  function keyEvents(e) {
    if (e.key == "Escape") {
      closePopup.click();
    }
    if (type == "gallery") {
      if (e.key == "ArrowRight") {
        nextBtn.click();
      } else if (e.key == "ArrowLeft") {
        prevBtn.click();
      }
    }
  }
  window.addEventListener("keydown", keyEvents);
}

// Gallery Popup
let galleryImages = document.querySelectorAll(".image-box .image");
galleryImages.forEach((img) => {
  img.onclick = () => {
    let currentImage = img.firstElementChild.cloneNode(true);
    openPopup(currentImage, "gallery");
  };
});

// Features Popup
let featBtn = document.querySelectorAll("#features .feat .more");
featBtn.forEach((btn) => {
  btn.onclick = () => {
    let currentFeat = btn.parentElement.parentElement.cloneNode(true);
    openPopup(currentFeat, "feature");
  };
});

// Services Popup
let servBtn = document.querySelectorAll("#services .serv .details");
servBtn.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    let currentServ = btn.parentElement.parentElement.cloneNode(true);
    openPopup(currentServ, "service");
  };
});

// Articles Popup
let postBtns = document.querySelectorAll("#articles .post .more");
postBtns.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    let currentPost = btn.parentElement.parentElement.cloneNode(true);
    openPopup(currentPost, "article");
  };
});

// Pricing Button State

let planBtns = document.querySelectorAll("#pricing .plan a");
planBtns.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("active")) {
      planBtns.forEach((btn) => {
        btn.classList.remove("active");
        btn.parentElement.classList.remove("active");
        btn.textContent = "Choose Plan";
        e.target.classList.add("active");
        e.target.parentElement.classList.add("active");
        e.target.textContent = "Plan Chosen";
      });
    } else {
      e.target.classList.remove("active");
      e.target.parentElement.classList.remove("active");
      e.target.textContent = "Choose Plan";
    }
  };
});
