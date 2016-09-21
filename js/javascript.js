$(document).ready(function(){ 

var count = 0; // Sets up the count for the related posts and slideshow images

var slideshowArray = []; // Array for the slideshow images

var setting; // Sets up the slideshow and makes it clearable

// When the search button is pressed...

$('#searchButton').on('click', function() {

	if (document.getElementById('textBox').value !== "") {
	$('#relatedPosts').empty();
	count = 0;
	slideshowArray = [];
	var textContent = $('#textBox').val();
	searchReddit(textContent + " nsfw:no");
	$('#textBox').val("");
	$('form').css('display', 'none');
	$('#stop').css("display", "initial");
	setting = setInterval(slideshow, 2500);

}

})

// When the stop button is pressed...

$('#stop').on('click', function(){
	clearInterval(setting);
	$('form').css('display', 'initial');
	$('#stop').css('display', 'none');
})

// Gets related posts and images for the slideshow

function searchReddit(term) {
$.get("https://www.reddit.com/search.json", { q: term
	}).done(function(post) {

	post.data.children.forEach(function(heading) {

		if (heading.data && heading.data.preview && heading.data.preview.images !== "undefined") {
		slideshowArray.push(heading.data.preview.images[0].source.url);
		}
		if (count == 0) {
			$('#relatedPosts').append("<h3> related posts </h3>");
		}
		if (count < 5) {
			$('#relatedPosts').append('<p class="related">' + "<a href='" + heading.data.url + "'>" + heading.data.title + "</a>" + '</p>');
		count++;
		} 

	})

	});

}

// Controls the slideshow

var slideshowCount = 0;

function slideshow() {
	$('#slideshow').empty();
	if (slideshowCount < slideshowArray.length) {
	$('#slideshow').append('<img class="slideshowImg" src="' + slideshowArray[slideshowCount] + '">');
	slideshowCount++;
	} 
	if (slideshowCount == slideshowArray.length) {
	slideshowCount = 0;
}

}

})