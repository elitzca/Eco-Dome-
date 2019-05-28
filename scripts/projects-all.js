let template = document.querySelector("#projtemplate").content;
let projlist = document.querySelector("#projlist");
let page = 1;
let lookingForData = !1;

function fetchEvents() {
  lookingForData = !0;
  let urlParameters = new URLSearchParams(window.location.search);
  let catid = urlParameters.get("category");
  if (catid) {
    fetch(
      "http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=10&page=" +
        page +
        "&categories=" +
        catid
    )
      .then(e => e.json())
      .then(showEvents);
  } else {
    fetch(
      "http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=10&page=" +
        page
    )
      .then(e => e.json())
      .then(showEvents);
  }
}

function showEvents(data) {
  console.log(data);
  lookingForData = !1;
  data.forEach(showOneEvent);
}

function showOneEvent(anEvent) {
  console.log(anEvent);
  let clone = template.cloneNode(!0);
  clone.querySelector("h1").textContent = anEvent.title.rendered;
  clone.querySelector(".price span ").textContent = anEvent.acf.price;
  clone.querySelector(".time").textContent = anEvent.acf.time;
  clone.querySelector(".venue").textContent = anEvent.acf.venue;
  clone.querySelector(".description").innerHTML = anEvent.content.rendered;
  clone
    .querySelector("img")
    .setAttribute(
      "src",
      anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium
        .source_url
    );
  clone.querySelector(".readmore").href = "subpage.html?id=" + anEvent.id;
  let year = anEvent.acf.date.substring(0, 4);
  let month = anEvent.acf.date.substring(4, 6);
  let day = anEvent.acf.date.substring(6, 8);
  clone.querySelector(".date").innerHTML = day + "." + month + "." + year;
  if (anEvent.acf.price == 0) {
    clone.querySelector(".price").textContent = "FREE";
  } else {
    clone.querySelector(".price span ").textContent = anEvent.acf.price;
  }
  projlist.appendChild(clone);
}
fetchEvents();
setInterval(function() {
  console.log(bottomVisible());
  if (bottomVisible() && lookingForData === !1) {
    page++;
    fetchEvents();
  }
}, 100);

function bottomVisible() {
  const scrollY = window.scrollY;
  const visible = document.documentElement.clientHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const bottomOfPage = visible + Math.round(scrollY) >= pageHeight;
  return bottomOfPage || pageHeight < visible;
}
