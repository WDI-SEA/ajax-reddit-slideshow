console.log("script is working!")

document.addEventListener("DOMContentLoaded", function(){
	console.log("dom content loaded");
	// $("#submit").on("click", function(e){
	// 	e.preventDefault();
	// 	addItem();
	// 	deleteButton();
	// 	removeItem();
	// 	clearInput();
	// 	strikeOut();
	$("button").click(function(){
		$.ajax({
			url: "https://www.reddit.com/search.json?=", 
			method: "GET",
			data: {q: $("#searchImage").val()}
		})
			.done(function(response){
				console.log("success", response);
			})
			.fail(function(err){
				console.log("error", err);
			});
		$("#searchImage").val("");
	});
	
});

function clearField(){
	$
}
//build API search function
//build function to insert input value into API filter at click of button
//build function to display images found on reddit
//build function to switch images at some interval.