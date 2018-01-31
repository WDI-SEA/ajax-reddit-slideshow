var imgArray = [];
var imgNumber = 0;
var reset = $("#reset");

var nextImage = function() {
  if (imgNumber < imgArray.length) {
    imgNumber++;
  } else {
    imgNumber = 1;
  }
  $("img").attr("src", imgArray[imgNumber]);
};

var imgInterval = setInterval(nextImage, 3000);

var stopInterval = function() {
  imgArray = [];
  clearInterval(nextImage);
  $("img").attr("");
  $("splash").show();
}

$(document).ready(function() {

  $(document).keypress(function(event) {
    if(event.which == 13) {
      search();
      return false;
    };
  });

  var search = function() {
    $("#searchbutton").on("click", function(event) {
      event.preventDefault();
    });
    // console.log("in the click");
    var searchString = document.forms["imageform"].elements["imagebox"].value;

    $.get('https://www.reddit.com/search.json', { //first parameter is url
      q: searchString             //second parameter is object
    }).done(function(data) {
      var results = data.data.children;
      console.log(data);   //make sure this works and look through to find where data is stored using dropdown arrows
      results.forEach(function(item) {
        if (item.data.thumbnail !== "default") {
          imgArray.push(item.data.thumbnail);
        };
      });
      nextImage();
      $("img").addClass("resultImg");
      $("img").attr("src", imgArray[0]);
      $("#splash").hide();
      $("#content").append("<button type='button' id='reset'>"+"Reset"+"</button>");
      reset.on("click", stopInterval);
    });
  };
});
