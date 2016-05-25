$(document).ready(function() {

	$(function() {
		$("#search-form").on('submit', search);
	});

	function search(event) {
		event.preventDefault();

		var results = [];
		var showMeImagePls = [];
		var index = 0;

		userQuery = $('#query').val();

		$.get('https://www.reddit.com/search.json', {
			q: userQuery
		}).done(function(response) {
	    	
	    	response.data.children.filter(function (result) {
				if (result.data.preview && result.data.preview.images[0].source.url) {
					showMeImagePls.push(result.data.preview.images[0].source.url);
					console.log(showMeImagePls);
				}
			});

		    setInterval(function() {
					$('#images').html('<img src=' + showMeImagePls[index] + '>');
					index++;
					if (index >= images.length) {
						index = 0;
					}
			}, 2000);
		});
	}
});