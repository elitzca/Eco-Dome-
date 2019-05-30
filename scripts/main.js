"use strict"
let desktopMedia = window.matchMedia("(min-width: 1025px)");
var tlOpen;

document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
    animateLandingPage();
}

function animateLandingPage() {


    if (desktopMedia.matches) {

        tlOpen = new TimelineLite();

        tlOpen
            .from("#black-square", 1, {
                scale: 1.7,
                ease: Power3.easeOut
            }, "+=2")
            .from(".navigation", 1, {
                opacity: 0,
                ease: Power1.easeIn
            }, "-=1")
            .staggerFrom(".div-pics", 0.4, {
                opacity: 0,
                x: -80,
                y: -50,
                ease: Power1.easeOut
            }, 0.06)


    }
}