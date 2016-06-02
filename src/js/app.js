var newSearch;
var searchResults;

$(document).ready(function() {
  // $('#testButton').on('click', function(e) {
  //   e.preventDefault();
  //   alert('Button was tested, gov\'nuh!');
  // });
  $('#searchSubmit').on('click', function(e) {
    e.preventDefault();
    newSearch = $('#searchInput').val();
    $.get('https://www.reddit.com/search.json', {
      q: newSearch
    }).done(function(data) {
      searchResults = data;
      console.log(data);
    });
    $('#rules').text('');
  });
});

// Creating function to grab img's
// var findImages = function() {
//   if () {
//     var image = $('img').get()
//   }
// }

// Creating filter function
// var picsToDisplay = searchResults.filter()
