var address = 'http://www.reddit.com/search.json';

var searchPics = function(e) {
  e.preventDefault();
  var searchText = $('.user-input').val();
  $.get(address, {
    q: searchText + '+nsfw:no',
  }).done(function(response) {
    // var images = response.data.children[0].data.url
    var images = response.data.children;
    images.forEach(function(image) {
      $('.album').append('<img src=' + image.data.url + '>');
    });
  });
};
// event listener
$('form').submit(searchPics);


// Need:
  //adding new ones below old ones
      // delte old pics and add new
  // style with css, jquery, etc.
  


// // picArray....create global array =[];
//   // get data from search box using (jquery)
//   // -->data from reddit --> write our callback function (see below comment)
//   // instructions/button disapeared
//
// // call back and promise- call back function -
// // handle the data using an array or loop through results ...we have an object (see forEach...long line concat)
//   // store thumbnail in an array (watn to form a loop)...like append we NEED to use an array, saved locally and use PUSH...
//     // item.data.thumbnail = HTTP://
