let IMAGES = [];
let interval;
let currentImageIndex = 0;

$(document).ready(function() {
  $('#form').submit(function(e) {
    e.preventDefault();
    const searchTerm = $('#input').val();
    $('#form').hide();
    addResetButton();
    requestImages(searchTerm);
  });

  $('#container').on('click', '#reset', function(e) {
    e.preventDefault();
    $('#result').html('');
    clearInterval(interval);
    $('#form').show();
    $('#reset').hide();
  });

  function addResetButton() {
    const reset = '<button id="reset">Stop / Reset</button>';
    $('#container').append(reset);
  }

  function buildImageArray(children) {
    for(let i = 0; i < children.length; i++) {
      if(children[i].data.thumbnail !== 'self' && children[i].data.thumbnail !== 'default') {
        IMAGES.push(children[i].data.thumbnail);
      }
    }
    console.log(IMAGES);
  }

  function displayImage() {
    console.log('tick');
    $('#result').html('');
    $('#result').prepend('<img src="'+IMAGES[currentImageIndex]  +'" />');
    queNextImage();
  }

  function queNextImage() {
    currentImageIndex < IMAGES.length-1 ? currentImageIndex++ : currentImageIndex = 0;
  }

  function startSlideshow() {
    interval = window.setInterval(displayImage, 6000);
  }

  function requestImages(term) {
    $.ajax({
      url: "https://www.reddit.com/search.json",
      method: "GET",
      data: {
        q: term + 'nsfw:no'

      }
    }).done(function(response) {
      const children = response.data.children;
      buildImageArray(children);
      displayImage();
      startSlideshow();


    }).fail(function(err) {
      console.log("err", err);
    });
  }
});
