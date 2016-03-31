$(document).ready(function() {

	$("#Go_Button").on('click', search);
	var invalidEntries = 0;
	var imageArray = [];

	function search(event) {
  event.preventDefault();
 	var userQuery = $('#query').val() || input.attr("placeholder");
 	// console.log("searching for:", userQuery);

 	$.get('https://www.reddit.com/search.json', {
    q: userQuery
  	}).done(function(response) {
    console.log(response);

		function filterByID(obj) {
  		if (!obj.data.preview) {
    	return false;
 			 } else {
    	return true;
  		}
			}

		var raw_results = response.data.children;
		var results = raw_results.filter(filterByID);
		for (i=0; i< results.length; i++) {
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
// $("#Go_Button").click(function(){
//  		$("#h1").hide();
//     $('#p').hide();
//     $('#Go_Button').hide();
//     $('#query').hide();

// $("#show").click(function(){
//     $("p").show();
// });

 
