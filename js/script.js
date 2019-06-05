var button; //button to search
var stopButton;
var searchBox; //box for user input
var show; // show image
var title; // 
var content;
//User search info
var searchTerm = '';
var firstPart = 'https://www.reddit.com/search.json?q=';
var lastPart = '+nsfw:no';
var url;
var imageIndex = 0;
var handle = null;

document.addEventListener("DOMContentLoaded", function() {
  button = document.getElementById('searchbtn');
  searchBox = document.getElementById('searchterm');
  show = document.getElementById('show');
  title= document.getElementById('title');
  content = document.getElementById('content');
  stopButton= document.getElementById('stop');

  stopButton.addEventListener('click', function(e) {
    clearInterval(handle);
    content.classList.remove('visible');
    content.classList.add('hidden');
    title.classList.add('visible');
    title.classList.remove('hidden');
  })

  button.addEventListener('click', function(event) {
    searchTerm = searchBox.value;
    searchBox.value = '';
    content.classList.remove('hidden');
    content.classList.add('visible');
    title.classList.add('hidden');
    title.classList.remove('visible');
    url = firstPart + searchTerm + lastPart;
    fetch(url)
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
          if (imageIndex >= newThumbs.length) {
            imageIndx = -1;
          }
          imageIndex++;
          show.src = newThumbs[imageIndex];
        }, 3000);
      });
  });
})

// function value(e) {
//   e.preventDefault();
  // var userInput = document.getElementById('searchInput').value;
  // if (userInput) {
  //   fetch(myURL+input)
  //   .then(function(data) {
  //       return data.json();
  //   })
      
  //   .then(function(json) {
  //     var post = json.data;
  //     console.log(post);
  //     postArray.forEach(function(post) {
  //       var imgItem = document.createElement('img');
  //       imgItem.textContent = post.thumbnail;
  //       postArray.append(imgItem);
  //     })
  //   })        
  // }
//}
//   searchTerm = searchInput.value;

  
// })

//   .then(function(json){
//     var searchs = json;
//     searchs.img.forEach(function(slide) {
//       var imgItem = document.createElement('img');
//       imgItem.value = slide.img;
//       mySlide.append(imgItem);
//     })
//   });

// var i = 0;
// var images = [];
// var time = 3000;

// function changeImage() {
//   document.
// }