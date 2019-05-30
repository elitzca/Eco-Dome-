"use strict"
let desktopMedia = window.matchMedia("(min-width: 1025px)");
let tlOpen,
    tlDetails,
    tlShowDescM,
    tlHideDet;
const divAbout = document.querySelector("#home-about"),
    divProjects = document.querySelector("#home-projects"),
    divParts = document.querySelector("#home-parts"),
    divCont = document.querySelector("#home-contacts");
const arrAbout = document.querySelector("#home-about .div-arrow"),
    arrProjects = document.querySelector("#home-projects .div-arrow"),
    arrParts = document.querySelector("#home-parts .div-arrow"),
    arrCont = document.querySelector("#home-contacts .div-arrow");
// let divArray = [document.querySelectorAll(".div-pics")];
let divArray = [divAbout, divProjects, divParts, divCont];
let arrArray = [arrAbout, arrCont, arrParts, arrProjects];

document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
    animateLandingPage();

}

function animateLandingPage() {


    if (desktopMedia.matches) {
        loopDivs();
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

        function loopDivs() {
            divArray.forEach(div => {
                div.addEventListener("mouseover", showDetails);
                div.addEventListener("mouseleave", hideDetails);


                //desc div on top, should fade in;

                // function showDetails(event) {
                //     tlDetails = new TimelineLite();

                //     console.log(event.target);
                //     tlDetails
                //         .to(event.target, 0.3, {
                //             opacity: 1,
                //             ease: Power1.easeIn
                //         })
                //     // .to(event.target[".div-title"], 0.3, {
                //     //     opacity: 0,
                //     //     ease: Power1.easeIn
                //     // });
                // }

                // 

                // desc div bellow - should slide up /// line 513 css
                function showDetails(event) {

                    tlDetails = new TimelineLite();
                    // console.log(event.target.hasChildNodes());
                    // console.log(event.target.childNodes);

                    if (event.target.hasChildNodes()) {
                        let children = event.target.childNodes;

                        for (var i = 0; i < children.length; i++) {
                            tlDetails = new TimelineLite();
                            console.log(children);

                            tlDetails
                                .to(children[3], 0.3, {
                                    top: "0%",
                                    ease: Power1.easeIn
                                })
                                .to(children[1], 0.2, {
                                    y: 50
                                }, "-=0.3");
                        }
                    }

                }

                function hideDetails() {

                    if (event.target.hasChildNodes()) {
                        let children = event.target.childNodes;

                        for (var i = 0; i < children.length; i++) {
                            tlHideDet = new TimelineLite();
                            // console.log(children);

                            tlDetails
                                .to(children[3], 0.1, {
                                    top: "100%",
                                    ease: Power1.easeIn
                                });

                        }
                    }
                }
            });
        }
    } else {
        arrArray.forEach(arr => {
            arr.addEventListener("click", showDescMobile);

            function showDescMobile(event) {
                tlShowDescM = new TimelineLite();

                tlShowDescM
                    .to(".div-desc", 0.5, {
                        left: "0"
                    })
            }
        })

    }
}



