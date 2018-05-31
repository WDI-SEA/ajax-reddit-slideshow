// global vars
var slideInterval;
var imageArray = null;
var count = 0;

// assigning the click handlers
$(document).ready(function() {
  $('form').submit(searchThing);
  $('#stop').click(slidesStop);
});

// starting the slideshow

function slidesGo() {
  // hide the search field, show the stop button
  $('.search').fadeOut(700);
  $('.stop').fadeTo(700, 1);
  slideInterval = setInterval(slideAdvance, 3000);
  slideAdvance()
}
// showing a new slide
function slideAdvance() {
  if (count < imageArray.length) {
    $('.slidebox').fadeIn(500);
    $('.slidebox').css("background-image", "url('" + imageArray[count] + "')");
    $('.slidebox').fadeOut(2500);
    count++
    // if we run out of images, start over
  } else {
    count = 0;
    $('.slidebox').fadeIn(500);
    $('.slidebox').css("background-image", "url('" + imageArray[count] + "')");
    $('.slidebox').fadeOut(2500);
  }
}
// stop the slides, hide the slideshow, bring the search field back
function slidesStop() {
  clearInterval(slideInterval);
  count = 0;
  $('.slidebox').css("background-image", "none");
  $('.search').fadeIn(700);
  $('.stop').fadeOut(700);
  $('form')[0].reset();
  $('input').focus();
}

// search button

function searchThing(e) {
  e.preventDefault();
  var fakeArray = [];
  // pass the user input to reddit as search q
  var theQuery = $('form').serializeArray();
  $.get("https://www.reddit.com/search.json", {
    q: theQuery[0].value + ' site:imgur.com +nsfw:no' // use imgur only so we don't get text posts
  }).done(function(returnData) {
    returnData.data.children.forEach(function(item, i) {
      if (item.data.url.includes("jpg") || item.data.url.includes("png")) { // make sure there's a direct image link
        fakeArray.push(item.data.url); // put the image into an array-like thing?
      }
    });

    imageArray = $.makeArray(fakeArray) // make sure it's an array please
    if (imageArray.length > 0) { // only start slides if we actually found an image
    slidesGo(); // start slides
  } else {
    $('.no-results').fadeTo(600, 1);
    $('.no-results').fadeOut(800);
  }



  });


}
