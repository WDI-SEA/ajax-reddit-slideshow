  $(document).ready(function() {

function intoArray(data) {
 // assign the children array to a variable
  var childrenArray = data.data.children;
  // use filter to return a new array of full objects that have the "preview"
  //property. Note: this does not RETURN an array that starts at .children.
  // The returned array starts at the very beginning. Don't confuse with .map()
  // .filter doesn't ever shrink the original array. It returns the full objects
  // that have the criteria you want.
  var filteredArray = childrenArray.filter(function(data) {
    if (data.data.hasOwnProperty('preview')) {
      return true;
    } else {
      return false;
    }
  })
  // console.log(filteredArray);
  // returns stuff that has preview. returns the whole object, not just a part of it

// NOW we are going to return a new "shrunken" array using .map()
  var urlArray = filteredArray.map(function(data) {
     return data.data.preview.images[0].source.url;
  })
  // console.log(urlArray);

  showImage(urlArray);
}

function showImage(imagesArray) {
  imagesArray.forEach(function(url) {
    $('#slideshow').append('<img src="'+ url +'">');
  })
}

// create a button that grabs the content from the text box (called #inputBox)
$('#button').click(function(e) {
  e.preventDefault();
  var searchTerm = $('#inputBox').val();

// connect to Reddit's API and search using the searchTerm entered
  $.get('https://www.reddit.com/search.json', {
    q: searchTerm
  }).done(function(data) {
    console.log('Done is successful!');

// the data returned from Reddit is assigned to the searchData variable
    var searchData = data;
    // console.log(searchData);

// call the function that takes the data from Reddit
// and filters it into a new array of only images
// by passing searchData into the function
    intoArray(searchData);

  }).fail(function(data) {
      console.log('It failed!');
  }).always(function(data) {
      console.log('Always is successful')
  })

// Since this is still inside the button click listener, once the button is
// clicked, the h1, form, and paragraph disappear.
  $('h1').hide();
  $('form').hide();
  $('p').hide();


});

$('#stopSlideShow').on('click', function(e) {
  e.preventDefault();
  //stop the animation with .clear interval
});



// create a function that grabs the images and puts them in an array.
  // function getImages() {
  //   var imageArray = [];
  //   imageArray =
  // };

// });

// Code from To-Do list

// $('#button').click(function(e) {
//   var toDoEntered = $('#inputBox').val();
//   e.preventDefault();
//   $('#list').append('<li>'+toDoEntered+'  <span class="remove">remove</span>'+'</li>');
//   $('#inputBox').val('');
//   $('#inputBox').focus();
// });

// $('#list').on('click', 'li', function() {
//   $(this).remove();
//   $('#inputBox').focus();
// });

// code from CodePen today http://codepen.io/ryanrotz/pen/aZzYqb?editors=1010

// var myData;

// $.get('https://www.reddit.com/search.json', {
//   q: 'kittens'
// }).done(function(data) {
//   console.log('success!');
//   // console.log(data);  not needed
// }).fail(function(data) {
//   console.log('failed!');
//   // console.log(data);  not needed
// }).always(function(data) {
//   console.log('always');
//   console.log('data');
//   myData = data;
//   logMyData(); // everything has to be inside the promises
// });

// function logMyData() {
//   console.log("My Data is: ", myData);
// }
//put this function above the promises
// or just put the conosle log inside the .always function




});
