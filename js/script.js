var images = [];
var count = 0;
var reset = $("#reset");

$(function() {
  $("#search-form").on("submit", search);

});
function search(event) {
  event.preventDefault();
  clearSearchResults();
  var userInput = $("#query").val() || "search it here!";
  $("h1").css("display", "none");
  $("#directions").css("display", "none");
  $("form").css("display", "none");
  $.get('https://www.reddit.com/search.json',{
  q: userInput,
  limit: 50
}).done(function(response) {
  addSearchResult(response.data.children);
  setInterval(function(){
    count++
    console.log(images[count])
    $("#results").html(images[count])
    }, 1500);
  });

}
function clearSearchResults() {
  $("#results").html("");  
}
function addSearchResult(results) {
  for(var i=0; i<results.length; i++){
   var image = document.createElement("img");
   image.src = results[i].data.thumbnail;
   images.push(image);
  }
}

