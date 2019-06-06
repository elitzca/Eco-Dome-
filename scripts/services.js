let desktopMedia = window.matchMedia("(min-width: 900px)")
let imgWork = document.querySelector(".process-img img");
let boundingWork = imgWork.getBoundingClientRect();
let servArr = [...document.querySelectorAll(".service")];


function checkMedia() {

    if (desktopMedia.matches) {
        window.addEventListener("DOMContentLoaded", checkHeight);
        window.addEventListener("scroll", checkHeight);

        animServ();
    }
}

checkMedia();

function checkHeight() {
    let bottomY = window.pageYOffset + document.documentElement.clientHeight;

    if (bottomY > boundingWork.top) {
        animateWorkImg();
    }
}

function animateWorkImg() {
    TweenLite.fromTo(imgWork, 1.5, {
        x: -50,
        opacity: 0,
        ease: Power3.easeOut
    }, {
            x: 0,
            opacity: 1,
            ease: Power3.easeOut
        })
    boundingWork = "";
}

function animServ() {

    TweenMax.staggerFromTo(".service", 0.6, {
        x: -50,
        opacity: 0,
        ease: Power1.easeOut
    }, {
            x: 0,
            opacity: 1,
            ease: Power1.easeOut
        }, 0.05)
}

