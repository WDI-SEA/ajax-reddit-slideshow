$(document).ready(function() {

// $.ajaxSetup({
//  headers: {
//    "Access-Control-Allow-Origin": true
//  }
// });
// Click function
$('#startSearch').click(function() {
  console.log('clicked');
});

$.get('https://www.reddit.com/search.json', {
  q: 'cats',
  // Fetch related posts from reddit with ajax
  // q: $('#userInput').val()
}).done(function(data) {
  var childrenArray = data.data.children;
  var showArray = [];
  // loop through childrenArray to get images array
  for (var i = 0; i < childrenArray.length; i++) {
    // Filter out preview object to only those that have an image prop
    var previewObject = childrenArray[i].data.preview;
    var dataObject = childrenArray[i].data;
    console.log(previewObject);
    if (dataObject.hasOwnProperty('preview')
      && previewObject.hasOwnProperty('images')) {
      var imageArray = childrenArray[i].data.preview.images;
      for (var k = 0; k < imageArray.length; k++) {
        var imageRecieved = imageArray[k].source.url;
        showArray.push(imageRecieved);
      }
    }
  }
  console.log(showArray)
  //   = data.children
  // $('#pictureResults').html("<img src='https://i.redditmedia.com/m9iPnqVVMghlSC4bFUjHSft2Ltuq6d0Kc1gtPxrFOfE.jpg?s=08e2a271ef2d9108df62ba950b1448aa'>");
}).always(function(data) {
  // console.log(data);
});



}); // end of doc ready
