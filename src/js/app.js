$(document).ready(function() {

// $.ajaxSetup({
//  headers: {
//    "Access-Control-Allow-Origin": true
//  }
// });
// Click function
$('#startSearch').click(function() {
  var query = $('#userInput').val().trim();
  $.get('https://www.reddit.com/search.json', {
    q: query,
    // Fetch related posts from reddit with ajax
    // q: $('#userInput').val()
  }).done(function(data) {
    var finalPicturesArray = getPicturesArray(data);
    // console.log(finalPicturesArray);
    startShow(finalPicturesArray, intervalID);
    pictureFormat();
  }).always(function(data) {
  });
});
  //Display Images in an animation slideshow
var myInterval;
var intervalID = 0;
// console.log(intervalID);

function startShow(pictures, id) {
  myInterval = setInterval(runShow(pictures, id), 3000);
  console.log("test");
}

function runShow(pictures, id) {
  $('#pictureResults').html('<img src="' + pictures[id] + '">');
  intervalID++;
  console.log(pictures[id]);
  console.log(intervalID);
}

function getPicturesArray(data) {
  var childrenArray = data.data.children;
  var showArray = [];
  // loop through childrenArray to get images array
  for (var i = 0; i < childrenArray.length; i++) {
    // Filter out preview object to only those that have an image prop
    var previewObject = childrenArray[i].data.preview;
    var dataObject = childrenArray[i].data;
    // console.log(previewObject);
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

// add pic formatting
function pictureFormat() {
  $('img').addClass('imageStyle');
}
// Stop an interval with clear interval

}); // end of doc ready
