var imgArray = [];
var titleArray = [];
var slideIndex = 0;

var reddit = "https://www.reddit.com/search.json?q="
var imgurFilter = "i.imgur.com";

$("#controls").hide();

$("#search-form").submit(function(event){
  event.preventDefault();

  var searchTerm = event.target.search.value;

  $.ajax({
    url: reddit + searchTerm + "+nsfw:no",
    method: 'GET', // POST if posting to server, look this up
    success: function(response) { // response is an object
      var posts = response.data.children;
      posts.forEach(function(post) { // iterate over each item in posts, an array of "children"
        if (post.data.url.indexOf(imgurFilter) !== -1){
          imgArray.push(post.data.url);
          titleArray.push(post.data.title);
        };
      });
      // console.log(imgArray, titleArray);
    },
    error: function(response) {
      console.log(response);
    },
  });
  slideshowState();
});

function slideshowState() {
  console.log(imgArray, titleArray);
  $("#controls").show();
  $("#search-form").hide();
  cycleInterval = setInterval(setSlide, 2000);
}

$("#start").click(function(){
  cycleInterval = setInterval(setSlide, 2000);
});

$("#stop").click(function() {
  clearInterval(cycleInterval);
});

$("#reset").click(function(){
  imgArray = [];
  titleArray = [];
  $("#slide").attr("src", "");
  $("#caption").text("");
  slideIndex = 0;
  clearInterval(cycleInterval);
  $("#search-form").show();
  $("#controls").hide();
});

function setSlide() {
  slideIndex %= imgArray.length;
  $("#slide").attr("src", imgArray[slideIndex]);
  $("#caption").text(titleArray[slideIndex]);
  slideIndex++
}
