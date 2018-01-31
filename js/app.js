
var imageArray = [];

var getImgArray = function (imgData) {
      // var results = data.data.children;
      var results = imgData.data.children; //data -- children structure and name found on reddit
//      console.log(data); //use this to find data structure
      results.forEach(function(item) {
        if (item.data.thumbnail !== 'default') {
          imageArray.push(item.data.thumbnail);
        }
      });
}

      // data needs time to come back, put this in "done" otherwise the for loop will run before the data comes back
var i = 0;
var changePic = function() {
  $('#content').attr('src', imageArray[i]);
  console.log(i); 
  i += 1;
  i %= imageArray.length;
  }

var intervals;
var myInterval = function () {
  intervals = setInterval(changePic, 1000);
}


var stopInterval = function () {
    clearInterval(intervals); //you need  to clear the timer, not the function of timer, so use "intervals", not "myInterval()"
}


$(document).ready(function() {
  $('#content').hide();
  $('#stopButton').hide();
  $('#stopButton').on('click', function() {
    stopInterval();
    location.reload();
  })

  $("#searchbutton").on("click", function() {
      $('#content').show();
      $('#stopButton').show();

      var searchString = document.forms["imageform"].elements["imagebox"].value;
      $.get('https://www.reddit.com/search.json', { //Ajax get
        q: searchString   //this is an object, make sure there is no ; or ,
      }).done(function(imgData) {
      
      $('#splash').hide();

      getImgArray(imgData);
      myInterval();
    })
  });
});
