var picArray, currentIndex, interval;

$(document).ready(function() {
	
	console.log("Hello World");

	$("#submit-form").submit(function(e){
		e.preventDefault();
		console.log("form submitted");
		var searchText = $("#search-box").val();
		if(searchText){
			console.log("You typed in", searchText)
			$("#search-box").val("");
			getData(searchText);
		} else {
			console.log("Please enter a search term")
		};
	
	});

	$("#stop").click(function(){
		console.log("stop button clicked");
		clearInterval(interval);
	});

});

function getData(searchText) {
	$.ajax({
		url: "https://www.reddit.com/search.json",
		method: "GET",
		data: {
			q: searchText,
			limit: 100

		}
	}).done(function(response){
		picArray = [];
		currentIndex = 0;
		console.log("success", response.data);
		response.data.children.forEach(function(post){
			if(post.data.post_hint === "image"){
			
			console.log(post.data.title);
			console.log(post.data.url);
			picArray.push(post.data.url);
		}

		}) 
		console.log(picArray);
		interval = setInterval(switchPic, 2000);
	}).fail(function(err){
		console.log("error", err);
	})
}


function switchPic(){
	console.log("switching picture");
	if(currentIndex >= picArray.length){
		currentIndex = 0;  //loops through the array from the beginning again
	}
	console.log("current image is", picArray[currentIndex]);
	var newImg = $("<img src ='" + picArray[currentIndex] + "''>");
	$("#results").empty().append(newImg);
	currentIndex ++;
}



