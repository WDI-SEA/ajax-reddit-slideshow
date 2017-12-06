var images = [];
$(function() {
  $("#search").on("submit", search);
});
function search(event) {
  event.preventDefault();
  console.log("search", $("#text").val());

  var userInput = $("#text").val();

	$.get('https://www.reddit.com/search.json', {
	    q: userInput, 
	  }).done(function(response) {
	    console.log(response.data.children);
	});
};