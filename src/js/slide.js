//$(document).ready(function() {


/*
$('#slideshow').on('submit' , function(elem) {
  elem.preventDefault();
  var input = $('#inputspot').val();

  $.get('http://reddit.com/search.json', {
    q: '#inputspot'
  }).done(function(data) {
    console.log('done!');
});

.fail(function(data) {
  console.log('search failed');
})
}
*/

//Set up the page when it loads
$(function() {
// attach the form submission to the search function
$("#search-form").on('submit', search);
});

function search(event) {
  //stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  //get the users search input and save it in a variable.
  //use the input placeholder value (like "kittens") as default value
  var input = $("#query");
  var useQuery = input.val() || input.attr("placeholder");

  console.log("searching for:", useQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    console.log(response);

    var results = response.data.childern;
    for (var i = 0; i < results.length; i++) {
      var results = results[i].data;
      addSearchResults(result);
    }
  });
}

//clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

//adds a single result object to the page
function addSearchResult(result) {
  //create a list item to contain the search result link
  var li = document.createElement("li");

  //create an anchor tag
  var link = document.createElement("a");
  link.herf = result.url; // reset the value of the herf
  link.textContent = result.title; // set the value of the text in the link

  //put the link inside the list item
  $(li).append(link);

  //add the list item to the list of search results
  $("#results").append(li);

}
