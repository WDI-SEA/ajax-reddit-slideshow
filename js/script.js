//variables
var array = [];

//html elements
var inputEl = document.querySelector('[name="search"]');
var btnEl = document.getElementById("submit");
var stopEl = document.getElementById("stop");
var pictureEL = document.getElementById("picture")


//functions
function startSearch() {
    fetch('https://www.reddit.com/search.json?q=' + inputEl.value + '+nsfw:no')
    .then(function(data) {
        return data.json();
    })
    .then(function(json) {
        var posts = json.data.children;
        console.log(posts);
        for (i = 0; i < posts.length; i++) {
            array.push(posts[i].data.thumbnail);
        }
    })
}

function cyclePics(array) {
    setInterval(function(e) {
        var i = 0;
        pictureEL.src = array[i];
        i++
    }, 6000)

}

//event listeners
btnEl.addEventListener("click", function(t) {    
    var textInput = inputEl.value;
    startSearch(textInput);
    inputEl.value = '';
    cyclePics();
});

stopEl.addEventListener("click", function(t) {
    //do the clear interval thing.
    //make buttons come back
});
