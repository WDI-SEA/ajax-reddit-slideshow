$(document).ready(function() {

var searchResults = [];
var imageArray = [];
var testImage;
var counter = 0;
var searchTerm;

//Get search term from user form
$('#search-form').submit(function(e) {
	e.preventDefault();
	searchTerm = $('#search-term').val();

//AJAX request to Reddit
$.get('https://www.reddit.com/search.json', {
	q: searchTerm
	}).done(function(data) {
	searchResults = data
		// console.log(searchResults.data.children);
	
//Filter search results to exclude those without images
	searchResults.data.children.filter(function (child) {
		if (child.data.preview) {
			imageArray.push(child.data.preview.images[0].source.url);
			// console.log(imageArray);
		}
		else {
			alert('Sorry, no pics available');
		}
	});
	
//setInterval to display images
	setInterval(function() {
		$('#images').html('<img src=' + imageArray[counter] + '>');
		counter++;
		if (counter >= imageArray.length) {
			counter = 0;
		}
	}, 1000)
	$('#search-page').replaceWith('#results-page');

	});
	// // imageArray = '"' +  searchResults.data.preview.images[0].source.url + '"';
	// testImage = '"' +  imageArray[5] + '"';
	// // 	console.log(testImage);
	// $('#image').html('<img src=' + testImage + '>');
});
});
