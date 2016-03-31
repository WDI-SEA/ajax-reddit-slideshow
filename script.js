// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();


  var input = $("#query");
  var userQuery = input.val();

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: $("#query").val()
  }).done(function(response) {

    var results = response.data.children;

    for (var i = 0; i < results.length; i++) {
      var result = results[i].data.url;
      if (result) {
      	createSlideshow(result);
      }
 
    };
    startSlideshow();
    collapseSearchBar();
    returnSearchBar();

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

function clearSearchResults() {
  $("#results").html("");
}





// $('#myForm').submit(function(event) {
// 	event.preventDefault();
// 	alert("form submitted");
// });