$(document).ready(function() {
  // $.ajaxSetup({
  //   headers: {
  //     "Access-Control-Allow-Origin": true
  //   }
  // });
  //  create function to cycle through array of API data/img links and apply it to the #photo div
  var count = 0;
  var slideshow = function(pics) {
    $('#show').attr('src', pics[count]);
  };

  //  clears the textfield when clicked on
  $('#input').click(function(event) {
    $('#input').val('');
  });

  //  creat click event for when click on submit
  $('#search').click(function(event) {
    event.preventDefault();
    //  gets input value
    var input = $('#input').val();
    //  puts value in query
    $.get('https://www.reddit.com/r/pics/search.json', {
      q: input
    }).always(function(data) {
      //  hides the headers and submit button
      $('#hide').addClass('hide');
      var array = [];
      //  take data.data.children and if has property of preview, and images, loop through each images and push the url to the array
      data.data.children.forEach(function(element) {
        if (element.data.hasOwnProperty('preview') && element.data.preview.hasOwnProperty('images')) {
          element.data.preview.images.forEach(function(e) {
            array.push(e.source.url);
          });
        }
      });
      var intervalID = setInterval(function() {
        slideshow(array);
        if (count < array.length) {
          count++;
        } else {
          count = 0;
        } }, 4000);
    });
    $('#input').val('');
  });

  $('#reset').click(function(event) {
    $('#hide').removeClass('hide');
    $('#photo').html('');
  });
});
