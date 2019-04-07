// declaring the variable of the html items that change the page
var start = document.getElementById('start');
var clear = document.getElementById('clear');
var output = document.querySelector('#output');
var userInput = '';
var imgURLs = [];
var filteredimgURLs = [];
var i = 0;

function startTimer () {
  setInterval(changeImage, 1000);
  console.log('in start timer function');
  document.getElementById("output").style.display = 'inline-block';
  document.getElementById("start").style.display = 'none';
  document.getElementById("searchinput").style.display = 'none';
  document.getElementById("header").style.display = 'none';
  document.getElementById("main").style.display = 'inline-block';
}

function changeImage() {
  if ( i < filteredimgURLs.length) {
  document.getElementById("output").src = filteredimgURLs[i];
  console.log('in change image function');
  i++;
  }
}

// steve's sample code done as a code along in class
// keep for further reference

// var handle = null;
// var textBox;
// var imgElement;

// document.addEventListener('DOMContentLoaded', function() {
// textBox = document.getElementById.('searchterm')
// })

// var handle = null;
// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementsByTagName('button'[0].addEventListener('click', function(e) {
//     var searchTerm = textBox.value;
//     var url =`http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`;
//     fetch(url)
//       .then(function(data) {
//         return data.json();
//       })
//       .then(function(json) {
//         // console.log(json.data.children[0].data.url);
//         var images = [];
//         handle - setInterval(function() {

//         })
//         document.querySelector('img').src = json.data.children[0].data.url
//         json.data.children.forEach(function(item) {
//         console.log(item.data.url)
//         images.push(item.data.url)
//         })
//         handle = setInterval(function() {
//           document.querySelector('img').querySelector.src = images[imageCounter];
//           imageCounter++
//           if ( imageCounter === images.length) {
//             imageCounter = 0;
//           }
//         })
//       })
//   }))
// })



// ajax for searching API/outputting API results
function search() {
  fetch(`http://www.reddit.com/search.json?q=${userInput}+nsfw:no`) //searching for userinput within reddit API
  .then(function(data) {  // this is fine, just turning data into json
    return data.json(); // returning json of data
  })
  .then(function(json) { 
    console.log(json); //should be an object with a bunch of key value pairs
    json.data.children.forEach( function( child ) { //looking through each child
          imgURL = child.data.url; // outputting the imgURL as the .data.url of each child within the json
          // console.log('imgURL: ', imgURL);
          imgURLs.push( imgURL );
          // console.log('imgURLs: ', imgURLs );
          // make a new array that only has the urls that have 'jpg' and 'png'
          filteredimgURLs = imgURLs.filter( function ( element ) {
            return element.includes('png') || element.includes('jpg');
          })
          console.log('filteredimgURLS: ', filteredimgURLs );
          console.log('filtered imageURLs length1', filteredimgURLs.length)
        })
  })
  .then(function() {
    startTimer();      
  });
};

start.addEventListener('click', function(e) {
  e.preventDefault(); // prevents from submitting form and refreshing page
  userInput = document.forms['searchForm'].searchInput.value; // document.forms['tempform'].tempInput.value;
  console.log(userInput);
  search();
});

clear.addEventListener('click', function() {
  document.getElementById("start").style.display = 'inline-block';
  document.getElementById("searchinput").style.display = 'block';
  document.getElementById("header").style.display = 'inline-block';
  document.getElementById("main").style.display = 'none';
  output.style.display = 'none';
  output.style.background = 'none';
  document.getElementById("output").src = '#';
  userInput = '';
  imgURL = '';
  imgURLs = [];
  filteredimgURLs = [];
  i = 0;
  data = {};
  json = {};
  clearInterval(startTimer)
});