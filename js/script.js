// Solution from Steve in class
var button;
var reset;
var searchBox;
var show;
var welcome;
var images;
// This holds the user's search phrase
var searchTerm = "";
var firstPart = "http://www.reddit.com/search.json?q="
var lastPart = "+nsfw:no"
var url = "";
var imageIndex = 0;
var handle = null;

// This event fires when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() { //absolutely necessary if script line in the index.html file is in the head
    button = document.getElementById("searchbutton");
    searchBox = document.getElementById("searchterm");
    show = document.getElementById("show");
    welcome = document.getElementById("welcome");
    images = document.getElementById("images");
    stop = document.getElementById("stop");
    reset = document.getElementById("resetbutton");
    button.addEventListener("click", function(e) {
        searchTerm = searchBox.value;
        searchBox.value = "";
        welcome.classList.remove('visible');
        welcome.classList.add('hidden');
        images.classList.add('visible');
        images.classList.remove('hidden');
        stop.classList.remove('hidden');
        stop.classList.add('visible');
        reset.classList.remove('hidden');
        reset.classList.remove('visible');
        url = firstPart + searchTerm + lastPart;
        fetch(url) //one long chain statement so don't have ; after fetch or then until the end.
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
                    if (imageIndex >24) {
                        imageIndex = -1;
                    }
                    imageIndex++;
                    show.src = newThumbs[imageIndex];
                }, 1000);    
            });
    });
    reset.addEventListener("click", function(e) {
        clearInterval(handle);
        imageIndex = 0;
        welcome.classList.add('visible');
        welcome.classList.remove('hidden');
        images.classList.remove('visible');
        images.classList.add('hidden');
    });

})


// Nathan's original work 6/4/2019

// var btnEl = document.getElementById("search");
// var btnEl2 = document.getElementById("reset");
// var input = document.querySelector("[name='input']");
// var slideshow = document.getElementById("images");
// var welcome = document.getElementById("welcome");
// var stop = document.getElementById("stop");
// var images = [];
// var image;
// var index = 0;
// var intervalHandle;

// btnEl.addEventListener("click", function() {
//     var inputSearch = input.value;
//     input.value = "";
//     welcome.classList.add("hidden");
//     stop.classList.remove("hidden");
//     fetch('http://www.reddit.com/search.json?q=' + inputSearch + '+nsfw:no')
//         .then(function(data) {
//             return data.json();
//         })
//         .then(function(json) {
//             var pics = json;
//             pics.data.children.forEach( function(pic) {
//                 images.push(pic.data.thumbnail);
//             })
//             intervalHandle = setInterval(function () {
//                 var image = document.createElement("img");
//                 image.setAttribute("src",images[index])
//                 slideshow.appendChild(image);
//                 index++; 
//             }, 1000);
//             slideshow.removeChild(image);


//             console.log(pics);
//             })
// });



// btnEl2.addEventListener("click", function() {
//     clearInterval(intervalHandle);
// });



//Get Reddit images


