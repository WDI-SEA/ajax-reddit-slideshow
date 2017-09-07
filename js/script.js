$(function() {
  $("#search-form").on('submit', search);
  $("#clear").hide();
});

function search(event) {
  event.preventDefault();

  var input = $("#query");
  var userQuery = input.val();
  var div = document.createElement("div");
  div.setAttribute("id", "slides");

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    $("#slidesContainer").append(div);
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
  $("#toggle").toggle();
  $("#clear").toggle();
  input.val("");
}


function addSearchResult(result) {
  var image = document.createElement("img");
  image.src = result;
  $("#slides").append(image);
};

function reset(){
  $("#toggle").toggle();
  $("#clear").toggle();
  $("#slides").html("");
  $("#slidesContainer").empty();

}
