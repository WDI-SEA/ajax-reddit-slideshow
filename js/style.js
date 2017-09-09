var getClick = $("#userClick");
var selectDiv = $("div");
var imageHolder = [];

$(function() {
	getClick.on("click", search); //define search() as the function that performs the search...
});
	
//function queries the api and returns an array imageHolder array with images
function search(event) {
	var getInput = $("#userInput").val(); 
	console.log("search for ", getInput);
	//run the .get business
	$.get('https://www.reddit.com/search.json', {
		q: getInput 
	}).done(function(response) { 
		imageHolder = []; //declare local so it refreshed every search
		var results = response.data.children; 
		for (i=0; i<results.length; i++) {
			var thumbnail = results[i].data.thumbnail;
			if (thumbnail === "self" || thumbnail === "image" || thumbnail === "default") { //check for thumbnail content
				//console.log("no thumbnail content");
			} else {
				//console.log(thumbnail);	
				imageHolder.push(thumbnail); //put all of the images into the imageHolder array
			}
		}
		console.log("after loop", imageHolder.length);
		playImages();
	}).fail(function() {
		console.log("something failed");
	});
	//console.log(imageHolder.length);
}

//playImages();
//make the images appear in the div every couple seconds
function playImages() {
	var i = 0;
	setInterval(function(){
		if (i<imageHolder.length) {
			selectDiv.css("background-image", "url(" + imageHolder[i] + ")");
			i++;
		} else {
			console.log("done");
		}
	}, 3000);
}




