console.log("Javascript Linked");
//Set up the page when it loads
$(function() {
//Attach the Form submission to the search function
$("#slideshow-form").on('submit', search);
});

function search(event) {
	//Stop the form from changing the page
	event.preventDefault();
	clearSearchResults();
	/* Get the users input and save it in a variable.
	Use the input placeholder value (attribute in input on 
	html) as a default */
	var input = $("#query");
	var userQuery = input.val() || input.attr("placeholder");
	console.log("Searching for:", userQuery);

	$.get('https://www.reddit.com/search.json', {
		q: userQuery
	}).done(function(response) {
		console.log(response);
		var results = response.data.children;
		for (var i = 0; i < results.length; i++) {
			var result = results[i].data;
			addSearchResult(result);
		}
	}).fail(function() {
		alert("Uh oh, something went wrong. Try again?");
	});
}
//Clear previous search results
function clearSearchResults() {
	$("#results").html("");
}
//Adds a single result object to the page
function addSearchResult(result) {
	//Create a list item to contain the search result link
	var li = document.createElement("li");

	//Create an anchor tage
	var link = document.createElement("a");
	link.href = result.url; //Reset the value of the href
	link.textContent = result.title; //Se tthe value of the text in the link

	//Put the link inside the list item
	$(li).append(link);

	//Add the list item to the list of search results
	$("#results").append(li);
}
