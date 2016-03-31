// #Reddit photo slideshow

// We are going to use what we've learned so far to create a basic slideshow using images taken from reddit via AJAX.

// ####Content Warning

// Reddit sometimes contains some offensive images be careful with your search terms.

// If you want to ensure that you do not get NSFW (Not Safe For Work) items. You can filter it by adding "nsfw:no" to the end of the search query.

// **Example**

// [http://www.reddit.com/search.json?q=cats nsfw:no](http://www.reddit.com/search.json?q=cats+nsfw:no)



// ##User Experience

// **Page should load with**

// * Some sort of title
// * A short description telling the user what to do
// * A blank text field
// * A Button ("start" or "go" or "search")

// **When the user enters a search term and presses enter (or clicks the button)**

// * The form / title / description should hide
// * Show a loading message (optional)
// * Fetch related posts from reddit (with ajax)
// * Display animation / slideshow of images (jQuery)
// * Show a button to stop / reset the animation
// * Repeat animation until use clicks "stop"

// **When the user clicks the "stop" button**

// * Animation stops / images are removed
// * Form / title / description are shown again
// * User can enter a new search term


// ##Suggested proccess

// It is important to break down any development project in to smaller pieces and tackle them one at a time. Here is a list of how you might want to attack this project.

// * Create your form (html / css)
// * Prevent default and show an alert on form submit
// * Use AJAX to make a request. Show data in console
// * Create an array of image URLs (tip: use [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)).
// * Make the form / title / description hide
// * Cycle through images
//     * tip: use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)
//     * Maybe just set the src attribute of a single image tag for now
// * Add some interesting style / animation
// * Create button to stop animation (tip: use [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)).
var imageArray = [];
var counter = 0;
var timer;
$('#stop-slides').hide();

$('#myForm').submit(function (event) {
  event.preventDefault();

  var input = $('#query');
  var userText = input.val();
  $.get('https://www.reddit.com/search.json', {
    q: userText,
    nsfw: "no"
  }).done(function (response) {
    console.log(response);

    var results = response.data.children
    for (i = 0; i < results.length; i++) {
      var redditData = results[i].data;
      if (redditData.domain === "i.imgur.com" && redditData.url) {
        imageArray.push(redditData.url);
      }
      console.log(imageArray);

    }
  triggerTimer();
  });
});

function clearSearchResults() {
  $("#results").html("");
  $('#photo-div').html(""); 
  $('#myForm').show();
  imageArray = [];
  $('#query').html("");
}

$('#submit')
  .click(function () {
    $('#myForm').hide();
    $('#stop-slides').show();
  });

$('#stop-slides').click(function() {
  console.log('stop click');
  stop();
  clearSearchResults();
});



function flashImage() {
    if ($('#photo-div').html()) {
      $('#photo-div').html("");
    }
    var html = '<img class="animate" src="' + imageArray[counter] + '"/>'; 
    $('#photo-div').append(html); 
    if (counter >= (imageArray.length-1)) {
      stop();
      clearSearchResults();
    } else{
      counter++;
    }
}



function triggerTimer(){
    timer = setInterval(flashImage, 4000);
}


function stop(){
  clearSearchResults();
  clearInterval(timer);
  counter = 0;
  var imageArray = [];
  $('#photo-div').empty();

 }

  // CURRENTLY WORKING
  // function flashImage() {
  //   $("#slide").attr("src", imageArray[counter])
  //   $(this).fadeIn();
  //   counter++;
  // }


  // function addSearchResult(imageArray) {


  //   setInterval(function () {
  //     var html = '<img src="' + imageArray[i] + '"/>';
  //     $('#photo-div').append(html);
  //     i++;




  //     if (i === imageArray.length) {
  //       clearInterval(i);
  //     }
  //   }, 2000);


  // }







  //dfdfdfdfdfsdfsd