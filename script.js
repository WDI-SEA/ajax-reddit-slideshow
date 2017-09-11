var start = $("#startBtn");
var search = $("#seachBar");
var display = $("#slide-container");


// Set up the page when it loads.
// $(function() {
//   // attach the form submission to the search function
//   $("#search-form").on('submit', search);
// });

function search(event) {
  clearSearchResults(); 

  var userQuery = search.val() || input.attr("placeholder");

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery + "nsfw:no"
  }).done(function(response) {
    var results = response.data.children;
    var filtered = results.filter(function(result) {
    	return result.data.preview;
    	});
    for (var i = 0; i < results.length; i++) {
    	var result = results[i].data;
    	addSearchResult(result);
    }
  }).fail(function() {
    console.log("something failed");
})};

// Clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(result) {
  // Create a list item to contain the search result link
  var img = document.createElement("img");

  var link = document.createElement("img");
  link.href = result.url; // reset the value of the the href
  link.textContent = result.title; // set the value of the text in the link

  // put the link inside the list item.
  $(img).append(link);

  // add the list item to the list of search results
  $("#results").append(link);
}

start.click(function(){	
	display.fadeIn(1000);
	// display.setInterval(4000);
	display.fadeOut(1000);
});


// var function = startShow(){

// }