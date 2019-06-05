// variables
var imageArr = [];
var posts;
var searchLink = '';

// DOM Elements
var btnSearch;
var searchDiv;
var userSearchItem;
var btnStop;
var slideShowDiv;
var slideShowImg;
var imgCounter = 0;
var handle = null;


// DOM
//document.addEventListener("DOMContentLoaded", function(){ 
    btnSearch = document.getElementById('btnsearch');
    searchDiv = document.getElementById('searchdiv');
    userSearchItem = document.getElementById('search');
    btnStop = document.getElementById('stop');
    slideShowDiv = document.getElementById('slideshowdiv');
    slideShowImg = document.getElementById('slideshowimg');
//});

// functions

var init = function(){
    userSearchItem.value = '';
    imageArr = [];
    slideShowDiv.style.display = "none";
};
var initiateSearch = function(){
    slideShowImg.src = '';
    searchLink = "http://www.reddit.com/search.json?q=" + userSearchItem.value + "+nsfw:no"
    userSearchItem.value = '';
    searchDiv.style.display = "none";
    slideShowDiv.style.display = "block";
    imgCounter = 0;

    fetch(searchLink) 
        .then(function(data) {
        return data.json();
        })
        .then(function(json) {
        
        posts = json.data.children
        
        handle = setInterval(function() {
            cycleImages()
        },1000);
  
    });
};

var cycleImages = function(){
    slideShowImg.src = posts[imgCounter].data.url;
    imgCounter++
    if (imgCounter === posts.length){
        imgCounter = 0;
    }
}

var showSearchBar = function(){

    if (searchDiv.style.display === "none") {
        searchDiv.style.display = "block";
    } 
    if (slideShowDiv.style.display === 'block'){
        slideShowDiv.style.display = 'none';
    }
    clearInterval(handle);
};

// event listeners
btnStop.addEventListener('click', showSearchBar);
btnSearch.addEventListener('click', initiateSearch);

userSearchItem.addEventListener('keypress', function(e){
    let key = e.which || e.keyCode;
    if (key === 13) { 
        initiateSearch();
    }
});

init();

// data
// children
// Array [0]…[n]
// data
// thumbnail