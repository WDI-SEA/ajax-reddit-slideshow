var userInput;
var pictures = [];
var i = 0;


$(document).ready(function() {

	$("form").on("submit", function (e) {
		e.preventDefault();
		userInput = $("input").val();
		$("input").val('')
		$.get("http://www.reddit.com/search.json", { q: userInput }).done(function(data) {
			//get images out of array of objects
			data.data.children.forEach(function(article) {
				//filter out posts without thumbnails
				if (article.data.thumbnail !== "self") {
					if (article.data.preview) {
						pictures.push(article.data.preview.images[0].source.url);
					} else if (article.data.media) {
						pictures.push(article.data.media.oembed.thumbnail_url);
					} else if (article.data.url.indexOf(".jpg") != -1) {
						pictures.push(article.data.url);
					} else if (article.data.url.indexOf(".png") != -1) {
						pictures.push(article.data.url);
					} else if (article.data.url.indexOf(".gif") != -1) {
						pictures.push(article.data.url);
					}
				}
			});
			//push array to slideshow
			console.log(pictures);
			pictures.forEach(function(imageLink) {
				$("ol.carousel-indicators").append('<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="active"></li>');
				console.log(i);
				$("div.carousel-inner").append("<div class='item active'></div>");
				$(".item.active").append("<img>");
			    i++;
			    console.log(i);
			});
			$("#carousel-example-generic").removeClass("hidden");
		});
	});
});