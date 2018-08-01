document.addEventListener("DOMContentLoaded", function(){
	console.log("dom content loaded");
});
// Create your form (HTML/CSS)
// Prevent default form submission and verify that you can type something into the form
// Use AJAX to make a request. Show data in console
// Create an array of image URLs (tip: use filter and map).
// Make the form / title / description hide
// Cycle through images
// tip: use setInterval
// Either add images, or change the src of a single image tag
// Add some interesting style / animation
// Create button to stop animation (tip: use clearInterval).


$("#searchbutton").on('click', function(){
	console.log("button clicked");

	$.ajax({
		url: "https://www.reddit.com/search.json?",
		method: "GET"
		data: {q: $("#searchbox").val()}
	}).done(function(response){
		console.log("success", response.data.children);
		$("#image").url(response.data.children.data);
	}).fail(function(err){
		console.log("error", err);
	})
}); 
