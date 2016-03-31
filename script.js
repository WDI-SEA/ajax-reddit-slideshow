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

    var input = $("#query")
    var userQuery =  input.val();
    

    $.get('https://www.reddit.com/search.json', {
      q: userQuery
      // nsfw: "no"
    }).done(function(response) {
      console.log(response);
      
    var results = response.data.children; 
    for(i = 0; i < results.length; i++) {
        var redditStuff = results[i].data;
        if(redditStuff.domain === "i.imgur.com" && redditStuff.url) {
        imArr.push(redditStuff.url);
        console.log(imArr);
        } 
      }
    changeSlide();
  });


  // Clear previous search results.
  function clearSearchResults() {
    $("#results").html("");
    $('#photo-div').html(""); 
    $('#submit').fadeIn();
    $('#submit').parent.fadeIn();
    imaArr= [];
  }

  //hides button and input
  $('#submit').click(function (){
     $(this).parent().fadeOut();
     $(this).fadeOut();
    });


  //stolen from Brent's code shamelessly
  function flashImage() {
      if ($('#photo-div').html()) {
        $('#photo-div').html("");
      }
      var html = '<img class="animate" src="' + imArr[counter] + '"/>'; 
      $('#photo-div').append(html); 
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
    nIntervId = setInterval(flashImage, 5000);
  }

  function stopSlide() {
    clearInterval(nIntervId);
  }

}

// // Adds a single result object to the page.
// function addSearchResult(arr) {
//  for (i = 0; i < arr.length; i++) {
//    var sepImage = arr[i];
//    var html = '<img src="' + sepImage + '"/>';
//    $('#slideshow').append(html);
//  }
// }






// $(window).load(function(){
// $('#dvLoading').fadeOut(2000);
// });
// loading stuff
