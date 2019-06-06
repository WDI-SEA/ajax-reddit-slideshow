// var myList = document.getElementById('list');

// fetch( 'https://www.reddit.com/search.json?q=kittens')
//  .then(function(data) {
//    return data.json();
//  })
//  .then(function(json) {
//    var kittens = json;
//    kittens.people.forEach(function(astro){
//       var item= document.createElement('li');
//       item.textContent = astro.name;
//       myList.appendChild(item);

//    });

// });

// fetch('https://www.reddit.com/search.json?q=kittens') 
//   .then(function(responseData) {
//     return responseData.json();
//   })
//   .then(function(jsonData) {
//     console.log(jsonData);
//   });
var stopButton;
var button;
var searchterm;
var footnail;
var photos;
var cat;
var search = '';
var firstpart = "http://www.reddit.com/search.json?q=";
var secondPart = "+nsfw:no";
var url = '';
var imageIndex= 0;
var handle= null;

document.addEventListener('DOMContentLoaded', function(){
  button = document.getElementById('searchbutton');
  searchterm = document.getElementById('searchterm');
  cat = document.getElementById('cat');
  footnail = document.getElementById('footnail');
  photos= document.getElementById('photos');
  stopButton = document.getElementById('stop');

  stopButton.addEventListener('click',function(e){
    clearInterval(handle);
    
  })

  button.addEventListener('click',function(e){
    search = searchterm.value;
    searchterm.value = '';
    url = firstpart + search + secondPart;

  fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then (function(json){
      console.log (json.data.children);
      cat.src = json.data.children[0].data.thumbnail;
      var newThumb = json.data.children.map(function(thumb){
        return thumb.data.thumbnail;

      })//.filter( img => img.split('.')[img.split('.').length - 1] === 'jpg');
      cat.src = newThumb[0];
      handle = setInterval (function(){
        if (imageIndex > 24){
          imageIndex = -1
        }
        imageIndex++;
        cat.src = newThumb[imageIndex];

      },3000)
    })

  })

})