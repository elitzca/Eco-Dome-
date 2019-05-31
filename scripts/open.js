"use strict"

let tlSquare;
let desktopMedia = window.matchMedia("(min-width: 1025px)");

document.addEventListener("DOMContentLoaded", checkDevice);

function checkDevice() {
    if (desktopMedia.matches) {
        scaleSq();
        redirectWindowDesktop();
    } else {
        redirectWindowMobile();
    }
}


function scaleSq() {
    tlSquare = new TimelineLite();

    tlSquare
        .from("#black-square", 1, {
            scale: 1.7,
            ease: Power3.easeOut
        }, "+=2")
        .to("body", 0.3, {
            opacity: 0
        });

}

function redirectWindowDesktop() {
    ;
    setTimeout(function () {
        window.location = "index.html";
    }, 3000);
}

function redirectWindowMobile() {
    window.location = "index.html";
}