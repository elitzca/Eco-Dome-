let urlParameters = new URLSearchParams(window.location.search);
let id = urlParameters.get("id");

fetch("https://eco-dome.eu/wp-json/wp/v2/projects/" + id)
    .then(e => e.json())
    .then(showProject);

function showProject(aProject) {
    console.log(aProject);
    document.querySelector("#aProject h1").textContent =
        aProject.title.rendered;
    document.querySelector(".location").textContent = aProject.acf.location;
    document.querySelector(".date").textContent = aProject.acf.date;
    document.querySelector(".description").innerHTML = aProject.content.rendered;
    // document
    //     .querySelector("img")
    //     .setAttribute(
    //         "src",
    //         aProject._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url
    //     );
    //     let year = aProject.acf.date.substring(0, 4);
    //     let month = aProject.acf.date.substring(4, 6);
    //     let day = aProject.acf.date.substring(6, 8);
    //     document.querySelector(".date").innerHTML = day + "." + month + "." + year;
    // }
    // let page = 1;
    // let lookingForData = !1;
    // function fetchProject() {
    //     lookingForData = !0;
    //     let urlParameters = new URLSearchParams(window.location.search);
    //     let catid = urlParameters.get("category");

    //     fetch(
    //         "https://eco-dome.eu/wp-json/wp/v2/projects?_embed&per_page=10")
    //         .then(e => e.json())
    //         .then(showProjects);
    // }
}
