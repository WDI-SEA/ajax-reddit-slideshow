// work queue
//need to get default to work
//reset function var clearMyInterval doesn't clear paused image from board
//resizing image function needs help

var imageArray= [];
//how many images we've replaced
var imgCounter = 1;
//this is for the seconds interval
var myInterval = null;
//set itnerval function tht replaces images
//two if else statments - one for img counter, one to replace image
var updateImage = function() {
  if (imgCounter < imageArray.length) {
    imgCounter++;
  } else {
    imgCounter = 0;
  }
    //how we move through the array by iteration using the imgCounter
    $("img").attr('src', imageArray[imgCounter].data.url);
    $("img").addClass('imgNew', imageArray[imgCounter]);

    //resize all the image heights in a loop, set  height property to a new value
    // $("img)").height('url', imageArray[imgCounter].data.height, 600);
    }
// }

var clearMyInterval = function() {
      imageArray = [];
      $("img").attr('src', "");
      clearInterval(myInterval); //this stops the interval from running
      $("#splash").show(); //shows search form again
      console.log('clicked clearmyInterval');
    }

$(document).ready(function() {

  $("#resetbutton").on("click", function() {
    clearMyInterval();
    console.log('clicked reset button');
  });

  $("#searchbutton").on("click", function(e) {
    // e.preventDefault();
    // console.log("in the click");
    //hide div that holds title, p and form
    e.preventDefault();
    $("#splash").hide();

    var searchString = document.forms["imageform"].elements["imagebox"].value;

    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data) {
      var result = data.data.children;

      //https://pressupinc.com/blog/2014/02/setting-dynamic-equal-heights-multiple-elements-jquery/
      // var result = each.function (){
      // $(this)(t).
      // }

      var result = result.filter(function(item) {
        if (item.data.thumbnail.indexOf('reddit') != -1){ //filtering for certain condition = thumbnail
            imageArray.push(item);
          } //matched condition, add this item to my array
        console.log(imageArray);
      });
      myInterval = setInterval(updateImage, 2000);
    });
  });

});
