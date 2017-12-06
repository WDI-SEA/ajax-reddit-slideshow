var imgArray = []
var redditData =


$(function() {
  $('#search-form').on('submit', search);
});
function search(event) {
  event.preventDefault();
  clearSearchResults();
  var userInput = $('#query').val() || 'puppies';
  $.get('https://www.reddit.com/search.json', {
  q: userInput,
  limit: 25
}).done(function(response) {
  redditData = response;
  addSearchResult(response.data.children);
});
}

function clearSearchResults() {
  $('#results').html('');
}

function addSearchResult(results) {
for(var i = 0; i < results.length; i++){
  var div = document.createElement('div');
   var a = document.createElement('a');
  var img = document.createElement('img');


  img.src = results[i].data.thumbnail;



  $(div).append(img);
  $(div).addClass('myImages');

  $('#results').append(div);

}
}

// 