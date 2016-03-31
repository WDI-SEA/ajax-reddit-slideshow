//stolen from Steve's code

$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();
  clearSearchResults();


//data.children.preview

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var input = $("#query")
  var userQuery =  input.val();
  var imArr = [];

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    console.log(response);
    
  var results = response.data.children; 
  for(var i=0; i < results.length; i++) {
      var imageURL = results[i].data.url;
      imArr.push(imageURL);
      console.log(imArr);
      addSearchResult(imageURL);
    } 
  });
}

// Clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(imageArray) {
 for (i = 0; i < imageArray.length; i++) {
   var eachImage = imageArray[i];
   var html = '<img src="' + eachImage + '"/>';
   $('#slideshow').append(html);
 }
}


//hides button and input
$('input[name=pressMe]')
.click(function (){
   $(this).parent().fadeOut();
   $(this).fadeOut();
  });


// $(window).load(function(){
// $('#dvLoading').fadeOut(2000);
// });
// loading stuff
