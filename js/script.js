

// you're going to need this code for the homework

// var myList = document.getElementById("list");

// fetch('http://api.open-notify.org/astros.json')
//   .then(function(data) {
//     return data.json();
//   })
//   .then(function(json) {
//     var astros = json;
//     astros.people.forEach(function(astro) {
//         var item = document.createElement('li');
//         item.textContent = astro.name;
//         myList.appendChild(item);
//     })
// });


// When the user enters a search term and presses enter
// The form / title / description should hide
// Fetch related posts from reddit (with ajax)
// Display animation / slideshow of images (jQuery)
// Show a button to stop / reset the animation
// Repeat animation until use clicks "stop"


// the button needs to query the json
//  API with whatever is input in the text field





// THIS IS MY CODE COMMENTED OUT JUST BELOW




// var textAnchor = document.getElementById('input');
// var buttonAnchor = document.getElementById('button');
// var headAnchor = document.getElementsByTagName('h1');
// var hAnchor = document.getElementsByTagName('header');
// console.log("hello");

// function fetchJson() {
//     var textInput = textAnchor.value
//     // when user clicks the submit button)
//     fetch('http://www.reddit.com/search.json?q=' + textInput + '+nsfw:no')
//         .then( function(data) {
//           return data.json();
//         })
//         .then( function(json) {
//           var pictures = json.data.children.map( function(child) {
//             return child.data.url
//           }).filter( function(url) {
//               let arr = url.split('.')
//               return arr[arr.length -1 ] === 'jpg'
//           }) 
//           console.log(pictures)
//     });
 
// }

 
//  // if something is filled out in the input field
//  // and the button is clicked
//  // query the api and return an image and keep
//  // showing another image every 5 seconds

// buttonAnchor.addEventListener('click', fetchJson)








// THIS IS STEVE'S SOLUTION. NOT MINE.



// Steve's solution

var button;
var stopButton;
var searchBox;
var show;
var splash;
var content;
// searchTerm holds the user's search phrase
var searchTerm = '';
var firstPart = 'http://www.reddit.com/search.json?q=';
var lastPart = '+nsfw:no';
var url = '';
var imageIndex = 0;
var handle = null;


// this event fires when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // wtf does the line above do?
    button = document.getElementById('searchbutton');
    searchBox = document.getElementById('searchterm');
    show = document.getElementById('show');
    splash = document.getElementById('splash');
    content = document.getElementById('content');
    stopButton = document.getElementById('stop');

    stopButton.addEventListener('click',function(e) {
        clearInterval(handle);
        splash.classList.add('visible');
        splash.classList.remove('hidden');
        content.classList.remove('visible');
        content.classList.add('hidden');
    })

    button.addEventListener('click', function(e) {
        searchTerm = searchBox.value;
        searchBox.value = '';
        splash.classList.remove('hidden');
        splash.classList.add('visible');
        content.classList.add('hidden');
        content.classList.remove('visible');
        url = firstPart + searchTerm + lastPart;
        fetch(url)
            .then(function(data) {
                return data.json();
            })
            .then(function(json) {
                // console.log(json.data.children[1].data.thumbnail);
                var newThumbs = json.data.children.map(function(thumb) {
                    return thumb.data.thumbnail;
                });
                show.src = newThumbs[0];
                handle = setInterval(function() {
                    if (imageIndex >= newThumbs.length) {
                        imageIndex = -1;
                    }
                    imageIndex++;
                    show.src = newThumbs[imageIndex]
                }, 750);
                });


            });

    })
















