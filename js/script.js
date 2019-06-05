
var values = [];
var imagesArray = [];
var slideIndex = 0;
var redditUrlFirst = "https://www.reddit.com/search.json?q=";
var redditUrlLast = "+nsfw:no";
var url = "";
var searchWordArray = [];
var searchWord = "";
var clearInterval;
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
          imageIndex++;
          slide.src = newThumbs[imageIndex];
        }, 3000);
      });
    hideContent();
    
    });

    stopBttn.addEventListener("click", function() {
      showContent();
      clearInterval(handle);
    });
})

function showContent() {
  if (description.style.display === "none" && textInput.style.display === "none") {
    description.style.visibility = "visible";
}};

function hideContent() {
  description.style.display = "none";
  textInput.style.display = "none";
  //document.getElementById("show").style.display = "none";
}

//Event listener for Play button
/*
playBttn.addEventListener("click", function(e) {
  var wordInput = textInput.value;
  searchWord = String.fromCharCode(e.which).toLowerCase();
  textInput.value = ""; 
  searchWordArray = searchWordArray + wordInput;
  redditUrl = redditUrl + searchWordArray;
  
  console.log(searchWordArray);
  console.log(redditUrl);
  
  fetch(redditUrl) 
    .then(function(responseData) {
      return responseData.json();
    })
    .then(function(jsonData) {
      for (var i = 0; i < 1000; i++) {
        values = jsonData.data.children[i].data.thumbnail;
        document.getElementById("slides").src = jsonData.data.children[i].data.thumbnail;
        //console.log(values);
        imagesArray.push(values);
        console.log(imagesArray);

        //document.getElementById("slides").src = jsonData.data.children[i].data.thumbnail;
        //console.log(jsonData.data.children[1].data.thumbmail);
*/
        /*
        var intervalHandle = setInterval(function() {
          for (var j = 0; j < 25; j++) {
            document.getElementById("slides").src = jsonData.data.children[j].data.thumbnail;
          }
        }, 5000);
      }
      */
        //images.forEach(function(item) {
    //}
    
    //})
    //hideContent();
    //playSlides();
    /*
    textInput.addEventListener("click", function(e) {
      e.preventDefault()
    });
    */
    
  
//});

/*
function playSlides() {
  for (var i = 0; i < imagesArray.length; i++) {
    document.getElementById("slides").src = imagesArray[i];
    //document.getElementById("slides").src = jsonData.data.children[i].data.thumbnail;
  }
    intervalHandle = setInterval(playSlides, 2000);
  
}
*/

/*
//Event listener for stop button:
stopBttn.addEventListener("click", function() {
  showContent();
  clearInterval(intervalHandle);
});*/

/*
stopBttn.onclick = function() {
  showContent();
}
*/



 



