//images stored in an array
var imgs =[]; 

$(function() {
	//attach form submit to a search function
	$("#search-form").on("submit", search);
});

function search(event) {
	//stop the default reload behavior of the form
	event.preventDefault();
	clearSearchResults();

	//grab userInput, save it as userInput
	//use babies as a search value
	var userInput = $("#query").val() || "babies";
	console.log("User Input was", userInput);

	$.get("http://www.reddit.com/search.json", {
	q: userInput,
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