$(document).ready(function() {
	var searchResults = [];
	var counter = 0;
	var intervalId = 0;
	$("#submit").on("click", function(e){ 
		e.preventDefault();
		
		var webSite = "https://www.reddit.com/search.json?q="+$("#input").val()+"+nsfw:no";
		
		$.get(webSite).done(function(data) {
			searchResults = data;

			var children = searchResults.data.children;

			var hasUrl = function(object){
				if(object.data.url) {
					return true;
				}	else {
					return false;

				}

			};

			var filteredChildren = children.filter(hasUrl);
			 var images =filteredChildren.map(function(object) {
			 	return object.data.url;
			 });

			intervalId =setInterval(function() {
			$("#photos").html("").append('<img src="'+images[counter]+'">');

			counter ++;
			counter = counter % images.length;
			}, 3000);
		});

	});
		
	$("#stop").on("click", function(e) {
		e.preventDefault();
		clearInterval(intervalId);
		$("#input").val("");
		$("#photos").html("");
	});

	//show hide toggle on submit and stop buttons
	
	

});