var i = 0;
var imageTimer = null;
var imageUrls = [];

var slideshow = function () {
  $('#picture').attr('src', imageUrls[i]);
  i++;
  if (i > imageUrls.length) {
    i = 0;
  }
};

var crawl = function () {
  var searchString = $('#searchbox').val();
  $.get('https://www.reddit.com/search.json', {
      q: searchString   // search string for results, when DONE, next function starts
  }).done( function(data) {           //store results in an array from children
     var results = data.data.children;
     results.forEach(function(item) {
         if (item.data.thumbnail.indexOf("reddit") != -1) {
             imageUrls.push(item.data.thumbnail);
         };
     }); 
     $('.container').addClass('hide');
     $('#stopbutton').removeClass('hide');
     slideshow();
     imageTimer = setInterval(slideshow, 1000);

     var stopSlideshow = function () {
        clearInterval(imageTimer);
        $('.container').removeClass('hide');
        $('#stopbutton').addClass('hide');
        $('#picture').attr('src', '');
        imageUrls = [];
        $('#searchbox').val('');
       };

     $('#stopbutton').on('click', stopSlideshow);
    });
};

$(document).ready(function() {
  $("#searchbutton").on("click", function () {
    crawl();
  });
  $('form').submit(function(event){
    crawl();
    event.preventDefault();
  });
});

