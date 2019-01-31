// selectors
let queryBox = document.querySelector(".query-box");
let input = document.querySelector("#query");
let searchBtn = document.querySelector("#search");

let imageBox = document.querySelector(".image-box");
let imageDiv = document.querySelector(".image");
let stopBtn = document.querySelector("#stop");

// Functions

searchBtn.addEventListener("click", function(e) {
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
    .then(json => {
      // json -> filter -> post with image links
      let urlList = json.data.children.filter(child => {
        return (
          // child.data.url.match(/\.(jpeg|jpg|gif|png|gifv)$/) != null
          child.data.post_hint === "image"
        );
      });
      // array of posts with image links -> array of image links
      let imageArr = urlList.map(entry => entry.data.url);
      console.log(imageArr);
      slideShow(imageArr);
    });
}

var intHandler;

function slideShow(arr) {
  queryBox.classList.toggle("hidden");
  imageBox.classList.toggle("hidden");
  let i = 0;

  function changeImage() {
    console.log(i);
    let newImage = document.createElement("img");
    newImage.src = arr[i];

    imageDiv.innerHTML = "";
    imageDiv.appendChild(newImage);
    if (i < arr.length - 1) i++;
    else i = 0;
  }
  intHandler = setInterval(changeImage, 3000);
}

stopBtn.addEventListener("click", () => {
  console.log("stop");
  imageDiv.innerHTML = "";
  queryBox.classList.toggle("hidden");
  imageBox.classList.toggle("hidden");
  clearInterval(intHandler);
});
