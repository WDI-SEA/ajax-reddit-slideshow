var userInput = "";
var pictures = [];
var i = 0;




$(document).ready(function() {

	$("form").on("submit", function (e) {
		userInput = "";
		i = 0;
		pictures = [];
		$("div.carousel-inner").html('');
		$("ol.carousel-indicators").html('');
		userInput = $("input").val();
		$("input").val('')
		e.preventDefault();
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
			for (var x = 0; x < pictures.length; x++) {
				console.log(pictures);
				$("ol.carousel-indicators").append('<li data-target="#carousel" data-slide-to="' + x + '" class="active"></li>');
				console.log(i);
				if (x === 0) {
					$("div.carousel-inner").append('<div class="item active"><img src="' + pictures[0] + '" alt="' + userInput + ' ' + x + '"></div>');
				} else {
					$("div.carousel-inner").append('<div class="item"><img src="' + pictures[x] + '" alt="' + userInput + ' ' + x + '"></div>');
				}
			    console.log(x);
		    }
			$("#carousel").removeClass("hidden");
		});
	});
	$("#clear").on("click", function() {
		$("#carousel").addClass("hidden");
	});
});