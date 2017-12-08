// See JSon File = https://www.reddit.com/search.json?q=joe&limit=3

var imgz = [];

// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  //TO DO
  $('#search-form').on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  //TO DO
  var userInput = $('#query').val() || 'kittens';
  console.log('user input was', userInput);

  //fade out search
  $('#search-form').fadeOut( "slow", function() {
  // Animation complete.
});

  $.get('https://www.reddit.com/search.json', {
  q: userInput,
  limit: 10
}).done(function(response) {
  console.log(response.data.children);
  addSearchResult(response.data.children);
});
}

// Clear previous search results.
function clearSearchResults() {
  //TO DO
  // document.getElementById('results').value = ''
  $('#results').html('');
}

// Adds a single result object to the page.
function addSearchResult(results) {
  //TO DO
  // Create a list item to contain the search result link
  for (var i = 0; i <results.length; i++){
    console.log(results[i].data.title);
      // create an anchor tag
    // var li = document.createElement('li');
    var par = document.createElement('P');
    var a = document.createElement('a');
    var img = document.createElement('img');
    // var imgz = results[i].data.preview.images;
    // var text = document.createElement('p');
    a.href = results[i].data.url;
    a.textContent = results[i].data.title;
    // a.style.fontSize = 25px;
    // img.src = results[i].data.thumbnail;
    imgz.push(results[i].data.preview.images[0].source.url) || console.log('kitten');
    // img.src = results[i].data.preview.images[0].source.url;
    // img.style.height = 35;
    // img.style.width = 35;
    // text.textContent = results[i].data.subreddit_name_prefixed;
      // put the link inside the list item.
    // $(li).append(text);
    // $(par).append(img);
    // $(li).append(a);
      // add the list item to the list of search results
    // $('#results').append(par).fadeIn();

    var imge = $('#background');
			imge.fadeOut(1000, function () {
        $('#background').css('background-image', 'url(' + imgz[0] + ')');
				// imge.css("background", "url('http://i.imgur.com/So7hhTG.png')");
				imge.css("background-size", "cover");
				imge.fadeIn(1000);
        // setTimeout(explode, 2000);
		 });

     // Slideshow not working? Waits 3 to call funct, but funct runs too fast
     // var slideshow = function () {
     //   for (i=0; i<length.imgz; i++) {
     //     var imge = $('#background');
     //       imge.fadeOut(1000, function () {
     //         $('#background').css('background-image', 'url(' + imgz[i] + ')');
     //         // imge.css("background", "url('http://i.imgur.com/So7hhTG.png')");
     //         imge.css("background-size", "cover");
     //         imge.fadeIn(1000);
     // setTimeout(slideshow, 3000);

     var reset = function () {
     $('#search-form').fadeIn("slow", $('#background').hide());
     imgz = [];
     $('.input').val('');
     $("#search-form").focus();
     location.reload();
     }
     $('body').on('click', reset)


  }

}



// Slideshow not working?
// var slideshow = function () {
//   for (i=0; i<length.imgz; i++) {
//     var imge = $('#background');
//       imge.fadeOut(3000, function () {
//         $('#background').css('background-image', 'url(' + imgz[i] + ')');
//         // imge.css("background", "url('http://i.imgur.com/So7hhTG.png')");
//         imge.css("background-size", "cover");
//         imge.fadeIn(3000);
