$(document).ready(function() {
  $('#resetButton').hide();
  $('#searchBar').on('submit', function(e) {
    e.preventDefault();
    $('.open').hide();
    $('#resetButton').show();
    var searchText = $('#input').val();
    
    var show = 0;
    
    $.get('https://www.reddit.com/search.json?q=' + searchText)
    .done(function(info) {

      var results = info.data.children

      
      var getImages = function(url) {
        if(!url.data.thumbnail || url.data.thumbnail === "self") {
          getImages = $("<img src='https://memecrunch.com/meme/3673B/drake-nah/image.png?w=480&c=1'>");
        }
        else if(url.data.thumbnail !== '') {
          return url.data.thumbnail;
        } 
        
      }


      var filteredImages = results.filter(getImages);

      
      var images = filteredImages.map(function (object) {
        return "<img src='" + object.data.thumbnail + "'>";
      });
      
      
      function slideShow() {
        $('#redditPics').html(images[show]);
        show++;
        show = show % images.length;
      }

      
      slideShow();
      setInterval(slideShow, 1100);

      
      $('#resetButton').on('click', function () {
        images = '';
        $('#redditPics').html('');
        $('#input').val('');
        $('.open').show();
        $('#resetButton').hide();
      });
    });
  });
});