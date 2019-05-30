let template = document.querySelector("#projtemplate").content;
let projlist = document.querySelector("#projlist");
let page = 1;
let lookingForData = !1;

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
    .then(showProjects);
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

  clone.querySelector(".excerpt").innerHTML = aProject.excerpt.rendered;
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
