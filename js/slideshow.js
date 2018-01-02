//images stored in an array
var imgs =[];
var searchResults = {};

$(function() {
	//attach form submit to a search function
	$("#search-form").on("submit", search);
});

$("#stop").click("click", function(){
	clearSearchResults();
	$("#search=
	searchResults = {};
	imgs =[];

});

function search(event) {
	//stop the default reload behavior of the form
	event.preventDefault();
	$("#loading").text("Loading");
	$("#search-bar").addClass("searching");
	$("#stop").addClass("searching");
	$("#slideshow").addClass("searching");
	//grab userInput, save it as userInput
	//use babies as a search value
	var userInput = $("#query").val() || "babies";
	console.log("User Input was", userInput);

	$.get("http://www.reddit.com/search.json", {
		q: userInput + "nsfw:no",
		limit: 10
	}).done(function(response){
		console.log(response.data.children);
		// addSearchResult(response.data.children);
	});
}

//clear the results when I hit search again
function clearSearchResults(){
	$("#results").html("");
}