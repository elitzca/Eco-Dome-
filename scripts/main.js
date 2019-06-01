"use strict"
let desktopMedia = window.matchMedia("(min-width: 1025px)");
let tlDetails,
    tlOpenFirst,
    tlOpenSec,
    tlShowDescM,
    tlCloseDescM,
    tlHideDet;
const divAbout = document.querySelector("#home-about .div-desc"),
    divProjects = document.querySelector("#home-projects .div-desc"),
    divParts = document.querySelector("#home-parts .div-desc"),
    divCont = document.querySelector("#home-contacts .div-desc");
const arrAboutO = document.querySelector("#home-about .div-arrow-o"),
    arrProjectsO = document.querySelector("#home-projects .div-arrow-o"),
    arrPartsO = document.querySelector("#home-parts .div-arrow-o"),
    arrContO = document.querySelector("#home-contacts .div-arrow-o");
const arrAboutC = document.querySelector("#home-about .div-arrow-c"),
    arrProjectsC = document.querySelector("#home-projects .div-arrow-c"),
    arrPartsC = document.querySelector("#home-parts .div-arrow-c"),
    arrContC = document.querySelector("#home-contacts .div-arrow-c");
// let divArray = [document.querySelectorAll(".div-pics")];
let divArray = [divAbout, divProjects, divParts, divCont];
let arrOpenArray = [arrAboutO, arrContO, arrPartsO, arrProjectsO];
let arrCloseArray = [arrAboutC, arrContC, arrPartsC, arrProjectsC];

document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
    animateLandingPage();
    setLocalStorage();

}

console.log(localStorage);

function animateLandingPage() {


    if (desktopMedia.matches) {
        loopDivs();

        if (localStorage.status == "opened") {
            console.log("NOOOO anim");

            document.querySelector("#opening-screen").style.display = "none";
            tlOpenSec = new TimelineLite();

            tlOpenSec
                .staggerFrom(".div-pics", 0.4, {
                    opacity: 0,
                    x: -80,
                    y: -50,
                    ease: Power1.easeOut
                }, 0.06);

        } else {
            console.log(" play anim");

            tlOpenFirst = new TimelineLite();

            tlOpenFirst
                .from(".black-square-o", 1, {
                    scale: 1.7,
                    ease: Power3.easeOut
                }, "+=1.5")
                .to(".black-square-2", 0.4, {
                    opacity: 0
                })
                .to("#opening-screen", 0.8, {
                    backgroundColor: "transparent"
                }, "-=1")

                .from(".navigation", 0.7, {
                    opacity: 0,
                    ease: Power1.easeIn
                }, "-=1")
                .staggerFrom(".div-pics", 0.4, {
                    opacity: 0,
                    x: -80,
                    y: -50,
                    ease: Power1.easeOut
                }, 0.06, "-=0.8")
                .to(".black-square-o", 0.4, {
                    opacity: 0
                })
                .to(".black-square-2", 0.4, {
                    opacity: 1
                }, "-=0.8")
                .to("#opening-screen", 0.01, {
                    display: "none"
                })
                ;
        }


        function loopDivs() {
            divArray.forEach(div => {
                div.addEventListener("mouseover", showDetails);
                div.addEventListener("mouseleave", hideDetails);


                function showDetails(event) {
                    tlDetails = new TimelineLite();

                    // console.log(event.target.children[0]);

                    tlDetails
                        .to(event.target, 0.5, {
                            top: "-46vh",
                            ease: Power2.easeOut
                        })
                        .to(event.target.children[0], 0.2, {
                            opacity: 0
                        }, "-=0.5")
                        ;
                }

                function hideDetails() {


                    tlHideDet = new TimelineLite();

                    tlDetails
                        .to(event.target, 0.1, {
                            top: 0,
                            ease: Power1.easeOut
                        })
                        .to(event.target.children[0], 0.2, {
                            opacity: 1
                        }, "-=0.1")
                        ;
                }
            });
        }

        // desc div bellow - should slide up /// line 513 css
        // function showDetails(event) {

        //     tlDetails = new TimelineLite();
        //     console.log(event.target);
        //     // console.log(event.target.hasChildNodes());
        //     // console.log(event.target.childNodes);

        //     if (event.target.hasChildNodes()) {
        //         let children = event.target.childNodes;

        //         for (var i = 0; i < children.length; i++) {
        //             console.log(children);

        //             tlDetails
        //                 .to(children[1], 0.3, {
        //                     top: "-14vh",
        //                     ease: Power1.easeIn
        //                 })
        //             // .to(children[1], 0.2, {
        //             //     y: 50
        //             // }, "-=0.3");
        //         }
        //     }

        // }


    } else {

        arrOpenArray.forEach(arr => {
            arr.addEventListener("click", slideOpenDescMobile);

            function slideOpenDescMobile(event) {
                // console.log(event.target);
                // console.log(event.target.nextElementSibling);
                let divDesc = event.target.parentElement
                tlShowDescM = new TimelineLite();

                tlShowDescM
                    .to(divDesc, 0.5, {
                        left: "-100vw",
                        ease: Power1.easeOut
                    })
                    .to(event.target, 0.2, {
                        opacity: 0
                    }, "-=0.5")
                    .fromTo(event.target.nextElementSibling, 0.2, {
                        opacity: 0
                    }, {
                            opacity: 1
                        }, "-=0.5")
                    ;
            }


        })

        arrCloseArray.forEach(arr => {
            arr.addEventListener("click", slideCloseDescMobile);

            function slideCloseDescMobile(event) {
                // console.log(event.target);
                console.log(event.target.previousElementSibling);
                let divDesc = event.target.parentElement
                tlCloseDescM = new TimelineLite();

                tlCloseDescM
                    .to(divDesc, 0.5, {
                        left: "0vw",
                        ease: Power1.easeOut
                    })
                    .to(event.target, 0.2, {
                        opacity: 0
                    }, "-=0.5")
                    .to(event.target.previousElementSibling, 0.3, {
                        opacity: 1,
                        ease: Power3.easeIn
                    }, "+=0.1");
            }
        })
    }


}

function setLocalStorage() {

    setTimeout(function () {
        localStorage.setItem("status", "opened");
    }, 5000);
}






