// Create your form (HTML/CSS) √
// Prevent default form submission and verify that you can type something into the form √
// Use AJAX to make a request. Show data in console √
// Create an array of image URLs (tip: use filter and map).
// Make the form / title / description hide
// Cycle through images
// tip: use setInterval
// Either add images, or change the src of a single image tag
// Add some interesting style / animation
// Create button to stop animation (tip: use clearInterval).

var slideInterval;
var imageArray = null;
var count = 0;

$(document).ready(function() {
  $('form').submit(searchThing);
  $('#stop').click(slidesStop);
});

function slidesGo() {
  slideInterval = setInterval(slideAdvance, 3000);
  slideAdvance()
}

function slideAdvance() {
  if (count < imageArray.length) {
    $('.slidebox').fadeIn(500);
    $('.slidebox').css("background-image", "url('" + imageArray[count] + "')");
    $('.slidebox').fadeOut(2500);
    count++
  } else {
    count = 0;
    $('.slidebox').fadeIn(500);
    $('.slidebox').css("background-image", "url('" + imageArray[count] + "')");
    $('.slidebox').fadeOut(2500);
  }
}

function slidesStop() {
  clearInterval(slideInterval);
  count = 0;
  $('.slidebox').css("background-image", "none");
  $('.search').fadeIn(700);
  $('.stop').fadeOut(700);
  $('form')[0].reset();
  $('input').focus();

}


function searchThing(e) {
  e.preventDefault();
  var fakeArray = [];
  $('.search').fadeOut(700);
  $('.stop').fadeTo(700, 1);
  var theQuery = $('form').serializeArray();
  $.get("https://www.reddit.com/search.json", {
    q: theQuery[0].value + ' site:imgur.com +nsfw:no'
  }).done(function(returnData) {
    returnData.data.children.forEach(function(item, i) {
      if (item.data.url.includes("jpg") || item.data.url.includes("png")) {
        fakeArray.push(item.data.url);
      }
    });

    imageArray = $.makeArray(fakeArray)
    if (imageArray.length > 0) {
    slidesGo();
  }



  });


}
