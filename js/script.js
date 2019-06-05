
var btnEl = document.getElementById("search");
var btnEl2 = document.getElementById("reset");
var input = document.querySelector("[name='input']");
var slideshow = document.getElementById("images");
var welcome = document.getElementById("welcome");
var stop = document.getElementById("stop");
var images = [];
var image;
var index = 0;
var intervalHandle;

btnEl.addEventListener("click", function() {
    var inputSearch = input.value;
    input.value = "";
    welcome.classList.add("hidden");
    stop.classList.remove("hidden");
    fetch('http://www.reddit.com/search.json?q=' + inputSearch + '+nsfw:no')
        .then(function(data) {
            return data.json();
        })
        .then(function(json) {
            var pics = json;
            pics.data.children.forEach( function(pic) {
                images.push(pic.data.url);
            })
            intervalHandle = setInterval(function () {
                var image = document.createElement("img");
                image.setAttribute("src",images[index])
                slideshow.appendChild(image);
                index++; 
            }, 1000);
            slideshow.removeChild(image);


            console.log(pics);
            })
});
// var loadImage = function() {
//     var index = 0;
//     var image = document.createElement("img");
//     image.setAttribute("src",images[index])
//     slideshow.appendChild(image);
//     index++; 
// }


// var intervalHandle = setInterval(loadImage, 10000);


btnEl2.addEventListener("click", function() {
    clearInterval(intervalHandle);
});



//Get Reddit images


// fetch('http://www.reddit.com/search.json?q=' + cats + '+nsfw:no')
//   .then(function(data) {
//     return data.json();
//   })
//   .then(function(json) {
//     var astros = json;
//     astros.people.forEach(function (astro) {
//         var item = document.createElement("li");
//         item.textContent = astro.name;
//         myList.appendChild(item);
//     })
// });