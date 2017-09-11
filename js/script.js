$(function() {
  $("#startform").on('submit', search);
  $("#reset").hide();
});

function search(event) {
  event.preventDefault();

  var input = $("#user-input");
  var userQuery = input.val();
  var div = document.createElement("div");
  div.setAttribute("id", "slides");

  $.get('https://www.reddit.com/search.json', {
    q: userQuery +"/nsfw:no" 
  }).done(function(response) {
    $("#slideshow").append(div);
    var results = response.data.children;
    for (var i = 0; i < results.length; i++) {
      var imageArray = [];
      if(results[i].data.hasOwnProperty('preview')){
        imageArray.push(results[i]);
      }
      for(var j=0; j<imageArray.length; j++){
        addSearchResult(imageArray[j].data.preview.images['0'].source.url);
      }
    }
    $("#slides").slidesjs({
          width: 940,
          height: 528
    });
  });
  $("#container").toggle();
  $("#reset").toggle();
  input.val("");
}


function addSearchResult(result) {
  var image = document.createElement("img");
  image.src = result;
  $("#slides").append(image);
};

function reset(){
  $("#container").toggle();
  $("#reset").toggle();
  $("#slides").html("");
  $("#slideshow").empty();

}