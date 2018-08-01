console.log("script is working!")

document.addEventListener("DOMContentLoaded", function(){
	console.log("dom content loaded");
	
	$("button").click(function(){
		$.ajax({
			url: "https://www.reddit.com/search.json?=", 
			method: "GET",
			data: {q: $("#searchImage").val()}
		})
			.done(function(response){
				//console.log("success", response.data);
				response.data.children.forEach(function(post){
					console.log(post.data.url);
					$("img").attr("src", post.data.url);
				})
				//$("#imageBox").attr("src", response.url);
			})
			.fail(function(err){
				console.log("error", err);
			});
		$("#searchImage").val("");
	});
	
});


//build API search function
//build function to insert input value into API filter at click of button
//build function to display images found on reddit
//build function to switch images at some interval.


