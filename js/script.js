//html elements
// var inputEl = document.querySelector('[name="search"]');
// var btnEl = document.getElementById("submit");
// var stopEl = document.getElementById("stop");
// var pictureEL = document.getElementById("picture");

var submitBtn;
var stopBtn;
var inputEl;
var pictureEl;
var slidesEl;
var splash;
var searchTerm = '';
var searchUrl1 = 'https://www.reddit.com/search.json?q='
var searchUrl2 = '+nsfw:no';
var url = '';
var imageIndex = 0;
var handle = null;

document.addEventListener('DOMContentLoaded', function(){
    inputEl = document.querySelector('[name="search"]');
    submitBtn = document.getElementById("submit");
    pictureEl = document.getElementById("picture");
    splash = document.getElementById("splash");
    stopBtn = document.getElementById("stop");

    stopBtn.addEventListener('click', function(e) {
        clearInterval(handle);
        splash.style.visibility = "visible";
        stopBtn.style.visibility = "hidden";
        pictureEl.src = "https://placekitten.com/200/200"
    })

    submitBtn.addEventListener("click", function(e) {    
        searchTerm = inputEl.value;
        inputEl.value = '';
        splash.style.visibility = "hidden";
        stopBtn.style.visibility = "visible";
        url = searchUrl1 + searchTerm + searchUrl2;
        fetch(url)
            .then(function(data) {
                return data.json();
            })
            .then(function(json) {
                console.log(json.data.children[1].data.thumbnail);
                var newThumbs = json.data.children.map(function(thumb) {
                    return thumb.data.thumbnail;
                })
                pictureEl.src = newThumbs[0];
                handle = setInterval(function() {
                    if (imageIndex >= newThumbs.length) {
                        imageIndex = -1
                    }
                    imageIndex++;
                    pictureEl.src = newThumbs[imageIndex];
                }, 1000);
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
