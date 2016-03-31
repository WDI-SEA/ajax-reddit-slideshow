$(document).ready(function() {

$(function() {
	$("#search-form").on('submit', search);
});

function search(event) {
	event.preventDefault();

	var results = [];
	var imageArray = [];
	var counter = 0;

	userQuery = $('#query').val();

	$.get('https://www.reddit.com/search.json', {
		q: userQuery
	}).done(function(response) {
		//console.log(response.data.children[0].data.preview.images[0].source.url);

		//var results = response.data.children;
    	//console.log(results);
    	
    	response.data.children.filter(function (result) {
			if (result.data.preview && result.data.preview.images[0].source.url) {
				imageArray.push(result.data.preview.images[0].source.url);
				console.log(imageArray);
				//return true;
			}

			

		});
	
	
	    setInterval(function() {
				$('#images').html('<img src=' + imageArray[counter] + '>');
				counter++;
				console.log(counter);
				if (counter >= imageArray.length) {
					counter = 0;
				}
		}, 2000)	


			//$('#search').replaceWith('#results');

			

	});
}

});