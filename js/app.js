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
    $("img").attr('src', imageArray[imgCounter].data.thumbnail);
}

//on the click function, we start doing this
$(document).ready(function() {

  $("button").on("click", function() {
    // e.preventDefault();
    // console.log("in the click");
    //hide div that holds title, p and form

    $("#splash").hide();

    var searchString = document.forms["imageform"].elements["imagebox"].value;

    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data) {
      var result = data.data.children;

      var result = result.filter(function(item) {
        // if (item.data.thumbnail !== 'default');
        // ($.text(this).indexOf('My String') != -1)
        if ($.text(item).indexOf('Reddit') != -1) ;
        imageArray.push(item);
        console.log(imageArray);
      });
    });
    myInterval = setInterval(updateImage, 500);
  });
});
