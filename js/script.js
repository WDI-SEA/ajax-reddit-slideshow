console.log("Hello World");

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
		console.log(post.data.url);
		var newDiv = $("<div></div>").html("<img src=\"" + post.data.url + "\">");
		$("body").append(newDiv);	
		};
	})	
}).fail(function(err){
	console.log("error", err);
});
