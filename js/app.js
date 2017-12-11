var redditData = []

$(function() {
  // attach the form submission to the search function
  $('#search-form').on('submit', search);
});
function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();
  clearSearchResults();
  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var userInput = $('#query').val() || 'puppies';
  $.get('https://www.reddit.com/search.json', {
  q: userInput,
  limit: 10
}).done(function(response) {
  redditData = response;
  addSearchResult(response.data.children);

  console.log(redditData);
});
}

// Clear previous search results.
function clearSearchResults() {
  $('#results').html('');
}

// Adds a single result object to the page.
function addSearchResult(results) {
  console.log(results);
  // setInterval()
for(var i = 0; i < results.length; i++){
  // Create a list item to contain the search result link
  var div = document.createElement('div');

  var img = document.createElement('img');
  
  img.src = results[i].data.thumbnail;
  // ul.href = results[i].data.ul;
  // put the link inside the list item.
  // $(li).append(a);
  console.log(img);
  $(div).append(img);
  $(div).addClass('myImage')
  // $(li).append(ul);

  // add the list item to the list of search results
  $('#results').append(div);

//   var results = $('#results');
// for(var i=0;i < results.length; i++) {
//     var arrValue = results[i];
//     console.log(arrValue);
//  }
}
}

// var x = $('img').src gets url
// setInterval(functionX(),











