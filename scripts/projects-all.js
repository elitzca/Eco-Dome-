let template = document.querySelector("#projtemplate").content;
let projlist = document.querySelector("#projlist");
let page = 0;
let newPage = true;
let per_page = 2;
let lookingForData = !1;
let mobileMedia = window.matchMedia("(max-width: 750px)");
let tlD1, tlD2, tlD3, tlD4, tlM1, tlM2;

function fetchProjects() {
  lookingForData = !0;
  let urlParameters = new URLSearchParams(window.location.search);
  console.log(urlParameters);
  let catid = urlParameters.get("category");
  if (catid) {
    fetch(
      "http://eco-dome.eu/wp-json/wp/v2/projects?_embed&per_page=" + per_page + "&offset=" +
      page +
      "&categories=" +
      catid
    )
      .then(e => e.json())
      .then(showProjects)
      .then(loopProj)
      .catch(function () {
        newPage = false;
      });
  } else {
    fetch(
      "http://eco-dome.eu/wp-json/wp/v2/projects?_embed&per_page=" + per_page + "&offset=" +
      page
    )
      .then(e => e.json())
      .then(function (response) {
        if (response) {

          showProjects(response);
          loopProj(response);
        }
        console.log("ok", response);
      })
      .catch(function () {
        newPage = false;
      });
  }
  // fetch(
  //   "https://eco-dome.eu/wp-json/wp/v2/projects?_embed&per_page=1"
  //   + page
  // )
  //   .then(e => e.json())
  //   .then(showProjects)
  //   .then(loopProj);
}

function showProjects(data) {
  console.log(data);
  // CHECK WHETHER THERE MORE POSTS
  if (data.length < per_page) {
    newPage = false;
  }
  lookingForData = !1;
  data.forEach(showOneProject);
}

function showOneProject(aProject) {
  // console.log(aProject.id);
  let clone = template.cloneNode(!0);
  clone.querySelector("h1").textContent = aProject.title.rendered;
  clone.querySelector(".location").textContent = aProject.acf.location;
  clone.querySelector(".date").textContent = aProject.acf.date;

  clone.querySelector(".excerpt-short").innerHTML = aProject.acf.mobile_excerpt;
  clone.querySelector(".excerpt-long").innerHTML = aProject.excerpt.rendered;
  clone
    .querySelector("img")
    .setAttribute(
      "src",
      aProject._embedded["wp:featuredmedia"][0].media_details.sizes.medium
        .source_url
    );

  clone.querySelector(".readmore-m").href = "project.html?id=" + aProject.id;
  clone.querySelector(".readmore-d").href = "project.html?id=" + aProject.id;

  // template.style.backgroundImage = "url( `aProject._embedded["wp: featuredmedia"][0].media_details.sizes.medium.source_url`)";

  projlist.appendChild(clone);


}

fetchProjects();

// setInterval(function () {
//   // console.log(bottomVisible());
//   if (bottomVisible() && lookingForData === !1) {
//     page++;
//     fetchProjects();
//   }
// }, 100);
let last_known_scroll_position = 0;
let ticking = false;

window.addEventListener('scroll', function (e) {
  if (newPage) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (bottomVisible() && lookingForData === !1) {
          page += per_page;
          fetchProjects();
        }
        ticking = false;
      });

      ticking = true;
    }
  }
});

function bottomVisible() {
  const scrollY = window.scrollY;
  const visible = document.documentElement.clientHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const bottomOfPage = visible + Math.round(scrollY) >= pageHeight;
  return bottomOfPage || pageHeight < visible;

}

function loopProj() {
  // let nodeListProj = document.querySelectorAll(".project");
  // let HTMLCollectionProj = document.getElementsByClassName("project");
  let projArr = [...document.querySelectorAll(".project")];
  let arrUpArr = [...document.querySelectorAll(".desc-arr-proj-up")];
  let arrDownArr = [...document.querySelectorAll(".desc-arr-proj-down")];
  // console.log(arrUpArr, arrDownArr);
  // console.log(nodeListProj, nodeListProj.length);
  // console.log(HTMLCollectionProj, HTMLCollectionProj.length);
  // console.log(projArr);
  // console.log(Array.isArray(projArr));

  if (mobileMedia.matches) {

    arrUpArr.forEach(arr => {
      arr.addEventListener("click", showProjDescM);

      function showProjDescM(event) {
        tlM1 = new TimelineLite();

        let descGrad = event.target.parentElement.parentElement;
        let shortDesc = event.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
        // console.log(event.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling);
        tlM1
          .to(descGrad, 0.3, {
            top: "0",
            ease: Power1.easeOut
          })
          .to(shortDesc, 0.3, {
            opacity: 1
          }, "-=0.3")
          .fromTo(event.target, 0.3, {
            display: "inherit",
            opacity: 1
          }, {
              opacity: 0,
              display: "none"
            }, "-=0.3")
          .fromTo(event.target.nextElementSibling, 0.3, {
            display: "none",
            opacity: 0
          }, {
              display: "inherit",
              opacity: 1
            })
          ;
      }
    })


    arrDownArr.forEach(arr => {
      arr.addEventListener("click", hideProjDescM);

      function hideProjDescM(event) {
        tlM2 = new TimelineLite();

        let descGrad = event.target.parentElement.parentElement;
        let shortDesc = event.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
        // console.log(event.target.previousElementSibling);
        tlM2
          .to(descGrad, 0.3, {
            top: "41%",
            ease: Power1.easeOut
          })
          .to(shortDesc, 0.3, {
            opacity: 0
          }, "-=0.3")
          .fromTo(event.target, 0.3, {
            display: "inherit",
            opacity: 1
          }, {
              opacity: 0,
              display: "none"
            }, "-=0.3")
          .fromTo(event.target.previousElementSibling, 0.3, {
            display: "none",
            opacity: 0
          }, {
              display: "inherit",
              opacity: 1
            })
          ;
      }
    })


  } else {

    projArr.forEach(proj => {
      console.log('proj', proj);
      proj.addEventListener("mouseenter", scaleUp);
      proj.addEventListener("mouseleave", scaleDown);

      function scaleUp(event) {
        // let li = event.target.childNodes[1];
        let readMore = event.target.childNodes[5].childNodes[1].childNodes[0];
        tlD1 = new TimelineLite();
        //
        // li.addEventListener("mouseover", keepScaled);
        // anchor.addEventListener("mouseover", keepScaled2);
        // console.log(event.target.childNodes[5].childNodes[1].childNodes[0])
        tlD1
          .to(".project", 0.3, {
            scale: 0.97,
            ease: Power1.easeOut
          })
          .to(event.target, 0.3, {
            scale: 1.1,
            ease: Power1.easeOut
          }, "-=0.3")
          .to(readMore, 0.3, {
            color: "#d31935",
            fontWeight: "bolder"
          }, "-=0.3")
          // .to(anchor, 0.5, {
          //   color: "#e60056",
          //   fontWeight: "bold"
          // }, "-=0.3")
          ;

        // function keepScaled(event) {
        //   tlD2 = new TimelineLite();
        //   let projParent = event.target.parentElement.parentElement;
        //   console.log(event.target.parentElement.parentElement);
        //   tlD2
        //     .to(projParent, 0.001, {
        //       scale: 1
        //     })
        // }
        //
        // function keepScaled2(event) {
        //   tlD3 = new TimelineLite();
        //   let projParent = event.target.parentElement.parentElement.parentElement;
        //   console.log(event.target.parentElement.parentElement.parentElement);
        //   tlD3
        //     .to(projParent, 0.001, {
        //       scale: 1.1
        //     })
        // }
      }

      function scaleDown(event) {
        let tlD4 = new TimelineLite();
        let readMore = event.target.childNodes[5].childNodes[1].childNodes[0];

        tlD4
          .to(".project", 0.3, {
            scale: 1,
            ease: Power1.easeOut
          })
          .to(event.target.parentElement, 0.3, {
            scale: 1,
            ease: Power1.easeOut
          }, "-=0.3")
          .to(readMore, 0.3, {
            color: "#007fc9",
            fontWeight: "normal"
          }, "-=0.3")
          ;
      }
    })
  }
}


fetch("http://eco-dome.eu/wp-json/wp/v2/categories?per_page=100&orderby=id&order=asc")
  .then(e => e.json())
  .then(buildMenu)

function buildMenu(data) {
  console.log('buildMenu', data);
  let parentElement = document.querySelector("#menu-projs");
  let categories = [];
  data.forEach(item => {

    console.log('item', item, "item parent", item.parent);
    if (item.parent === 0) {
      if (categories[item.id] === undefined) {
        categories[item.id] = [];
        categories[item.id]['parent'] = [];
        categories[item.id]['child'] = [];
      }
      // console.log('cate', categories);
      categories[item.id]['parent'] = item;
    } else {
      if (categories[item.parent] === 'undefined') {
        categories[item.parent] = [];
        categories[item.parent]['parent'] = [];
        categories[item.parent]['child'] = [];
      }
      categories[item.parent]['child'].push(item);
    }
    //
    //
    //   if (item.count > 0) {
    //     let li = document.createElement("li");
    //     let a = document.createElement("a");
    //     let ul;
    //     a.textContent = item.name;
    //     a.href = "projects-all.html?category=" + item.id;
    //     li.appendChild(a);
    //
    //     if (item.parent == 0 && item.count > 1) {
    //       ul = document.createElement("ul")
    //       ul.classList.add("cat-" + item.id)
    //       li.appendChild(ul)
    //
    //       console.log(ul, li)
    //     } else if (item.parent > 0) {
    //       parentElement = document.querySelector(".cat-" + item.parent)
    //       // li.classList.add("bullet")
    //     }
    //     console.log(parentElement)
    //     parentElement.appendChild(li)
    //   }
  })


  console.log('cate', categories);

}
