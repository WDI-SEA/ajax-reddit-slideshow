// var slideIndex = 0;
// showSlides();
// Set up the page when it loads.
$(function(){
  // attach the form submission to the search function
  $('#search-form').on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var userInput = $('#query').val() || 'soccer';
  $.get('https://www.reddit.com/search.json', {
  q: userInput,
  limit: 5
}).done(function(response) {
  addSearchResult(response.data.children);
});
}

// Clear previous search results.
function clearSearchResults() {
  $('#results').html('');
  // document.getElementById('results').value = ''
}

// Adds a single result object to the page.
function addSearchResult(results) {
  for(var i=0; i < results.length; i++){
    // if(results[i]data.thumbnail === 'nsfw' || results[i]data.thumbnail === 'default' || results[i]data.thumbnail === 'self'){
    //   return;
    // }
  //TO DO
  // Create a list item to contain the search result link
  var li = document.createElement('li');
  var img = document.createElement('img');
  // create an anchor tag
  // var a = document.createElement('a');
  // a.href = results[i].data.url;
  // a.textContent = results[i].data.title;
  img.src = results[i].data.thumbnail;
  img.style.height = 60;
  img.style.width = 60;
  // put the link inside the list item.
  // $(li).append(a);
  $(li).append(img);
  // add the list item to the list of search results
  $('#results').append(li);
  }
}
