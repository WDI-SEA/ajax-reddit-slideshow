// Some dangerous global arrays
var imageURLs = [];
var imageIndex = 0;
var currentImage;
var intervalID;

var stop = function(){
	clearInterval(intervalID);
	imageIndex = 0;
	$('#div_image').empty();

	var info = '<div id="div_info">'
			 + 'Type something in the box below. <br />'
			 + 'We\'ll scour reddit for pics and show you a slideshow.'
			 + '</div>';

	$('#div_image').append(info);
}

var cycleImage = function(){
	imageIndex++;
	if (imageIndex < imageURLs.length){
		currentImage[0].src = imageURLs[imageIndex];
		currentImage[0].alt = imageURLs[imageIndex];
	}
	else {
		stop();
	}
}

// Add an event listener
$("#form_search").submit(search);
$("form_stop").submit(stop);

function search(e) {
	event.preventDefault();
	stop();

	// Grab the search parameter
	if ($('#input_search').val() === ''){
		return;
	}
	var searchStr = $('#input_search').val() + ' nsfw:no site:i.imgur.com';

	// Do the search
	console.log('Starting search for ' + searchStr);
	$.get('https://www.reddit.com/search.json', {q: searchStr}).done(function(response){
		console.log(response);

		// Store the images urls
		for (var i = 0; i < response.data.children.length; i++) {
			var incomingString = response.data.children[i].data.url
			imageURLs.push(incomingString.replace('gifv','gif'));
		}

		console.log(imageURLs);

		$('#div_image').empty();

		currentImage = $('<img src="' + imageURLs[0] + ' alt="' + imageURLs[0] + '>"');

		$('#div_image').prepend(currentImage);
		$('#form_stop').css("display", "inline-block");

		imageIndex = 0;
		intervalID = setInterval(cycleImage, 5000);
	})
}


