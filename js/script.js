//Global Variables
var picArray, currentIndex, interval;

// Gut checks - shit is working
$(document).ready(function() {
	console.log("app.js is loaded and is using jquery");

	$("#submit-form").submit(function(e){
		e.preventDefault(); 
		console.log("form submitted"); 


		var searchTerm = $("#search-box").val(); 
		if(searchTerm){
			console.log("you typed in", searchTerm);
		//this clears the text box
			$("#search-box").val("");
			getData(searchTerm);
		}
		else{
			console.log("please enter something");
		}
	});

	$("#stop").click(function(){
	console.log("stop button was clicked");
	clearInterval(interval); 
	$("#results").empty();
	});
}); 

//Ajax call to reddit search API requesting method and data
function getData(searchTerm) {
	$.ajax({
		url: "https://www.reddit.com/search.json",
		method: "GET",
		data: {
			q: searchTerm, 
			nsfw: "no",
			limit: 10
		}
	}).done(function(response){

		picArray = response.data.children.filter(function(post){
			return post.data.post_hint === 'image';
		})
		picArray = picArray.map(function(post){
			return post.data.url;
		});
		currentIndex = 0;
		console.log(picArray);

		interval = setInterval(switchPic, 2000);
	}).fail(function(err){
		console.log("error", err); 
	});
}

function switchPic(){
	console.log("switching picture");
//if we are at the end of the array, start at beginning again
	if(currentIndex >= picArray.length){
		currentIndex = 0; 
	}

	console.log(currentIndex, "current image is", picArray[currentIndex]);

	//to do: show pic in dom
	var newImg = $('<img src="' + picArray[currentIndex] + '">');
		$("#results").empty().append(newImg);

	currentIndex++; 
}








//my old code
// $("#searchbutton").on('click', function(){
// 	console.log("button clicked");

// 	$.ajax({
// 		url: "https://www.reddit.com/search.json?",
// 		method: "GET"
// 		// data: {q: $("#searchbox").val()}
// 	}).done(function(response){
// 		console.log("success", response.data.children);
// 		$("#image").url(response.data.children.data);
// 	}).fail(function(err){
// 		console.log("error", err);
// 	})
// }); 
