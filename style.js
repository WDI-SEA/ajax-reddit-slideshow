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

		var results = response.data.children;
		for (i=0; i< results.length; i++) {
			if (!results[i].data.preview ){
				return;
			}
    	var result= results[i].data.preview.images[0].source.url;
	    addSearchResult(result);
	    console.log(result);
    }
 });
}
});

 var image = $('#query').val();
function addSearchResult(result) {
  var pictures = ('<img src="' + result + '">')
	$('#images').append(pictures);

}

 
