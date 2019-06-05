//html elements
// var inputEl = document.querySelector('[name="search"]');
// var btnEl = document.getElementById("submit");
// var stopEl = document.getElementById("stop");
// var pictureEL = document.getElementById("picture");

var submitBtn;
var inputEl;
var pictureEl;
var splash;
var searchTerm = '';
var searchUrl1 = 'https://www.reddit.com/search.json?q='
var searchUrl2 = '+nsfw:no';
var url = '';


document.addEventListener('DOMContentLoaded', function(){
    inputEl = document.querySelector('[name="search"]');
    submitBtn = document.getElementById("submit");
    pictureEL = document.getElementById("picture")
    splash = document.getElementById("splash")
    
    submitBtn.addEventListener("click", function(e) {    
        searchTerm = inputEl.value;
        inputEl.value = '';
        url = searchUrl1 + searchTerm + searchUrl2;
        fetch(url)
            .then(function(data) {
                return data.json();
            })
            .then(function(json) {
                var posts = json.data.children[1].data.thumbnail;
                console.log(posts);
                pictureEl.src = json.data.children[1].data.thumbnail
        });
    });
});





//functions
// function startSearch() {
// }

// function cyclePics(ticker) {
//     pictureEL.src = picArray;
// }

// var interval = setInterval(cyclePics, 6000);

//event listeners
// btnEl.addEventListener("click", function(t) {    
//     var textInput = inputEl.value;
//     startSearch(textInput);
//     inputEl.value = '';
//     interval;
// });

// stopEl.addEventListener("click", function(t) {
    //do the clear interval thing.
    //make buttons come back
// });
