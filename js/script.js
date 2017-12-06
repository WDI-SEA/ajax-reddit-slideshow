document.addEventListener('DOMContentLoaded', function() {
  $('#query').focus();

  var interval;
  var searchResults = {};
  var slideCount = 0;
  var slideShowImages = [];

  $(function() {
    $('#search-form').on('submit', search);
  });

  $('#quit').click('click',
        function() {
          clearInterval(interval);
          $('#loading').text('');
          $('#slideshow').css('background', 'transparent');
          $('#search-bar').removeClass('inprogress');
          $('#quit').removeClass('inprogress');
          $('#slideshow').removeClass('inprogress');
          $('#query').focus();
        });

  function addImages() {
    for (var i = 0; i < searchResults.length; i++) {
      var source = searchResults[i].data.url;

            // To filter out non-image extensions
      var extension = source.split('.').pop();
      if (extension === 'jpg' || extension === 'png' || extension === 'gif') {
        slideShowImages.push(source);  // Adding viable image urls into this array
      }
    }
  }

  function search(event) {
    event.preventDefault();
    $('#loading').text('Loading');
    $('#search-bar').addClass('inprogress');
    $('#quit').addClass('inprogress');
    $('#slideshow').addClass('inprogress');

    var userInput = $('#query').val() || 'doggo';

    $.get('https://www.reddit.com/search.json', {
      q: userInput + 'nsfw:no',
      limit: 300
    }).done(function(response) {
      searchResults = response.data.children;
      addImages();
      addSearchResult();
      startSlideShow();
    });
  }

  function startSlideShow() {
    interval = setInterval(addSearchResult, 4000);
  }

  function addSearchResult() {
    $('#loading').text('Loading');
    var imageSource = slideShowImages[slideCount];
    $('#slideshow').css('background-image', 'url(' + imageSource + ')');
    slideCount++;
  }
});
