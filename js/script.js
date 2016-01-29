var posts = {};
var counter = 0;
 
$("#stop").hide();

$(document).ready(function() {

	$("form").on("submit", function(event) {
		event.preventDefault();
		// console.log("button works");


			var searchTerm = $("#search-box").val();
			$.get("http://www.reddit.com/search.json?q=" + searchTerm + "+nsfw:no").done(function(data) {
				posts = data;
				// console.log(posts);

				// clear search term and hide form after search button clicked;
				$("form").hide();
				$("input").val("");

				// show stop button at start of slide show
				$("#stop").show();

				var searchResults = [];
				for (i = 0; i < posts.data.children.length; i++) {
					if (posts.data.children[i].data.thumbnail !== 'self') {
						searchResults.push(posts.data.children[i].data.thumbnail);
					} 
				}

				var slideshow = setInterval(function() {
					// console.log(searchResults);
				
						var image = '<img src="' + searchResults[counter] + '" class="img-responsive" alt="Responsive image">'
						console.log(image);
						$(".image-area").html(image);
						counter++;
						counter = counter % searchResults.length;

				}, 1000);

				$("#stop").on("click", function() {
					clearInterval(slideshow);
					$(".image-area").html("");
					$("#stop").hide();
					$("form").show();

				});


			});


	});
  
});






