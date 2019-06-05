//variables
var array = [];
var count = 0

//html elements
var inputEl = document.querySelector('[name="search"]');
var btnEl = document.getElementById("submit");
var stopEl = document.getElementById("stop");
var pictureEL = document.getElementById("picture");
var splash = document.getElementById("splash")


//functions
function startSearch() {
    fetch('https://www.reddit.com/search.json?q=' + inputEl.value + '+nsfw:no')
    .then(function(data) {
        return data.json();
    })
    .then(function(json) {
        array = json.data.children.map(function (thumb) {
            return thumb.data.thumbnail
        })
        pictureEL.src = array[0];
    })
};


handle = setInterval(function() {
    if (count >= array.length) {
        count = -1
    }
    count++;
    pictureEL.src = array[count];
    }, 600);

//event listeners
btnEl.addEventListener("click", function(t) {    
    var textInput = inputEl.value;
    startSearch(textInput);
    inputEl.value = '';
    stopEl.style.visibility = "visible";
    splash.style.visibility = "hidden";
    cyclePics();
});

stopEl.addEventListener("click", function(t) {
    clearInterval(handle);
    splash.style.visibility = "visible";
    stopEl.style.visibility = "hidden";
    pictureEl.src = "https://placekitten.com/200/200"

});