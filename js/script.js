/*function userSearch() {
//user is going to call this fucntion when they submit their html form. 
//then you're going to get their search string 
//and build up your fetch url like above exampel... that's all... 
    var form, search; 
    form=document.getElementById("form"); 
    search=form.elements["search"].value; 
    console.log(search);

    var url = 'https:www.reddit.com/search.json?q='; 
    var searchQuery = search; 
    var conCatURL = url + searchQuery; 
    console.log(conCatURL); 

     fetch(conCatURL)
    
     .then(function(responseData) {
        return responseData.json();
      })
      .then(function(jsonData) {
        console.log(jsonData);
       
        var searchString = jsonData;
        console.log(searchString); 
        searchString.children.forEach(function(searchString) {
        var item = document.createElement('li');
        item.textContent = searchString.author;
        myList.appendChild(item);
        }) 

    })

}*/
var button;
var stopButton;
var searchbox;
var show;
var content;
//this holds the user's search phrase 
var searchterm = '';
var firstPart = 'https:www.reddit.com/search.json?q=';
var lastPart = '+nsfw:no';
var url = '';
var imageIndex = 0;
var handle = null;
// This event fires when the page is fully loaded 
document.addEventListener('DOMContentLoaded', function() {
button = document.getElementById('searchbutton');
searchBox = document.getElementById('searchterm');
show = document.getElementById('show');
splash = document.getElementById('splash');
content = document.getElementById('content');
//content = document.getElementById('stop');
stopButton = document.getElementById('stop')

  /*stopButton.addEventListener('click', function(event) {
  splash.classList.remove('visible');
  splash.classList.add('hidden');
  content.classList.add('visible');
  content.classList.remove('hidden');



})*/
  stopButton.addEventListener('click', function(event) {
  splash.classList.add('visible');
  splash.classList.remove('hidden');
  content.classList.add('hidden');
  content.classList.remove('visible');



})

 button.addEventListener('click', function(event) {
 searchTerm = searchBox.value;
 searchBox.value = '';
 splash.classList.remove('visible');
 splash.classList.add('hidden');
 content.classList.add('visible');
 content.classList.remove('hidden');

 url = firstPart + searchTerm + lastPart;
 fetch(url)
 .then(function(data) {
   return data.json();
 })
  .then(function(json) {
    //console.log(json.data.children[1].data.thumbnail);
    var newThumbs = json.data.children.map(function(thumb) {
      return thumb.data.thumbnail;
    }); 
  // show.src = (json.data.children[1].data.thumbnail)
  show.src =newThumbs[0]
 handle = setInterval(function() {
   if (imageIndex >= newThumbs.length) {
     imageIndex = -1; 
   }
   imageIndex++;
   show.src = newThumbs[imageIndex];
 }, 3000);
});
  });

});
