$(function() {
  $("#search-form").on('submit', search);
  $("#clear").hide();
});

function search(event) {
  event.preventDefault();

  var input = $("#query");
  var userQuery = input.val();

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {

    var results = response.data.children;
    for (var i = 0; i < results.length; i++) {
      var arrayOfImages = [];
      if(results[i].data.hasOwnProperty('preview')){
        arrayOfImages.push(results[i]);
      }
      for(var j=0; j<arrayOfImages.length; j++){
        addSearchResult(arrayOfImages[j].data.preview.images['0'].source.url);
      }
    }
    $("#slides").slidesjs({
          width: 940,
          height: 528
    });
  });
  $("#toggle").hide();
  $("#clear").show();
}

function clearSearchResults() {
  $("#slides").html("");
}

function addSearchResult(result) {
  var image = document.createElement("img");
  image.src = result;
  $("#slides").append(image);
};

//i know this refresh  is shitty but when I had an actual refresh function I couldn't get it to
//remove the .slidejs() and reapply it to the new search
function reset(){
 location.reload();
}

