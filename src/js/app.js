$(document).ready(function() {
// start without exit button
  $('#exit').hide();
  // Variables
  var myInterval;
  var intervalID = 0;
  // Functions
  function runShow(pictures) {
    // $('#pictureResults').html('<img src="' + pictures[intervalID] + '">');
    $('#pictureResults').attr('src', pictures[intervalID]);
    console.log(intervalID);
  }
  function startShow(pictures) {
    myInterval = setInterval(function() {
      runShow(pictures);
      // pictureFormat();
      intervalID++;
    }, 3000);
  }
  function getPicturesArray(data) {
    var childrenArray = data.data.children;
    var showArray = [];
    // loop through childrenArray to get images array
    for (var i = 0; i < childrenArray.length; i++) {
      // Filter out preview object to only those that have an image prop
      var previewObject = childrenArray[i].data.preview;
      var dataObject = childrenArray[i].data;
      if (dataObject.hasOwnProperty('preview')
        && previewObject.hasOwnProperty('images')) {
        var imageArray = childrenArray[i].data.preview.images;
        for (var k = 0; k < imageArray.length; k++) {
          var imageRecieved = imageArray[k].source.url;
          showArray.push(imageRecieved);
        }
      }
    }
    return showArray;
  } // end of getPicturesArray
  function stopShow() {
    $('#exit').click(function() {
      clearInterval(myInterval);
      myInterval = null;
      $('#userInput').val('');
      $('img').hide();
      $('#exit').hide();
      $('#header').slideDown(300);
    });
  }
  // Search and click to start api
  $('#startSearch').click(function() {
    var query = $('#userInput').val().trim();
    $.get('https://www.reddit.com/search.json', {
      q: query
      // Fetch related posts from reddit with ajax
    }).done(function(data) {
      $('#header').fadeOut(300);
      $('#exit').show(20000);
      var finalPicturesArray = getPicturesArray(data);
      startShow(finalPicturesArray);
      stopShow();
    }).fail(function() {
      // Need to research when the api will fail
        // $('.imageContainer').innerHTML('Sorry, no results.')
        // $('#exit').hide();
        // $('#header').slideDown(300);
    }).always(function() {
    });
  });
}); // end of doc ready
