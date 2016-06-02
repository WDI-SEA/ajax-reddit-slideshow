$('document').ready(function() {

  //findPics wittles down an object to an array of desired data
  //by using .filter() to filter out objects that don't meet a certain requirement
  //and by using .map()  to transform the filtered object in to an array of desired data
  var findPics = function(dataObj) {
    var filterResult = dataObj.data.children.filter(function(element) {
      if (element.data.hasOwnProperty('preview')) {
        return true;
      } else {
        return false;
      }
    });

    var urlArray = filterResult.map(function(element) {
      return element.data.preview.images[0].source.url;
    });

    var index = 0;
    intervalID = window.setInterval(function() {
      index++;
      if (index >= urlArray.length) {
        index = 0;
      }

      $('#results').html('<img src="' + urlArray[index] + '">');
    }, 1000);
  };

  //text inpout event listener that detects the enter key and
  // registers a click event on the button

  $('#textForSearch').keyup(function(event) {
    if (event.keyCode === 13) {
      $('#buttonForSearch').click();
    }
  });

  //button that pulls the value of the input in the text inpout
  //and passes the text value as a variable to an AJAX call
  $('#buttonForSearch').on('click', function(e) {
    e.preventDefault();

    var searchString = $('#textForSearch').val();

    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data) {
      findPics(data);
    //a callback function that calls findPics upon a successful ajax call
    }).fail(function(data) {
    }).always(function(data) {
    });
    $('h1').hide();
    $('form').hide();
  });
  //button that stops the interval function that began when findPics was called
  $('#buttonForStopSearch').on('click', function(e) {
    e.preventDefault();
    window.clearInterval(intervalID);
    $('h1').show();
    $('form').show();
    $('#results').html('');
  });
});
