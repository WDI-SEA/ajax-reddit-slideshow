$(document).ready(function() {

	$("#Go_Button").on('click', search);

var imageArray = [];

	function search(event) {
  event.preventDefault();
 	var userQuery = $('#query').val() || input.attr("placeholder");
 	// console.log("searching for:", userQuery);

 	$.get('https://www.reddit.com/search.json', {
    q: userQuery
  	}).done(function(response) {
    console.log(response);

		var results = response.data.children.preview;
		for (i=0; i<= results.children.length; i++) {
    	console.log(results[i].data.img);
    	} var result= results[i].preview.images[0].source.url;
	    addSearchResult(result)
	    console.log(result);
    });

	}
 });
// });

function addSearchResult(result) {
   var pictures = '<img src="' + result + '">'
		$('#images').append(pictures);
}
  // var li = document.createElement("li");

  // var link = document.createElement("a");
  // link.href = result.url; 
  // link.textContent = result.title; 
  // $(li).append(link);

  // add the list item to the list of search results
  // $("#results").append(li);
