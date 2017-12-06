var images = [];
var count = 0;
$(function() {
  $("#search-form").on("submit", search);
 
});

function search(event) {
  event.preventDefault();
  clearSearchResults();
  

var userInput = $("#query").val() || "search it here!";
    console.log("user input was", userInput);
    $("h1").css("display", "none");
    $("#directions").css("display", "none");
    $("form").css("display", "none");

  $.get('https://www.reddit.com/search.json',{
  q: userInput,
  limit: 15
}).done(function(response) {
  console.log(response.data.children);
  addSearchResult(response.data.children);
});
}

function clearSearchResults() {
  $("#results").html("");  
}

function addSearchResult(results) {
  for(var i=0; i<results.length; i++){
   // console.log(results[i].data.title); 
   var image = document.createElement("img");
   image.src = results[i].data.thumbnail;

   // $("#slideshow").append(image);
   images.push(image);
  }

  
  ///create an image and append it to DOM and give it an id
}

// var i=0;

setInterval(function(){
  console.log("check slides");
    count++
    $("#results").append(images[count]);
    $("#results").append(images[count]);

    // $("#results").remove(images[i++ -1]);
}, 1000);
// var slides = $("img").src

