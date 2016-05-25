$("#searchB").submit(search);
$("#stopB").submit(search);

function search(e) {
  e.preventDefault();
  clearSearchResults();
  var userQ = query.val();
  console.log("searching for:", userQ);

  $.get('https://www.reddit.com/search.json', {
    q: 'userQ'
  }).done(function(response) {
    console.log(response);
    var input = $("#query");
    var results = response.data.children;
    for (var i = 0; i < results.length; i++)  {
      var result = results[i].data.;
      addSearchResult(result);
  }})
}

var pictures = [];

function clearSearchResults() {
  $("#results").html("");
}

function addSearchResult(result) {
  var div = document.createElement("div");

  var link = document.createElement("a");
  link.href = "result.url"; // reset the value of the the href same as <a href= "" >reddit</a>
  link.textContent = ""; // set the value of the text in the link



  // add the list item to the list of search results
  $("#results").append(div);
}


// **When the user enters a search term and presses enter (or clicks the button)**

// * The form / title / description should hide
// * Show a loading message (optional)
// * Fetch related posts from reddit (with ajax)
// * Display animation / slideshow of images (jQuery)
// * Show a button to stop / reset the animation
// * Repeat animation until user clicks "stop"

// console.log('Document is ready');

// $.get('https://www.reddit.com/search.json', {
//   q: 'kittens'
// }).done(function(data) {
//   console.log('AJAX is ready');
// });


// console.log('Just fired AJAX request!');
// * Prevent default and show an alert on form submit
// * Use AJAX to make a request. Show data in console
// * Create an array of image URLs (tip: use [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)).
// * Make the form / title / description hide
// * Cycle through images
//     * tip: use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)
//     * Maybe just set the src attribute of a single image tag for now
// * Add some interesting style / animation
// * Create button to stop animation (tip: use [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)).
