// Get the H1 heading
let imgOpen = document.querySelector("#open-div .img-div img");
let imgAbout = document.querySelector("#about-domes-div .img-div img");
let imgPurpose = document.querySelector("#dome-purpose-div .img-div img");
let imgUs = document.querySelector("#us-div .img-div img");

// Get it's position in the viewport
let boundingOpen = imgOpen.getBoundingClientRect();
let boundingAbout = imgAbout.getBoundingClientRect();
let boundingPurp = imgPurpose.getBoundingClientRect();
let boundingUs = imgUs.getBoundingClientRect();



// Log the results
// console.log(bounding);
window.addEventListener("DOMContentLoaded", checkHeight);
window.addEventListener("scroll", checkHeight);

function checkHeight() {
    let bottomY = window.pageYOffset + document.documentElement.clientHeight;

    // console.log(bottomY);
    if (bottomY > boundingOpen.top) {
        animateOpenImg();
    }
    if (bottomY > boundingAbout.top) {
        animateAboutImg();
    }
    if (bottomY > boundingPurp.top) {
        animatePurpImg();
    }
    if (bottomY > boundingUs.top) {
        animateUsImg();
    }

}

function animateOpenImg() {
    TweenLite.fromTo(imgOpen, 1.5, {
        x: 50,
        opacity: 0,
        ease: Power3.easeOut
    }, {
            x: 0,
            opacity: 1,
            ease: Power3.easeOut
        }, "+=")
    boundingOpen = "";
}

function animateAboutImg() {
    TweenLite.fromTo(imgAbout, 1.5, {
        x: -50,
        opacity: 0,
        ease: Power3.easeOut
    }, {
            x: 0,
            opacity: 1,
            ease: Power3.easeOut
        }, "+=2")
    boundingAbout = "";
}

function animatePurpImg() {
    TweenLite.fromTo(imgPurpose, 1.5, {
        x: 50,
        opacity: 0,
        ease: Power3.easeOut
    }, {
            x: 0,
            opacity: 1,
            ease: Power3.easeOut
        })

    boundingPurp = "";
}

function animateUsImg() {
    TweenLite.fromTo(imgUs, 1.5, {
        x: -50,
        opacity: 0,
        ease: Power3.easeOut
    }, {
            x: 0,
            opacity: 1,
            ease: Power3.easeOut
        }, "+=2")
    boundingUs = "";
}


