// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $('#search-form').on('submit', search);
});


function search(event) {

  // Stop the form from changing the page.
  event.preventDefault();

  //clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var userInput = $('#query').val() || 'kittens';
  //*NOTE: || assigns a default value of kittens if the first portion doesn't return anything
  //*NOTE: empty string is a falsey value which is why it default to kittens
 // console.log('user input was', userInput);

  $.get('https://www.reddit.com/search.json', {
 // To change the # of results returned
    }).done(function(response) {
   console.log(response.data.children); // Object of search results returned from Reddit
    addSearchResult(response.data.children); // Sends data to addSearchResult Function
  });

  $("#searchInput").hide();
}

//Clear previous search results.
// function clearSearchResults() {
//   $('#w3-content w3-display-container').empty();
// }


// Adds a single result object to the page.
function addSearchResult(results) {

  var images = [];
  
  for(var i = 0; i < results.length; i++) {
  // Create a list item to contain the search result link
      

      // var source = img.src;
      var source = results[i].data.thumbnail;
      if (source === "self" || source === "default" || source === "image") {
        i++;
      } else {
              images.push(source);
      };
  };

  var div = document.createElement('div');
  var img = document.createElement('img');
  $('#slideshow').append(div);
  $(div).append(img);

  function myStopFunction() {
    clearInterval(interval);
  }

  var button = document.createElement('button');
  $(button).attr("id", 'stopSlideShow').text("stop please");
  $('#stopButton').append(button).click(myStopFunction);

  var button = document.createElement('button');
  $(button).attr("id", 'stopSlideShow').text("stop please");
  $('#stopButton').append(button).click(myStopFunction);


  var count = 0;
  var interval = setInterval(function() {
    console.log(images[count]);

    $('img').attr("src", images[count]);
    count++;
    
  },1000);


  // $('#stopSlideShow').click(function () {
  //   if (this.id == 'clicked') {
        
  //   };
  // });

  // var stopButton = document.createElement('button');
  // $('#stopButton').attr("id", 'stopSlideShow');
  // $('#stopSlideShow').append(stopButton);


}

// $('#stopSlideShow').click(function () {
//     if (this.id == 'stopSlideShow') {
//         count = 0;
//     };
//   });

