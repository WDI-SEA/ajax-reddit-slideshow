//
// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);

});
 var arrayImages = [];
function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var input = $("#query");
  var userQuery = input.val() //|| input.attr("placeholder");

  //console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    //debugger;
    //console.log(response);

    var results = response.data.children;
    for (var i = 0; i < results.length; i++) {
    	
    	if(results[i].data.hasOwnProperty('preview')){
    		arrayImages.push(results[i]);

    	}
    	for(var x = 0; x< arrayImages.length; x++){
    		addSearchResult(arrayImages[x].data.preview.images['0'].source.url);
    	}


    	/*var result = results[i].data;
    	addSearchResult(result);*/
    }
    debugger;
 /*   $("#pics").css({
    	"width": 600px,
    	"height": 600px,
    	"padding": 4px
    });*/

  });

  /*.fail(function() {
    console.log('something failed');
  });*/
}

// Clear previous search results.
function clearSearchResults() {
  $("#pics").html("");
}

// Adds a single result object to the page.
function addSearchResult(result) {
  // Create a list item to contain the search result link
  var image = document.createElement("img");

 
	image.src = result;

  $("#pics").append(image);
};



$('#pics').click(function() {
	var image = arrayImages[focusImg];
	focusImg++;
	if(focusImg > 3){
		focusImg = 0;
	}
	$('#pics').attr('src', image);
});


// if (posts[i].data.hasOwnProperty('preview')){}
//SLIDE SHOW
var catImgs = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"];

//var focusImg = 1;
var focusImg = 1;
$('#cat').click(function() {
	var image = catImgs[focusImg];
	focusImg++;
	if(focusImg > 3){
		focusImg = 0;
	}
	$('#cat').attr('src', image);
});
//practice 
/*$("button").css("background-color", "yellow");
$("ul li.one").css("background-color", "pink");
$("#randstuff ~ h4,h5").css("background-color", "green");
$("#practice > *").css("font-style", "italic");
$("li a[href$='jpg']").css("background-color", "yellow");*/



//the cat slide show at the bottom is how I want the slide show to work but I can't seem to pull the images from the arrayImage 