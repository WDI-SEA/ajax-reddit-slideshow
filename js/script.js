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
  var userQuery = input.val();

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    console.log(response);

    var results = response.data.children;
    for (var i = 0; i < results.length; i++) {
      // var imageArray = [];
      if (results[i].data.hasOwnProperty('preview')) {
       var url = results[i].data.url;
       $('#content').append("<img src='" + url + "'>");
      }
    }

    $("#content").slidesjs( {
      pagination: {
        active: false
      },
      play: {
        interval: 3000,
        auto: true
      },
      width: 940,
      height: 528
    });

  });
}

function clearSearchResults() {
  $("#results").html("");
}

$('#reset').on('click', function(event){
  location.reload();
})

$(document).ready(function(){
  $('#hideshow').on('click', function(event) {
    $('#container').toggle('show');
  })
})