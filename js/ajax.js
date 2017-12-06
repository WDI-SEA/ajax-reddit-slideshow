// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  //TO DO
  $("#search-form").on("submit", search);
    console.log('clicked!');
    var newSearch = $("#input").val();
  	 // Clear input box after item added
   	$("#input").val('');
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  // clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  //TO DO
  var userInput = $("#input").val() || "kittens";

  $.get('https://www.reddit.com/search.json', {
    q: userInput,
    limit: 10
  }).done(function(response) {
    addSearchResult(response.data.children);
  });
  clearSearchResults();
}

// Clear previous search results.
function clearSearchResults() {
  //TO DO
  $("#results").html('');
}

// Adds a single result object to the page.
function addSearchResult(results) {
	console.log(results);
	for(var i = 0; i < results.length; i++){
	  //TO DO
	  // Create a list item to contain the search result link
	  var li = document.createElement('li');
	  // create an anchor tag
	  var a = document.createElement('a');
	  var img = document.createElement('img');
	  a.href = results[i].data.url;
	  a.textContent = results[i].data.title;
	  img.src = results[i].data.thumbnail; 
	  img.style.height = 50;
	  img.style.width = 50;

	  // put the link inside the list item.
	  $(li).append(a);
	  $(li).prepend(img);

	  // add the list item to the list of search results
	  $("#results").append(li);
	}
}

///to make slideshow:
//loop through array of results, grab img url and in setInterval make the src of a img tag === the urls from results





  

