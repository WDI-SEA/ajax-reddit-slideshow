var imageCollection = [];
var imageIndex = 0;

function displayImage() {
    $('.image').attr("src",imageCollection[imageIndex]);
    $('.image').fadeIn(1000);
    setTimeout(function() { $('.image').fadeOut(1000);}, 2000);
};

$(document).ready(function() {

  $('input').focus();

  // event handler on form submission to fire Ajax request
  $('form').submit(function(e) {
    e.preventDefault();
    // jQuery Ajax request
    var userInput = $('input').val();
    
    if($('input').val() !== '') {
      
      $('.wrapper').hide();

      $.get('http://www.reddit.com/search.json', {
        q: userInput + '+nsfw:no'
        }).done(function(returnData) {
          // for each object grab the thumbnail
          returnData.data.children.forEach(function(item) {
            // use map here instead?
            if(item.data.thumbnail !== 'default' && item.data.thumbnail !== 'self') {
              imageCollection.push(item.data.thumbnail);
            }
          });
      });

     
      $('.reset').show();

      // reset function
      $('.reset').on('click', function() {
        $('.wrapper').show();
        $('.reset').hide();
        clearInterval(imgInterval);
        imageCollection.length = 0;
        $('input').val('').focus();

      });

      // setTimeout on this to stop the slideshow?
      var imgInterval = setInterval(function() {
        displayImage();
        imageIndex++;
        if(imageIndex >= imageCollection.length) {
          imageIndex = 0;
        }
      }, 4000);
  } else {
    $('.bounce').effect('bounce', 1000);
  }
  });
});
