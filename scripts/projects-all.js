let template = document.querySelector("#projtemplate").content;
let projlist = document.querySelector("#projlist");
let page = 1;
let lookingForData = !1;
let mobileMedia = window.matchMedia("(max-width: 750px)");
let tlD1, tlD2, tlD3, tlD4;

function fetchProjects() {
  lookingForData = !0;
  // let urlParameters = new URLSearchParams(window.location.search);
  // let catid = urlParameters.get("category");
  // if (catid) {
  //   fetch(
  //     "http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=9&page=" +
  //       page +
  //       "&categories=" +
  //       catid
  //   )
  //     .then(e => e.json())
  //     .then(showProjects);
  // } else {
  //   fetch(
  //     "http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=10&page=" +
  //       page
  //   )
  //     .then(e => e.json())
  //     .then(showProjects);
  // }
  fetch(
    "https://eco-dome.eu/wp-json/wp/v2/projects?_embed&per_page=9"
  )
    .then(e => e.json())
    .then(showProjects)
    .then(loopProj);
}

function showProjects(data) {
  console.log(data);
  lookingForData = !1;
  data.forEach(showOneProject);
}

function showOneProject(aProject) {
  console.log(aProject);
  let clone = template.cloneNode(!0);
  clone.querySelector("h1").textContent = aProject.title.rendered;
  clone.querySelector(".location").textContent = aProject.acf.location;
  clone.querySelector(".date").textContent = aProject.acf.date;

  clone.querySelector(".excerpt-short").innerHTML = aProject.excerpt.rendered;
  // clone.querySelector(".description").innerHTML = aProject.content.rendered;
  clone
    .querySelector("img")
    .setAttribute(
      "src",
      aProject._embedded["wp:featuredmedia"][0].media_details.sizes.medium
        .source_url
    );

  clone.querySelector(".readmore").href = "project.html?id=" + aProject.id;

  // template.style.backgroundImage = "url( `aProject._embedded["wp: featuredmedia"][0].media_details.sizes.medium.source_url`)";

  projlist.appendChild(clone);


}
fetchProjects();
// setInterval(function () {
//   // console.log(bottomVisible());
//   if (bottomVisible() && lookingForData === !1) {
//     page++;
//     fetchEvents();
//   }
// }, 100);

// function bottomVisible() {
//   const scrollY = window.scrollY;
//   const visible = document.documentElement.clientHeight;
//   const pageHeight = document.documentElement.scrollHeight;
//   const bottomOfPage = visible + Math.round(scrollY) >= pageHeight;
//   return bottomOfPage || pageHeight < visible;
// }

function loopProj() {
  // let nodeListProj = document.querySelectorAll(".project");
  // let HTMLCollectionProj = document.getElementsByClassName("project");
  let projArr = [...document.querySelectorAll(".project")];
  // console.log(nodeListProj, nodeListProj.length);
  // console.log(HTMLCollectionProj, HTMLCollectionProj.length);
  // console.log(projArr);
  // console.log(Array.isArray(projArr));

  if (mobileMedia.matches) {
    //
  } else {
    projArr.forEach(proj => {
      proj.addEventListener("mouseover", scaleUp);
      proj.addEventListener("mouseleave", scaleDown);

      function scaleUp(event) {
        let li = event.target.childNodes[1];
        let anchor = event.target.childNodes[1].childNodes[0];
        tlD1 = new TimelineLite();

        li.addEventListener("mouseover", keepScaled);
        anchor.addEventListener("mouseover", keepScaled2);

        tlD1
          .to(".project", 0.3, {
            scale: 0.97,
            ease: Power1.easeOut
          })
          .to(event.target.parentElement, 0.3, {
            scale: 1.1,
            ease: Power1.easeOut
          }, "-=0.3")
          .to(anchor, 0.5, {
            color: "#e60056",
            fontWeight: "bold"
          }, "-=0.3")
          ;

        function keepScaled(event) {
          tlD2 = new TimelineLite();
          let projParent = event.target.parentElement.parentElement;
          console.log(event.target.parentElement.parentElement);
          tlD2
            .to(projParent, 0.001, {
              scale: 1
            })
        }

        function keepScaled2(event) {
          tlD3 = new TimelineLite();
          let projParent = event.target.parentElement.parentElement.parentElement;
          console.log(event.target.parentElement.parentElement.parentElement);
          tlD3
            .to(projParent, 0.001, {
              scale: 1.1
            })
        }
      }

      function scaleDown(event) {
        let tlD4 = new TimelineLite();

        tlD4
          .to(".project", 0.3, {
            scale: 1,
            ease: Power1.easeOut
          })
          .to(event.target.parentElement, 0.3, {
            scale: 1,
            ease: Power1.easeOut
          }, "-=0.3")
          ;
      }
    })
  }
}
