//assign variables
var newArry = ""
var img = ""
var lastImageIndex = 0
// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $('#search-form').on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var userInput = $('#query').val() || 'kittens'; 
  $.get('https://www.reddit.com/search.json', {
    q: userInput,
    limit: 10
    }).done(function(response) {
      console.log(response.data.children);
      newArry=response.data.children;
      setInterval(showImage, 3000); //takes show image function from below and 
  });
}

//shows thumbnail image by naming the new array index and then adding one 
function showImage(){
	img=newArry[lastImageIndex].data.thumbnail; //makes array live in the new index
	$("#results").html("<img src=\"" + img +"\">" ); //adds image tag to the html where the image will live when it is displayed
	lastImageIndex++ //adds one to the index
}
  



// Clear previous search results.
// function clearSearchResults() {
//   $('#results').html(''); //this will clear the search results
//   // document.getElementById('results').value = '';


// // Adds a single result object to the page.
// function addSearchResult(results) {
//   for(var i = 0; i < results.length; i++) {
//     console.log(results[i].data.thumbnail);


//     // Create a list item to contain the search result link
//     // var li = document.createElement('li');
//     // create an anchor tag
//     //var a = $('<a>')

//      // create a link
//      // var a = document.createElement('a');
//      // a.href = results[i].data.url;
//      // a.textContent = results[i].data.title; 

//      // checking for a bad image
//      // if (results[i].data.thumbnail === 'nsfw' || results[i].data.thumbnail === 'default' || results[i].data.thumbnail === 'self'){
//      // 	return;
//      // }

//      // create an image
//      var image = document.createElement('img');
//      	image.src = results[i].data.thumbnail;
//      	image.style.height = 200;
//      	image.style.width = 200;
//     // put the link inside the list item.
//     // $(li).append(image);
//     // $(li).append(a);
//     // add the list item to the list of search results
//     //appends results from reddit to page
//     // $('#results').append(image);
//   }
// }


	
// // }




