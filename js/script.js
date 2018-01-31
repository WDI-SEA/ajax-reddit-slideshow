var i = 1;

var slideshow = function (pictureArray) {
  $('#picture').attr('src', pictureArray[i]);
  i = i + 1;
};

var hideOnClick = function() {

};


var crawl = function () {

  var searchString = $('#searchbox').val();
    console.log($('#searchbox').val());
    $.get('https://www.reddit.com/search.json', {
        q: searchString   // search string for results, when DONE, next function starts
      }).done( function(data) {           //store results in an array from children
          var results = data.data.children;
          console.log(data);

        var imageUrls = results.map(function(item) {
            if (item.data.thumbnail.indexOf("reddit") != -1) {
                var urlArray = [];
                urlArray.push(item.data.thumbnail);
              return urlArray;
             }
          }); 
        console.log(imageUrls);

        $('.container').addClass('hide');
        $('#stopButton').removeClass('hide');

         var imageTimer = function () {
          setInterval(slideshow(imageUrls), 1000);
        };
         imageTimer();

         var stopSlideshow = function () {
          clearInterval(imageTimer);
          $('.container').removeClass('hide');
          $('#stopButton').addClass('hide');
          $('#picture').attr('src', '');
        };

        $('#stopButton').on('click', stopSlideshow);


     });

};


$(document).ready(function() {
  
  $("#searchButton").on("click", function () {
    // e.preventDefault();
    // console.log("in the click");
    crawl();

     //outside functions end below
  });
});


// $("#pictures").append("<img src='" + item.data.thumbnail + "'>");

// var slideshowTimer = setInterval(slideshow, 1000);
