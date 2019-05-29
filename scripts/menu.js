"use strict";

// BURGER MENU - PHONE, TABLET
const burgerMenu = document.querySelector("#burger-menu"),
  middleBurgerLine = document.querySelector("#burger-line-middle"),
  mediaQuery = window.matchMedia("(min-width:1025px)"),
  burgerMenuItemsWrapper = document.querySelector(".navigation-items-wrapper");

let timelineBurgerOpen,
  timelineBurgerClose,
  clickCount = 0;
// const topLink = document.querySelector("a#top-link");
// const aboutMeLink = document.querySelector("a#about-link");
// const projectsLink = document.querySelector("a#projects-link");
// const skillsLink = document.querySelector("a#skills-link");
// const contactsLink = document.querySelector("a#contacts-link");
// const navLinksArray = [
//   topLink,
//   aboutMeLink,
//   projectsLink,
//   skillsLink,
//   contactsLink
// ];
console.log(mediaQuery);

function onInit() {
  //addEventListeners
  burgerMenu.addEventListener("click", burgerClickCounter);
}



function burgerClickCounter() {
  clickCount++;

  if (clickCount % 2 == 0) {
    console.log("counter is even");
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {

  console.log("menu opens");

  timelineBurgerOpen = new TimelineLite();

  timelineBurgerOpen
    .to(".navigation-items-wrapper", 0.5, {
      y: 0,
      ease: Power1.easeOut
    })
    .to("#burger-line-top", 0.3, {
      rotation: 35,
      transformOrigin: "top left 50%",
      ease: Power2.easeOut
    }, "-=0.3")
    .to("#burger-line-middle", 0.3, {
      visibility: "hidden"
    }, "-=0.3")
    .to("#burger-line-bottom", 0.3, {
      rotation: -35,
      transformOrigin: "bottom left 80%",
      ease: Power2.easeOut
    }, "-=0.3")
    .to(".navigation-logo", 0.3, {
      visibility: "hidden"
    }, "-=0.3")

    // .fromTo(".logo-white-dropdown", 0.3, {
    //   y: -30
    // }, {
    //     y: 0,
    //     opacity: 1,
    //     ease: Power1.easeOut
    //   }, "-=0.0")
    // .fromTo("#h1-dropdown", 0.3, {
    //   y: -30
    // }, {
    //     y: 0,
    //     opacity: 1,
    //     ease: Power1.easeOut
    //   }, "-=0.0")
    .staggerFromTo(".navigation-item", 0.4, {
      y: -10,
      opacity: 0
    }, {
        y: 0,
        opacity: 1,
        ease: Power1.easeOut
      }, 0.05, "+=0.02")
    ;
}

function closeMenu() {

  console.log("menu closes");

  timelineBurgerClose = new TimelineLite();

  timelineBurgerClose
    .to(".navigation-items-wrapper", 0.3, {
      y: "-100vh",
      ease: Power1.easeIn
    })
    .to("#burger-line-top", 0.3, {
      rotation: 0,
      transformOrigin: "top left 50%",
      ease: Power2.easeOut
    }, "-=0.3")
    .to("#burger-line-middle", 0.3, {
      visibility: "visible",
    }, "-=0.3")
    .to("#burger-line-bottom", 0.3, {
      rotation: 0,
      transformOrigin: "bottom left 80%",
      ease: Power2.easeOut
    }, "-=0.3")
    .to(".navigation-logo", 0.3, {
      visibility: "visible"
    }, "-=0.3")
    ;
}


onInit();
//phone size
// logo.addEventListener("click", openMenu);

// function openMenu() {
//   burgerMenuItemsWrapper.classList.remove("hideMenu");
//   burgerMenuItemsWrapper.classList.add("showMenu");

//   crossDiv.classList.remove("fadeOutCross");
//   crossDiv.classList.add("fadeInCross");
// }

// crossDiv.addEventListener("click", closeMenu);

// function closeMenu() {
//   burgerMenuItemsWrapper.classList.remove("showMenu");
//   burgerMenuItemsWrapper.classList.add("hideMenu");

//   crossDiv.classList.remove("fadeInCross");
//   crossDiv.classList.add("fadeOutCross");
// }

// navLinksArray.forEach(link => {
//   link.addEventListener("click", closeMenu);
// });
