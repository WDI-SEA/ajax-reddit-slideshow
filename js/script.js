console.log("hello world!");

$("#imagebutton").on('click', function(){
	console.log("button clicked");

	$.ajax({
		url: "https://talaikis.com/api/quotes/random/",
		method: "GET"
	}).done(function(response){
		console.log("success", response);
		$("#title").text(response.author + " on " + response.cat);
		$("#message").text("\"" + response.quote + "\"");
		$("#message").css("font-style", "italic"); 
	}).fail(function(err){
		console.log("error", err);
	})
}); 