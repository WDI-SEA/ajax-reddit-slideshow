
var redditUrlFirst = "https://www.reddit.com/search.json?q=";
var redditUrlLast = "+nsfw:no";
var url = "";
var searchWord = "";
var wordInput = "";
var imageIndex = 0;
var handle = null;

var description;
var playBttn;
var stopBttn;
var textInput;
var slide;

document.addEventListener("DOMContentLoaded", function() {
  description = document.getElementById("description");
  playBttn = document.getElementById("play");
  stopBttn = document.getElementById("stop");
  textInput = document.getElementById("text");
  slide = document.getElementById("slides");

  slide.style.display="none";

  playBttn.addEventListener("click", function(e) {
    wordInput = textInput.value;
    searchWord = String.fromCharCode(e.which).toLowerCase();
    textInput.value = ""; 
    url = redditUrlFirst + wordInput + redditUrlLast;

    fetch(url)
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        //console.log(json.data.childred[1].data.thumbnail);
        var newThumbs = json.data.children.map(function(thumb) {
          return thumb.data.thumbnail;
        });
        slide.src = newThumbs[0];
        handle = setInterval(function(){
          //can also use if(imageIndex >= newThumbs.length)
          if (imageIndex > 24) { 
            imageIndex = -1;
          }
          imageIndex++;
          slide.src = newThumbs[imageIndex];
        }, 800);
      
      });
    hideContent();
    slide.style.display = "inline-block";
    
    });

  stopBttn.addEventListener("click", function(e) {
    description.style.display = "block";
    textInput.style.display = "inline-block";
    slide.style.display = "none";
    clearInterval(handle);
    });
});

function hideContent() {
  description.style.display = "none";
  textInput.style.display = "none";
}

