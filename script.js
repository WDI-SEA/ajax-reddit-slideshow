// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var input = $("#query");
  var userQuery = input.val();

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: $("#query").val()
  }).done(function(response) {

    var results = response.data.children;
    // var hasImages = function() {
    // 	return 
    // }

    for (var i = 0; i < results.length; i++) {
      var result = results[i].data.url;
      // var hasImages = results[i].data.domain;
      if (result) {
      	//console.log(result);
      	createSlideshow(result);
      	// createSlideshow(result);
      }
      
      // addSearchResult(result);
    };
    startSlideshow();
    collapseSearchBar();
    returnSearchBar();
    
    // You must choose how to process the data that returns from the AJAX request
    // and figure out how to display it on the page from here on out.
  });
}

var newImages = [];
	var createSlideshow = function(result) {
		var newArray = newImages.push(result);
		console.log(newImages);
	}

var counter = 0;

var startSlideshow = function() {
	setInterval(changeImage, 4000);
	if (counter > newImages.length) {
		return;
	}
}

var changeImage = function() {
	$("#slide").attr("src", newImages[counter]);
	console.log(counter);
	counter++;
}

var collapseSearchBar = function() {
	$('#search-form').fadeOut(); 
}

var returnSearchBar = function() {
	$('#slide').on('click', function() {
		$('#search-form').fadeIn();
	})
}

// // Clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

// // Adds a single result object to the page.
// function addSearchResult(result) {
//   // Create a list item to contain the search result link
//   var li = document.createElement("li");

//   // create an anchor tag
//   var link = document.createElement("a");
//   link.href = result.url; // reset the value of the the href
//   link.textContent = result.title; // set the value of the text in the link

//   // put the link inside the list item.
//   $(li).append(link);

//   // add the list item to the list of search results
//   $("#results").append(li);
// }



// $('#myForm').submit(function(event) {
// 	event.preventDefault();
// 	alert("form submitted");
// });