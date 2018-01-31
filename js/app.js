var allImagesArr = [];
var imageIndex = 0;
var slideshowImage = $('.slideshowImage');
var myInterval = null;
var content = $('#content');

var resetSearch = function() {
  clearInterval(myInterval);
  slideshowImage.attr('src', '');
  content.empty();
  allImagesArr = [];
  imageIndex = 0;
};

var updateImage = function() {
  console.log('yo ' + imageIndex);
  if (imageIndex < allImagesArr.length) {
    slideshowImage.attr('src', allImagesArr[imageIndex]);
      // $('img').addClass('imgFade');
      // setTimeout(function() {
      //   $('img').removeClass('imgFade');
      // }, 1990);
    imageIndex++;
    if (imageIndex >= allImagesArr.length) {
      imageIndex = 0;
    }
  }
};

$('.form').on('submit', function(e) {
  e.preventDefault();
  $('input:text:visible:first').focus();
  $('#searchterm').val('');
});

$(document).ready(function() {
// Grabs images and JSON from Reddit API
    $("#searchbutton").on("click", function() {
      resetSearch();
      var searchString = document.forms["imageform"].elements["imagebox"].value;
      var loadText = $('<p>');
      $('.testDiv').prepend(loadText.html('Please wait while images load'));
      $('.spinDiv').css({display: 'inline-block'});
      $.get('https://www.reddit.com/search.json', {
        q: searchString
      }).done(function(data) {
        var results = data.data.children;
        results.forEach(function(item) {
          if (item.data.thumbnail !== 'default') {
            eachImage = item.data.thumbnail;
            allImagesArr.push(eachImage);
          }
        });
        //load screen here instead of below
        setTimeout(function() {
          slideshowImage.attr('src', allImagesArr[imageIndex]); //change this to load screen
          setTimeout(function() {
            $('img').addClass('imgFade');
          }, 2000);
          myInterval = setInterval(updateImage, 2000);
        }, 4000);
      });
      setTimeout(function() {
        loadText.remove();
        $('.spinDiv').css({display: 'none'});  
      }, 4000);

    });

    $('.resetButton').on('click', function() {
      resetSearch();
    });
});
