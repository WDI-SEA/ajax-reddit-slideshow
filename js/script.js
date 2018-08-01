

$(document).ready(function() {
	
	console.log("Hello World");

	var slideshowPix = [];

	
	//function redditQuery() {
		//var userQuery = document.getElementById("user-search").value;
		$.ajax({
			url: "https://www.reddit.com/search.json",
			method: "GET",
			data: {
				q: "dinosaur costume"
			}

		}).done(function(response){
			console.log("response.data", response.data);
			response.data.children.forEach(function(post){
				if (post.data.url.includes(".jpg")) {

				console.log(post.data.title);
				//console.log(post.data.url);
				slideshowPix.push(post.data.url);

				};
				console.log(slideshowPix);
			})	

		}).fail(function(err){
			console.log("error", err);
		});
	//};

    function slideShow() {
    	var current = 0;
    	var imgDuration = 3000;
        document.getElementById("img1").src = slideshowPix[current];
        current++;
        if (current == slideshowPix.length) { current = 0; }
        setTimeout("slideShow()", imgDuration);
    };

	$("button").click(function(){
			console.log("click happened");
			//redditQuery();
			slideShow();
	});



});
