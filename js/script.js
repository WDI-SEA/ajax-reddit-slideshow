$(document).ready(function() {

	var images = [];

	var counter = 0;


	

	$('button').on('click', function(e) { 
		var $input = $("#input").val();
		// console.log(input)
		e.preventDefault();
		// alert("I work");
		$.get("https://www.reddit.com/search.json?q", {
		q: $input

	}).done(function(data) {
		//console.log(data)
		images = data.data.children;
		// console.log(images)

		function filterByUrl(obj) {
			if (obj.data.url) {
				return true

			}
			else {
				return false
			}


		}
		var imagesFilter = images.filter(filterByUrl)
		// console.log(imagesFilter)
		var allImages = imagesFilter.map(function(obj) {
			return obj.data.url
		})
		
		
		function cycleImages() {
			$('#imagecontainer').html("<img src = " + allImages[counter] + ">");
			console.log(allImages[counter])
			counter++;
			if(counter >= allImages.length) {
			counter = 0;
			}
		};

		var myInterval = setInterval(cycleImages, 2000);


		})

	})

	});

	// $.get("https://www.reddit.com/search.json?q", {
	// 	q: 'cats'

	// }).done(function(data) {
	// 	// console.log(data)
	// 	images = data.data.children;
	// 	// console.log(images)

	// 	function filterByUrl(obj) {
	// 		if (obj.data.url) {
	// 			return true

	// 		}
	// 		else {
	// 			return false
	// 		}


	// 	}
	// 	var imagesFilter = images.filter(filterByUrl)
	// 	// console.log(imagesFilter)
	// 	var allImages = imagesFilter.map(function(obj) {
	// 		return obj.data.url
	// 	})
		
		
	// 	function cycleImages() {
	// 		$('imagecontainer').html(allImages[counter]);
	// 		counter++;
	// 		if(counter >= allImages.length) {
	// 		counter = 0;
	// 		}
	// 	};

	// 	var myInterval = setInterval(cycleImages, 2000);


	// 	})

	// })


















