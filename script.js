var imArr = [];
var counter = 0;
var nIntervId;


$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
  });

function search(event) {
// Stop the form from changing the page.
  event.preventDefault();
  clearSearchResults();

  var input = $("#query")
  var userQuery =  input.val();


  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    console.log(response);
  

//changing based on Nat's code
//this filters through the children to check for the preview tag & find the url
//then pushes those urls into an array
response.data.children.filter(function(result) {
if(result.data.preview && result.data.preview.images[0].source.url) {
    imArr.push(result.data.preview.images[0].source.url);
    console.log(imArr);
        } 
      });
    changeSlide();
  });


  // Clear previous search results.
  function clearSearchResults() {
    $("#results").html("");
    $('#slide-show').html(""); 
    imaArr= [];
  }

  //hides button and input
  $('#submit').click(function (){
     $(this).parent().fadeOut();
     $(this).fadeOut();
    });


  //stolen from Brent's code shamelessly
  //this checks the photo-div, clears it (from previous image), then animates the slide based off the image url
  //if statement is the counter that allows the image to change through each of the search results
  function flashImage() {
      if ($('#slide-show').html()) {
        $('#slide-show').html("");
      }
      var html = '<img class="animate" src="' + imArr[counter] + '"/>'; 
      $('#slide-show').append(html); 
      if (counter >= (imArr.length-1)) {
        stopSlide();
        imArr = [];
        clearSearchResults();
      } else{
        counter++;
      }
  }

  //timer stuff for slideshow
  function changeSlide() {
    nIntervId = setInterval(flashImage, 3000);
  }

  function stopSlide() {
    clearInterval(nIntervId);
    $("#results").html("");
    $('#slide-show').html(""); 
    $('#submit').fadeIn();
  }

}


//TO BE COMPLETED
// loading image while AJAX pulls from
// $(window).load(function(){
// $('#dvLoading').fadeOut(2000);
// });

//jquery UI - show and hide JQuery

//Nat did a counter that reset back to Zero to carousel
//if(counter>=imageArray.length)
// counter = 0;
