$(document).ready(function() {
  var queryArray = [];
  var arrayLength = 0;
  var index = 1;
  var intervalSelector;

  var searchReddit = function(event) {
    event.preventDefault();
    var searchString = $('#search-field').val();
    queryArray = [];

    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data){
      results = data.data.children;
      results.forEach(function(img) {
        if (img.data.url.indexOf('.jpg') !== -1 || img.data.url.indexOf('.png') !== -1 || img.data.url.indexOf('.gifv') === 1 || img.data.url.indexOf('.tiff') !== -1 ) {
          queryArray.push(img.data.url);
        }
      });
      arrayLength = queryArray.length;
      if (queryArray[0] !== undefined) {
        $('<img id="image-slide" src="' + queryArray[0] + '">').appendTo('#slide-show');
        startSlideshow();
      }
    });
  }

  var startSlideshow = function() {
    $('#stop-slideshow').show();
    $('#search-container').hide();
    $('#slide-show').addClass('black');
    $('#slide-show').removeClass('zindex0');
    $('#slide-show').addClass('zindex20');

    intervalSelector = setInterval(function() {
      console.log('ran' + index);
      if (index < arrayLength){
        $('#image-slide').fadeOut(400, function() {
            $('#image-slide').attr('src', queryArray[index]);
        })
        .fadeIn(400, function() {
          $('#image-slide').attr('src', queryArray[index]);
        });

        // $('#image-slide').attr('src', queryArray[index]);
        index++;
      } else {
        index = 0;
      }
    }, 5000);
    setTimeout(function() {
      $("#background").css("-webkit-filter", "blur(5px) brightness(20%)");
      $("#background").css("filter", "blur(5px) brightness(20%)");
    }, 100);
  } // END the startSlideshow function

  var stopSlideshow = function() {
    queryArray = [];
    clearInterval(intervalSelector);
    $('#slide-show img').remove();
    $('#slide-show').removeClass('black');
    $('#slide-show').removeClass('zindex20');
    $('#slide-show').addClass('zindex0');
    $('#stop-slideshow').hide();
    $('#search-container').show();
    unblurBackground();
  }

  var blurBackground = function() {
    $("#background").css("-webkit-filter", "blur(5px) brightness(50%)");
    $("#background").css("filter", "blur(5px) brightness(50%)");
  }
  var unblurBackground = function() {
    $("#background").css("-webkit-filter", "blur(0px) brightness(100%)");
    $("#background").css("filter", "blur(0px) brightness(100%)");
  }


  $('#search-field').focus();
  blurBackground();
  $('#search-field').on('focusout', unblurBackground);
  $('#search-field').on('focusin', blurBackground);
  $('#search-btn').unbind().on('click', searchReddit);
  $('#stop-slideshow').on('click', stopSlideshow).hide();

  $('#search-btn').dblclick(function(e){
    e.preventDefault();
  });


});
