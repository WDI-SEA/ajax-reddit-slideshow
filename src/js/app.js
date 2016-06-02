$(document).ready(function() {

  $('#searchBtn').on('click', function(event) {
    event.preventDefault();

     $.get('https://www.reddit.com/search.json', {
      q: valInput()
    }).done(function(taco) {
      intoArray(taco);
    }).fail(function(taco) {
      console.log('An error occured');
    })

  })

  $('#resetBtn').click(function() {
    location.reload();
  })

  function valInput() {
     return $('#searchBox').val();
  }

  function intoArray(taco) {
    var emptyArray = [];
    var childrenArray = taco.data.children;
    for (var i = 0; i < childrenArray.length; i++) {
      // iterate over childrenArray
      if (childrenArray[i].data.preview) {
       var url = childrenArray[i].data.preview.images[0].source.url;
        if (url !== '') {
          emptyArray.push(url);
        }
      }
    }
    showImage(emptyArray);
  }

  function showImage(images) {
    images.forEach(function(url) {
     $('.imageReturn').append('<div><img src="'+ url +'"></div>');
    })

    $('.imageReturn > div:gt(0)').hide();

    setInterval(function() {
      $('.imageReturn > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .append('.imageReturn');
    }, 3000);
  }
});
