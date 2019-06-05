
var values = [];
var imagesArray = [];
var slideIndex = 0;
var redditUrl = "https://www.reddit.com/search.json?q=";
var searchWordArray = [];
var searchWord = "";

var description = document.getElementById("description");
var playBttn = document.getElementById("play");
var stopBttn = document.getElementById("stop");
var textInput = document.getElementById("text");
var slide = document.getElementById("slides");

//Event listener for Play button
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

        /*
        var intervalHandle = setInterval(function() {
          for (var j = 0; j < 25; j++) {
            document.getElementById("slides").src = jsonData.data.children[j].data.thumbnail;
          }
        }, 5000);
      }
      */
        //images.forEach(function(item) {
    }
    
    })
    hideContent();
    /*
    textInput.addEventListener("click", function(e) {
      e.preventDefault()
    });
    */
    
  
});

//Event listener for stop button:
stopBttn.addEventListener("click", function(e) {
  showContent();
});

function hideContent() {
  description.style.display = "none";
  textInput.style.display = "none";
}

function showContent() {
  if (description.style.display === "none" && textInput.style.display === "none") {
    description.style.visibility = "visible";
}};
