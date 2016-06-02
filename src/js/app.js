$(function() {
  $('.limiter').hide();

  $('form').on('submit', function(e){
    e.preventDefault();
    getResults($('#inputform').val());
    $('#inputform').val('');
    $('.container').hide();
    $('.limiter').show();
  })

  $('#back-btn').click(function() {
    // $('#set-images').carousel(1);
  })
})

function getResults(query) {
  $.ajax({
    type: "GET",
    url: 'http://www.reddit.com/search.json?q=' + query,
    dataType: "json",
    success: function(reddit) {
      $('#set-images').html(createImages(cleanse(reddit)));
    }
  })
}

function cleanse(ajaxObj) {
  var cleanThumbs = [];
  var childs = ajaxObj.data.children;
  for (var i=0; i<ajaxObj.data.children.length; i++) {
    if (childs[i].data.hasOwnProperty('preview')) {
      console.log(childs[i].data.preview.length);
      if (childs[i].data.preview.hasOwnProperty('images')) {
        for (var j=0; j<childs[i].data.preview.images.length; j++) {
          if (childs[i].data.preview.images[j].hasOwnProperty('source')) {
            if (childs[i].data.preview.images[j].source.hasOwnProperty('url')) {
              cleanThumbs.push(childs[i].data.preview.images[j].source.url);
            }
          }

        }
      }
    }
  }
  console.log("cleanthumbs: ", cleanThumbs.length);
  return cleanThumbs;
}

function createImages(imgArr) {
  var isActive; // The first div must have class active
  var carousel = '';
  for (var i=0; i<imgArr.length; i++) {
    if (i == 0) {isActive = 'active';} else {isActive = '';}
    carousel += '<div class="item ' + isActive + '"><img src="' +
      imgArr[i] + '"><div class="carousel-caption"></div></div>';
  }
  console.log("cara", carousel);
  return carousel;
}
