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
  // Call Scroll Progress Function
  calcScrollProgress();
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

// Fetch Videos Data

fetch("./data.json")
  .then((data) => data.text())
  .then((data) => displayVideos(data));

// Select Elements
let videosList = document.querySelector(".videos-ul");
let videoPlayer = document.querySelector(".video-player");
let videoTitle = document.querySelector(".video-title");
let randomVideoBtn = document.querySelector(".fa-random");
let currentIndex = 0;

// Display Videos List
function displayVideos(data) {
  let videosData = JSON.parse(data);
  if (videosData) {
    videosList.innerHTML = "";
    videosList.classList.add("loaded");
    videoPlayer.classList.add("loaded");
    videoPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videosData[0].id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    videoTitle.textContent = videosData[0].title;
  }
  videosData.forEach(
    ({ title, duration, id, index }, i) =>
    (videosList.innerHTML += `<li name="${title}" ${i == 0 ? 'class="active"' : ""
      } id="${id}" data-index="${index}" onclick="videoSwitch()">${title}<span>${duration}</span></li>`)
  );
  // Select Random Video
  function generateRandomNum() {
    let randomIndex = +Math.round(Math.random() * (videosData.length - 1));
    // console.log(randomIndex);
    if (randomIndex == currentIndex) {
      generateRandomNum();
    } else {
      currentIndex = randomIndex;
      videoSwitch(randomIndex);
    }
  }
  randomVideoBtn.onclick = () => {
    generateRandomNum();
  };
}
// Change The Selected Video
function videoSwitch(index) {
  if (!index && index !== 0) {
    let target = window.event.target;
    if (target.tagName != "LI") {
      target = target.parentElement;
    }
    if (!target.classList.contains("active")) {
      currentIndex = target.dataset.index;
      document.querySelectorAll(".videos-ul li").forEach((video) => {
        video.classList.remove("active");
      });
      target.classList.add("active");
      videoTitle.textContent = target.getAttribute("name");
      document.querySelector(
        ".video-player iframe"
      ).src = `https://www.youtube.com/embed/${target.id}`;
    }
  } else {
    let videos = document.querySelectorAll(".videos-ul li");
    videos.forEach((video) => {
      video.classList.remove("active");
    });
    videos[index].classList.add("active");
    videoTitle.textContent = videos[index].getAttribute("name");
    document.querySelector(
      ".video-player iframe"
    ).src = `https://www.youtube.com/embed/${videos[index].id}`;
  }
}

// Scroll to top
function calcScrollProgress() {
  let scrollTop = document.querySelector("#scroll-top");
  let scrollProgress = document.querySelector(".scroll-progress");
  let scrollY = window.scrollY;
  let calcHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrollValue = ((scrollY * 100) / calcHeight).toFixed(2);
  scrollProgress.style.backgroundImage = `conic-gradient(var(--main-color) ${scrollValue}%, #d0d0d0 ${scrollValue}%)`;
  if (scrollY >= 200) {
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }
  scrollTop.onclick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
}

window.onload = calcScrollProgress;

// Settings List

let settingsBtn = document.querySelector(".settings-btn");
let settingsOptions = document.querySelector(".settings-options");
let settingsOverlay = document.querySelector(".settings-overlay");
let closeSettings = document.querySelector(".close-settings");
settingsBtn.onclick = () => {
  settingsOptions.classList.add("active");
  settingsOverlay.classList.add("active");
  settingsOverlay.onclick = () => {
    settingsOptions.classList.remove("active");
    settingsOverlay.classList.remove("active");
  };
};
closeSettings.onclick = () => {
  settingsOptions.classList.remove("active");
  settingsOverlay.classList.remove("active");
};

// // Colors Options
let colorsOptions = document.querySelectorAll(".colors-list li");
colorsOptions.forEach(color => {
  color.onclick = (e) => {
    colorsOptions.forEach(color => {
      color.classList.remove("active");
    })
    e.target.classList.add("active");
    localStorage.color_option = e.target.dataset.color;
    document.body.dataset.color = e.target.dataset.color;
  }
})
// // Animations Option
let toggleAnimationsBtn = document.querySelector(".toggle-animations .toggle-btn");
toggleAnimationsBtn.onclick = (e) => {
  if (toggleAnimationsBtn.classList.contains("toggle-off")) {
    toggleAnimationsBtn.classList.remove("toggle-off");
    document.body.classList.remove("no-animations");
    localStorage.animation_option = true;
  } else {
    toggleAnimationsBtn.classList.add("toggle-off");
    document.body.classList.add("no-animations");
    localStorage.animation_option = false;
  }
}
//  // Darkmode Option
let toggleDarkmodeBtn = document.querySelector(".toggle-darkmode .toggle-btn");
toggleDarkmodeBtn.onclick = (e) => {
  if (toggleDarkmodeBtn.classList.contains("toggle-off")) {
    toggleDarkmodeBtn.classList.remove("toggle-off");
    document.body.classList.add("darkmode");
    localStorage.darkmode_option = true;
  } else {
    toggleDarkmodeBtn.classList.add("toggle-off");
    document.body.classList.remove("darkmode");
    localStorage.darkmode_option = false;
  }
}
// // Reset Option
let resetBtn = document.querySelector(".reset-btn");
resetBtn.onclick = () => {
  // Colors Options
  colorsOptions.forEach(color => {
    if (color.dataset.color !== "blue") {
      color.classList.remove("active");
    } else {
      color.classList.add("active");
      document.body.dataset.color = "blue";
      localStorage.color_option = "blue";
    }
  })
  // Animations Option
  toggleAnimationsBtn.classList.remove("toggle-off");
  document.body.classList.remove("no-animations");
  localStorage.animation_option = true;
  // Darkmode Option
  toggleDarkmodeBtn.classList.add("toggle-off");
  document.body.classList.remove("darkmode");
  localStorage.darkmode_option = false;
}
// Get Options from LocalStorage
document.addEventListener("DOMContentLoaded", (e) => {
  // Color Option
  localStorage.color_option ? document.body.dataset.color = localStorage.color_option : document.body.dataset.color = "blue";
  colorsOptions.forEach(color => {
    if (localStorage.color_option) {
      if (color.dataset.color === localStorage.color_option) {
        color.classList.add("active");
      }
    } else if (color.dataset.color === "blue") {
      color.classList.add("active");
    }
  });
  // Animations Option
  if (localStorage.animation_option == "false") {
    toggleAnimationsBtn.classList.add("toggle-off");
    document.body.classList.add("no-animations");
  }
  // DarkMode Option
  if (localStorage.darkmode_option == "true") {
    toggleDarkmodeBtn.classList.remove("toggle-off");
    document.body.classList.add("darkmode");
  }
})

// Sections Observer
const observer = new IntersectionObserver(sections => {
  sections.forEach(section => {
    const intersecting = section.isIntersecting;
    section.target.dataset.view = intersecting ? "inView" : "outView";
  });
}, { rootMargin: innerHeight >= 1000 ? "0px 0px -700px" : innerWidth > 700 ? "0px 0px -300px" : "0px 0px -500px" })
let sections = document.querySelectorAll("section");
sections.forEach(section => {
  observer.observe(section);
})