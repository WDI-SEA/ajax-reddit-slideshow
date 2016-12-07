$(function() { 
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

    alert("You just did a search!");


  clearSearchResults();


  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var userQuery = undefined;

  console.log("searching for:", userQuery);

  $.get('http://www.reddit.com/search.json', {
    q: $("#query").val()
  }).done(function(response) {
    console.log(response);

    var results = response.data.children

    for (var i = 0; i < results.length; i++) {
      // console.log(results[i]);
      var result = results[i].data
      addSearchResult(result)

    $( "#prev_image" ).click(function(){
       prev();
    });
    $( "#next_image" ).click(function(){
       next();
    });

    }


  });

}



// // Clear previous search results.
function clearSearchResults() {
  $("#images").html("");
}

function addSearchResult(result) {



var image = document.createElement("img");
  image.src = result.url; // reset the value of the the href
  

  $('#images').append(image);


}





//       (function ($) {
//     var slideshow = (function () {
//         var counter = 0,
//             i,
//             j,
//             slides =  $("#slideshow"),
//             slidesLen = slides.length - 1;
//         for (i = 0, j = 9999; i < slides.length; i += 1, j -= 1) {
//             $(slides[i]).css("z-index", j);
//         }
//         return {
//             startSlideshow: function () {
//                 window.setInterval(function () {
//                     if (counter === 0) {
//                         slides.eq(counter).fadeOut();
//                         counter += 1;
//                     } else if (counter === slidesLen) {
//                         counter = 0;
//                         slides.eq(counter).fadeIn(function () {
//                             slides.fadeIn();
//                         });
//                     } else {
//                         slides.eq(counter).fadeOut();
//                         counter += 1;
//                     }
//                 }, 2000);
//             }
//         };
//     }());
//     slideshow.startSlideshow();
// }(jQuery));


