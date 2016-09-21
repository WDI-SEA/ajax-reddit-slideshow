$(document).ready(function(){

console.log("Hello!");

/***********************************************
Search Function: 
***********************************************/

function search(event) {
  // Stop the form from changing the page.
  //event.preventDefault();

  // Get the users search input and save it in a variable.
  var input = $("#searchText").val();
  
  console.log("searching for:", input);

  $.get('https://www.reddit.com/search.json', {
    q: input
  }).done(function(response) {

  	console.log(response.data.children);

  		var arrayOfImages = [];
  		//Get the image url's from the reddit posts
  		for(var i = 0; i < response.data.children.length; i++) {
  			arrayOfImages[i] = response.data.children[i].data.thumbnail;
  		}

  		console.log(arrayOfImages);

  		var realImages = [];
  		//check the url's to make sure they're legit
  		arrayOfImages.forEach(function(imageURL){
  			if(imageURL != "self" && imageURL != "" && imageURL != "default") {
  				realImages.push(imageURL);
  			}
  		})

  		console.log(realImages);

  		//Add the images as li's to the slideShow ul
  		for(var j = 0; j < realImages.length; j++) {
  			var listItem = "<li><img src='" + realImages[j] + "'/></li>";
  			$(".slideShow").append(listItem);
  		}

  		arrayOfImages = [];
  		realImages = [];


  		console.log($(".slideShow"));

  });
}

/**********************************************
run search function when button is clicked
************************************************/

$("#searchButton").click(function(){
	search();
});





//end of javascript/jQuery
});