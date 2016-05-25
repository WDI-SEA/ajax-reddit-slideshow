$(document).ready(function(){

var initializeCarousel = '<div id="myCarousel" class="carousel slide" data-ride="carousel"><div id="carouselContent" class="carousel-inner" role="listbox"></div><a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'

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
	      console.log(result.preview);
	      if (result.preview !== undefined) {
	      	imgResults.push(result);
	      };
	    }; 
	    if (imgResults.length === 0) {
	    	$('#results').html('<h3>No images results</h3>');
	    } else {
		    $('#results').html(initializeCarousel);
		    for (var i = 0; i < imgResults.length; i++) {
		    	addSearchResult(imgResults[i], i);
		    }
		    imgResults = [];
		};
	    // You must choose how to process the data that returns from the AJAX request
	    // and figure out how to display it on the page from here on out.
	  }).always(function() {
	  		$('#query').val('')
	  	});
	}

	// Clear previous search results.
	function clearSearchResults() {
	  $("#carousel").html("");
	}

	// Adds a single result object to the page.
	function addSearchResult(result, active) {
		
		var carouselItem = document.createElement("div");
		$(carouselItem).addClass('item');
		if (active === 0) {
			$(carouselItem).addClass('active');
		};

	  var img = document.createElement('img');
	  img.src = result.preview.images[0].source.url;

	  $(carouselItem).append(img);
	  console.log(carouselItem)

	  // add the list item to the list of search results
	  console.log('about to append item');
	  $("#carouselContent").append(carouselItem);
	  console.log('should have appended item');
	}
});