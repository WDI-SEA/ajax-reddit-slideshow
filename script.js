var photos = [];



$(function() {
  $("#search-form").on('submit', search);
});

function search(event) {
  event.preventDefault();

  clearSearchResults();

  var input = $("#query");
  var userQuery = input.val()
  console.log("searching for:", userQuery);
  $.get('https://www.reddit.com/r/pics/.json').done(function(response) {
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
    for (i = 0; i < photos.length; i++) {
  $('#results').append("<img src= 'photos[i]'  onError="this.onerror = '';this.style.visibility='hidden';" >"));
  }
}


function clearSearchResults() {
  $("#results").html("");
}

function addSearchResult(result) {

  var img = document.createElement("img");



  $(".results").append(img);
}
