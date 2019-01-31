// selectors
let input = document.querySelector("#query");
let search = document.querySelector("#search");

let imageBox = document.querySelector(".image-box");

// Functions

document.forms["query-form"].addEventListener("submit", function(
  e
) {
  e.preventDefault();
  let query = input.value;
  searchReddit(query);
});

// fn to fetch api
function searchReddit(query) {
  let url = `http://www.reddit.com/search.json?q=${query}+nsfw:no`;

  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(data => {
      return data.data.children;
    })
    .then(children => {
      // filter post with image links
      return children.filter(child => {
        return (
          // child.data.url.match(/\.(jpeg|jpg|gif|png|gifv)$/) != null
          child.data.post_hint === "image"
        );
      });
    })
    .then(urlList => {
      // posts with image links
      let imageArr = urlList.map(entry => entry.data.url);
      // console.log(imageArr);
      // slideShow(imageArr);
    });
}
