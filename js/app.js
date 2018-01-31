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
    //resize all the image heights in a loop, set their height property to a new value
    // $("img)").height('url', imageArray[imgCounter].data.height, 600);
    }
// }

var clearMyInterval = function() {
      $(imageArray).html("");
      clearInterval(myInterval);
      $("#splash").show();
      console.log('clicked clearmyInterval');
    }

//on the click function, we start doing this
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

      var result = result.filter(function(item) {
        // if (item.data.url !== 'default');
        // ($.text(this).indexOf('My String') != -1)
        if ($.text(item).indexOf('Reddit') != -1);
        imageArray.push(item);
        console.log(imageArray);
      });
      myInterval = setInterval(updateImage, 2000);
    });
  });

});
