var inputEl = document.querySelector('[name="input"]');
var btnEl = document.querySelector("button");
var content = document.getElementById('content');
var resetBtn = document.getElementsByClassName('reset');
var reset = null;
var contentimage = document.getElementById('image');

var slideShow = btnEl.addEventListener("click", function(e) {
  contentimage.style.display = "block";
  resetBtn[0].style.display = "block";
  content.style.display = "none";
  var textInput = inputEl.value;
  inputEl.value = "";
  console.log(textInput);
  var count = 0
  fetch('https://www.reddit.com/search.json?q=' + textInput + '+nsfw:no')
  .then(function(data) {
    return data.json();
  })
  .then(function(json) {
    var images = json;
    reset = setInterval(function() {
      document.getElementById('image').src = json.data.children[count++].data.thumbnail
      console.log(document.getElementById('image').src = json.data.children[count++].data.thumbnail);
    }, 4000)
    //document.getElementById('image').src = json.data.children[0].data.thumbnail
    
    })
});




resetBtn[0].addEventListener("click", function(e) {
  content.style.display = "inline-block";
  clearInterval(reset);
  contentimage.style.display = "none";
  resetBtn[0].style.display = "none";
});