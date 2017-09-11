
// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var input = $("#query");
  var userQuery = input.val() || input.attr("placeholder");

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    console.log(response);

    var results = response.data.children;
    var isImage =[];
    console.log(results);
    for (var i = 0; i < 10; i++) {
      var result = results[i].data;
      var isImage = results[i].data.filter(function(x){
        return x.preview.enabled === true;
      });
      console.log(isImage);
      addSearchResult(result);
      // if (result.preview.enabled === true) {
      //   isImage.push(result);
      // }
      // console.log(isImage);
    }
    // if (results[i].data.hasOwnProperty('preview')){
    //     isImage.push(results[i]);
    //   }
    //   console.log(isImage);
  });
}

// Clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(result) {
  // Create a list item to contain the search result link
  var li = document.createElement("li");

  // create an anchor tag
  var link = document.createElement("img");
  link.src = result.url; // reset the value of the the href
  link.textContent = result.title; // set the value of the text in the link

  // put the link inside the list item.
  $(li).append(link);

  // add the list item to the list of search results
  $("#results").append(li);
}