//Set Global Variables
var count=0;
var slideShowInterval;


// Set up the page when it loads.
$(function() {
  $('#search-form').on('submit', search);
});


// Search 
function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  var userInput = $('#query').val() || 'puppies';
  $.get('https://www.reddit.com/search.json', {
    }).done(function(response) {
      //console.log(response.data.children); 
  
      //addslideShowElements();
      slideControlCommands(); 
      slideShowInterval =  setInterval(function(){interval(addSearchResult(response.data.children))},1000);
    });

    $("#searchInput").hide();
}


// Return search results
function addSearchResult(results) {

  var images = [];
  for(var i = 0; i < results.length; i++) {
      var source = results[i].data.thumbnail;
      // Validate image source URLs
      if (source === "self" || source === "default" || source === "image") {
        i++;
      } else {
        images.push(source);
      };
  };
   return images;
}

// // Add DOM content for slide show images
// function addslideShowElements() {
//     var div = document.createElement('div');
//     var img = document.createElement('img');
//     $('#slideshow').append(div);
//     $(div).append(img);
// }

// To display slide show control commands
function slideControlCommands() {
  document.getElementById('imageContainer').style.display = 'block';
  document.getElementById('slideImages').style.display = 'inline-block';
  document.getElementById('slideControl').style.display = 'block';

}

// To stop slide show
function stopSlideShow() {
    clearInterval(slideShowInterval);
}


// To reset interval
// I am unclear as how to reset the interval - unfortunately the reset button is not working as planned :(
function resetSlideShow() {
  console.log('count'+count);
  count = 0;
    //console.log('count'+count);
  clearInterval(slideShowInterval);   
  slideShowInterval = setInterval(function(){interval(addSearchResult(response.data.children))},1000);

}

// Create img source tags for slide show
function interval(array) {
    $('img').attr("src", array[count]).attr("id", "thumbnailImages");
    count++;
}


// Load Page Content
document.addEventListener("DOMContentLoaded", function() {
  //document.getElementById('reset').addEventListener('click', reset);
  document.getElementById('imageContainer').style.display = 'none';
  document.getElementById('slideControl').style.display = 'none';
  document.getElementById('slideImages').style.display = 'none';
});
