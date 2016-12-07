$(document).ready(function() {

	// HIDE STOP BUTTON ON LOAD
	$('#loading').hide();
	$('#stop').hide();

	$('#search-form').submit(function(event) {
		event.preventDefault();

		// HIDE SEARCH BAR AND DISPLAY SLIDESHOW AREA

		$('#search-form').hide();
		$('#reddit-logo').hide();
		$('#loading').show();
		$('#slideshow-imgs').show();
		$('#stop').show();

		var searchTerm = event.target.search.value;

		$.ajax({ 
			url: 'https://www.reddit.com/search.json?q=' + searchTerm,
			method: 'GET',
			success: returnImages,
			error: function(response) {
				console.log(response);
			}
		});


	// GET SEARCH RESULTS AND SHOW IMAGES

	function returnImages(response) {

		var slideshowImgs = [];
		var posts = response.data.children;
		var index = 0;

		posts.forEach(function(post) {
			if (post.data.preview) {
				slideshowImgs.push('<img src="' + post.data.preview.images[0].source.url + '">');
		    } 
		});

		console.log(slideshowImgs);


		// DISPLAY IMAGES IN SLIDESHOW

		var startSlideshow = setInterval(function() {
			$('#loading').hide();
			$('#slideshow-imgs').html('');
			$('#slideshow-imgs').append(slideshowImgs[index]);
			index++;
		}, 2500);


		// STOP SLIDESHOW BY CLICKING STOP BUTTON

		$("#stop").click(function () {
			clearInterval(startSlideshow);
			$('#search-form').show();
			$('#reddit-logo').show();
			$('#slideshow-imgs').hide();
			$('#stop').hide();
			$('#loading').hide();
			$('#search').val('');
		});

	}

	});

}); 
