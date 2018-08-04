

$(function() {
  $("#searchInput").on('submit', search);
});

function search(event) {
  event.preventDefault();
  clearResults();
  $('.top').hide();
  var input = $("#query");
  var userQuery = input.val();
  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery + '+nsfw:no'
  }).done(function(response) {
    console.log(response); // object of all the things
    var results = response.data.children;
    var filteredResults = results.filter(function(result) {
      return result.data.preview; // filtered by preview
    });
    console.log(filteredResults);
    var pictureUrls = filteredResults.map(function(result){
      return result.data.preview.images[0].source.url //array of just urls of the results
    });
    for (var i=0; i < pictureUrls.length; i++) {
      displayResults(pictureUrls[i]);
    }
    console.log(pictureUrls);

    $(function(){
      $("#slides").slidesjs({
        width: 940,
        height: 528
      });
    });
  });
};

var displayResults = function(url) {
      var image = document.createElement("img");
       image.src = url;
       $("#slides").append(image);
};


function clearResults() {
  $("#slides").html("");
  $('.top').show()
};

$('#clear').on('click', clearResults);


