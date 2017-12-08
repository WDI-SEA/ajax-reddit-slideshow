var resultsArr;
var interval;
var slideIndex;
var currentObject;
var currentThumbnail;
var currentHref;
document.addEventListener("DOMContentLoaded", function(event) {

$(function() {
  // attach the form submission to the search function
  $("#search-form").on("submit", search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();
 	//stopAndReset();
  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  // This works because userInput will return false if empty
  var userInput = $("#user-input").val() || "flerble";

  $.get('https://www.reddit.com/search.json', {q: userInput})
  	.done(function(response) {
    resultsArr = response.data.children;
    console.log(resultsArr);
  	if(resultsArr===[]) {
  		console.log("no results for", userInput);
  	}
  	else{
  		startSlideshow();
  	}
  });
}

function startSlideshow () {
	$("#search-form").css("display", "none");
	$("#slideshowBox").css("display", "block");
	slideIndex=0;
	interval = setInterval(slideChange, 1000);
}

function slideChange() {
	if(slideIndex<resultsArr.length) {
		currentObject = resultsArr[slideIndex].data;

		//assignThumbnail()
		currentThumbnail = currentObject.thumbnail;
		if(!currentThumbnail.includes("http")) {
			currentThumbnail="img/thumbnail_MIA.png";
		}


		//displayThumbnail()
		$("#image").attr("src", currentThumbnail);

		//set href to the right URL
		currentHref = currentObject.url;
		$("a").attr("href", currentHref);

		slideIndex++;
	}
	else {
		slideIndex = 0;
	}
}


function stopAndReset() {
	console.log("reset button clicked");
	clearInterval("interval");
	$("#search-form").css("display", "block");
	$("#slideshowBox").css("display", "none");
	$("#user-input").val("");
	resultsArr=[];
}

$("button").click(stopAndReset);
	
});
