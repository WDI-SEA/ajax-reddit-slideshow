$('document').ready(function() {
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

    // console.log(urlArray);
    var index = 0;
    intervalID = window.setInterval(function() {
      index++;
      if (index >= urlArray.length) {
        index = 0;
      }
        // console.log(urlArray[index]);
      $('#results').html('<img src="' + urlArray[index] + '">');
    }, 1000);
  };

  $('#textForSearch').keyup(function(event) {
    if (event.keyCode === 13) {
      $('#buttonForSearch').click();
    }
  });

  $('#buttonForSearch').on('click', function(e) {
    e.preventDefault();

    var searchString = $('#textForSearch').val();

    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data) {
      // console.log('success!');
      // console.log(JSON.stringify(data));
      findPics(data);
    }).fail(function(data) {
      // console.log('failed!');
      // console.log(data);
    }).always(function(data) {
      // console.log('always');
      // console.log(data);
    });
    $('h1').hide();
    $('form').hide();
  });

  $('#buttonForStopSearch').on('click', function(e) {
    e.preventDefault();
    window.clearInterval(intervalID);
    $('h1').show();
    $('form').show();
    $('#results').html('');
  });
});
