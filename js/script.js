$(document).ready(function() {
	$('#reset').hide();
	$('#searchBar').on('submit', function(e) {
		e.preventDefault();
		$('.pageStart').hide();
		$('#reset').show();
		var $searchRequest = $('#searchBar input').val();
		
		var recycle = 0;
		
		$.get('https://www.reddit.com/search.json?q=' + $searchRequest +'+nsfw:no').done(function(data) {

			var results = data.data.children

			// Getting objects from Reddit
			var getImages = function(url) {
				if (url.data.url !== '') {
					return url.data.url;
				} else {
					return false;
				}
			}

			// Filtering getImages -> returning objects w/ image url's
			var filteredImages = results.filter(getImages);

			// Gets url from objects w/ images
			var images = filteredImages.map(function (object) {
				return "<img src='" + object.data.url + "'>";
			});
			
			// Cycles through images
			function cycleImages() {
				$('#slideImages').html(images[recycle]);
				recycle++;
				recycle = recycle % images.length;
			}

			// Sets interval time for slideshow
			cycleImages();
			var intervalImages = setInterval(cycleImages, 3500);

			// Resets page to original state
			$('#reset').on('click', function () {
				images = '';
				$('#slideImages').html('');
				$('#input').val('');
				$('.pageStart').show();
				$('#reset').hide();
			});
		});
	});
});