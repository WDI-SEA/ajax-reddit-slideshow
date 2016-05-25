// Set up the page when it loads.
$(document).ready(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);

  $('.owl-carousel').owlCarousel();

  
});

function search(event) {
  event.preventDefault();
  clearSearchResults(); // Clear previous search results.

  var userQuery = $(this).children('#query').val()
  console.log("searching for:", userQuery);
  $.get('https://www.reddit.com/search.json', {
    q: userQuery + " nsfw:no"
  }).done(displayResults);
}

function displayResults(response) {
  var results = response.data.children;
  // console.log(results[0].data.preview);
  // addSearchResult(results[0])

  results.forEach(addSearchResult);
}

function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(result) {

  // console.log(result.data.preview.images[0].source.url);
  // Create a list item to contain the search result link
  var li = document.createElement("li");
  var div = document.createElement("div")

  // create an anchor tag
  var link = document.createElement("a");
  link.href = result.data.url; // reset the value of the the href
  link.textContent = result.data.title; // set the value of the text in the 
  var img = document.createElement("img");
  
  var url = ''
  if (result.data.preview) {
    url = result.data.preview.images[0].source.url;
  } else if (result.data.media) {
    url = result.data.media.oembed.thumbnail_url;
  }
  img.src = url;

  // put the link inside the list item.
  $(li).append(link);
  // $(li).append(img);
  $(div).append(img);

  // add the list item to the list of search results
  //$("#results").append(li);

  $('.owl-carousel').owlCarousel('add', div).owlCarousel('refresh');

}
