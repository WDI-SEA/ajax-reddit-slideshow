$(function() {
var userChoice
var link
var currentPics
var picturesArray =[];

$(".submit").click(function(){
	userChoice = $(".userInput").val();
  	picturesArray = [];
	console.log(userChoice);
	$.get('https://www.reddit.com/search.json', {
  		q: userChoice,
  		limit: 100
	}).done(function(data){
  		var userImg = data;
  		var userObjects = userImg.data.children;
  	
  		for(var i = 0; i < userObjects.length; i++){
  			console.log("this happens")
    		findPics(userObjects[i]);
  		}
  		postToPage();

  		$(".userInput").addClass("hide");
  		$(".submit").addClass("hide");
  		$(".reset").removeClass("hide");

	}).fail(function(error){
 		console.log('there was an error. Im sorry');
	});
});


function findPics(urls) {
	link = urls.data.url;
	if (link.includes(".jpg" || ".png")) {
			picturesArray.push(urls.data.url);
	} else {
		return
	}
}

// NEEDS WORK. ADD SETINTERVAL

function postToPage(){
  var containerDiv = $('.slideshow');
  console.log(picturesArray)
  for (var i = 0; i < picturesArray.length; i++) {
  	setTimeout(function(){
  		for (var i = 0; i < picturesArray.length; i++) {
  			console.log(picturesArray[i])
  			$(".image").fadeOut("slow", function() {
  			$(".image").remove()
  		})
  			containerDiv.append('<img class="image" src='+ picturesArray[i] + '></a>');
  	};
  }, 2000);
  		};
};

$(".reset").click(function(){
	$(".userInput").removeClass("hide");
  	$(".submit").removeClass("hide");
  	$(".reset").addClass("hide");	
  	$(".userInput").val("");
});





})