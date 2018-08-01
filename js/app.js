

console.log("app.js is working for reddit slideshow");


$(".getImage").click(function(){

	console.log("click go is clicked");
	$.ajax({
		url: "https://www.reddit.com/search.json",
		method: "GET",
		data: {
			category: "Puppies + images"

		} 
	}).done(function(response){
		console.log("success", response);
		response.data.children.forEach(function(post){
			console.log(post.data.title);
		})
	// You can always print it in the console:
	console.log("Today is an interesting day")

}).fail(function(err){
	console.log("error", err);
});


//$.get("https://www.reddit.com/search.json")
//.done()
//$.getJSON("http://www.reddit.com/r/pics/.json?jsonp=?", function(data) { 
    // $.each(data.data.children, function(i,item)
    //  {
    //      $("<img/>").attr("src", item.data.url).appendTo("#images");
    //  }
    // );
//});

});