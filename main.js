var photos = [];



$(function() {
  $("#search-form").on('submit', search);
});

function search(event) {
  event.preventDefault();
  clearSearchResults();
  var input = $("#query");
  var userQuery = input.val() || input.attr("placeholder");
  console.log("searching for:", userQuery);
  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    console.log(response);

    var results = response.data.children;
    for (var i = 0; i < results.length; i++) {
      var result = results[i].data.url;
      photos.push(result);
      console.log(photos);
    }
    setInterval(function(){
      var index = 0;
      displayImage(photos[index]);
      index = index++;
    }, 3000);
  });
}






function displayImage(url){

  $('#results').append('<img src="'+url+'">')
}

// Clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(result) {
  // Create a list item to contain the search result link
  var img = document.createElement("img");



  // add the list item to the list of search results
  $(".results").append(img);
}


















































// // Set up the page when it loads.
// $(function() {
//   // attach the form submission to the search function
//   $("#search-form").on('submit', search);
// });

// function search(event) {
//   // Stop the form from changing the page.
//   event.preventDefault();

//   // Get the users search input and save it in a variable.
//   // Use the input placeholder value (like "kittens") as a default value.
//   var userQuery = undefined;


//   console.log("searching for:", userQuery);

//   $.get('https://www.reddit.com/search.json', {
//     q: userQuery
//   }).done(function(response) {
//     console.log(response);
//     response.data.children
//     // You must choose how to process the data that returns from the AJAX request
//     // and figure out how to display it on the page from here on out.
//     var allAuthors = response.data.children;
//     for (i=0; i<allAuthors.length; i++) {
//       var title= response.data.children[i].data.title;
//       $('#results').html('<li>'+title+'</li>');

//     }
//     addSearchResult();
//   });
// }

// // Clear previous search results.
// function clearSearchResults() {
//   $("#results").html("");
// }

// // Adds a single result object to the page.
// function addSearchResult(result) {
//   // Create a list item to contain the search result link
//   var li = document.createElement("li");

//   // create an anchor tag
//   var link = document.createElement("a");
//   link.href = "#"; // reset the value of the the href
//   link.textContent = ""; // set the value of the text in the link

//   // put the link inside the list item.
//   $(li).append(link);

//   // add the list item to the list of search results
//   $("#results").append(li);
// }
