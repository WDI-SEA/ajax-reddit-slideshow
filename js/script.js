var mainButton = document.getElementById("mainbutton");
var x = document.getElementById("toggletitle");
var searchText = document.getElementById("searchbox"); console.log(searchText);
var thumbnailArray = [];

function hideTitle() {    
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function changeBtnValue() {
    if (mainButton.value=="Search") mainButton.value = "Stop Slideshow";
    else mainButton.value = "Search";
}

function apiFetch() {
    console.log(searchText.value);
    fetch('https://www.reddit.com/search.json?q=' + searchText.value) 
    .then(function(data) {
    return data.json();
  })
  .then(function(json) {
    var posts = json.data.children;
    thumbnailArray = posts.map(function(post) {
        //console.log(post.data.thumbnail);
        return post.data.thumbnail;

    })
    console.log(thumbnailArray);
});
}

