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
    // console.log("reddit get request");
  }).done(function(response) {
    // console.log("reddit get request");
    $("#slideshow").append(div);
    var results = response.data.children;
    console.log(results);
    for (var i = 0; i < 100; i++) {
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
          height: 528,
          pagination: {
            active: true,
            effect: "slide",
          }
    });
  });
  $("#container").toggle();
  $("#reset").toggle();
  input.val("");
}


function addSearchResult(result) {
  var image = document.createElement("img");
  // img.setAttribute("id", "currentImg")
  image.src = result;
  $("#slides").append(image);
  // // $('#currentImg').on('click', function(){
  //   $('#currentImg').attr('src', img[i]+);
  // }
};

function reset(){
  $("#container").toggle();
  $("#reset").toggle();
  $("#slides").html("");
  $("#slideshow").empty();

}