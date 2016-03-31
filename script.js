$(document).ready(function(){

var imgResults = [];
	$(function() {
	  var data = [];
	  var userQuery = undefined;
	  // attach the form submission to the search function
	  $("#search-form").on('submit', search);
	});

	function search(event) {
	  // Stop the form from changing the page.
	  event.preventDefault();

	  clearSearchResults();

	  // Get the users search input and save it in a variable.
	  // Use the input placeholder value (like "kittens") as a default value.
	  userQuery = $('#query').val();

	  console.log("searching for:", userQuery);

	  $.get('https://www.reddit.com/search.json', {
	    q: userQuery
	  }).done(function(response) {
	    results = response.data.children

	    for (var i = 0; i < results.length; i++) {
	      var result = results[i].data;
	      if (result.thumbnail && result.thumbnail !== 'self') {
	      	imgResults.push(result);
	      };
	    }; 
	    for (var i = 0; i < imgResults.length; i++) {
	    	addSearchResult(imgResults[i]);
	    }
	    imgResults = [];
	    // You must choose how to process the data that returns from the AJAX request
	    // and figure out how to display it on the page from here on out.
	  }).always(function() {
	  		$('#query').val('')
	  	});
	}

	// Clear previous search results.
	function clearSearchResults() {
	  $("#results").html("");
	}

	// Adds a single result object to the page.
	function addSearchResult(result) {

	  var div = document.createElement("div");
	  	console.log('div created')

	  var img = document.createElement('img');
	  	console.log(img)
	  img.src = result.url;
	  	console.log(img.src);

	  $(div).append(img);
	  	console.log(div);

	  // add the list item to the list of search results
	  $(".carousel-inner").append(div);
	}
});