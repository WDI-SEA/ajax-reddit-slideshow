$(document).ready(function() {
  $('.reset').reset();
  $('#searchForm').submit(function(event) {
    event.preventDefault();

    // forms default is to refresh page, this stops that
    var searchTerm = event.target.search.value;
    var imageurl = [];
    var counter = 0;

    $.ajax({
      url: 'https://www.reddit.com/search.json?q=' + searchTerm,
      method: 'get',
      success: function(response) {
        $('#container').html('');
        // console.log(response);
        var images = response.data.children;
        images.forEach(function(image) {
          console.log(image.data.url);
          imageurl.push(image.data.url);
          // $('#container').append('<img src="' + imageurl[counter] + '">"');
        });
        console.log(imageurl);

        var slideshow = setInterval(function() {
          $('#container').html('<img class="image" src=' + imageurl[counter] + '>');
          counter = counter + 1;
        }, 3000);
        $('.reset').show();
        $('.reset').click(function() {
          console.log('clear interval');
          clearInterval();
        });
      },
      error: function(response) {
        console.log(response);
      }
    });
  });
});
