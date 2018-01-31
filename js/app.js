$(document).ready(function() {

var imageCounter = 0;
var collection = [];
var myInterval = null;
var endPic = 'http://bit.ly/2DNymPs';
var startPic = 'http://gph.to/2rTPJwt'
var searchForm = $('#searchform');
var resetForm = $('#resetform');
var searchTerm = $('#searchterm');
var pics = $('img');
var searchButton = $('#searchbutton');
var resetButton = $('#stopbutton');

var prepareSlideShow = function() {
  pics.attr('src', startPic);
  collection = [];
  resetForm.show();
  searchForm.hide();
}

var sliderReset = function() {
  pics.attr('src', endPic);
  searchForm.show().focus();
  clearInterval(myInterval);
  resetForm.hide();
  searchTerm.val('');
}

var updateImage = function() {
  if (imageCounter < collection.length) {
    pics.attr('src', collection[imageCounter]);
    imageCounter++;
  } else {
    sliderReset();
  }
};

  searchButton.on('click', function() {
    prepareSlideShow();
    var searchString = document.forms['imageform'].elements['imagebox'].value;
    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data) {
      searchForm.hide();
      results = data.data.children; // Steve used filter function, look it up
      results.forEach(function(item) {
        var image = item.data.thumbnail;
        if (image.indexOf('reddit') !== -1) {
          collection.push(image);
        }
      });
      console.log(results);
      myInterval = setInterval(updateImage, 3000);
      resetButton.on('click', function() {
        clearInterval(myInterval);
        sliderReset();
      })
    });
  });





});
