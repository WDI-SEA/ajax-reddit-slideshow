// variables
var imageArr = [];
var posts;
var imgCountVal;

// DOM
var btnSearch = document.getElementById('btnsearch');
var searchDiv = document.getElementById('searchdiv');
var userSearchItem = document.getElementById('search');
var btnStop = document.getElementById('stop');
var slideShowDiv = document.getElementById('slideshowdiv');
var slideShowImg = document.getElementById('slideshowimg');
// functions
var init = function(){
    userSearchItem.value = '';
    imageArr = [];
    slideShowDiv.style.display = "none";
};
var initiateSearch = function(){
    slideShowImg.src = '';
    let searchLink = "http://www.reddit.com/search.json?q=" + userSearchItem.value + "+nsfw:no"
    userSearchItem.value = '';
    searchDiv.style.display = "none";
    slideShowDiv.style.display = "block";

    fetch(searchLink) 
        .then(function(responseData) {
        return responseData.json();
        })
        .then(function(jsonData) {
        
        posts = jsonData.data.children
        
        
        for (let i = 0; i < posts.length; i++){
            imgCountVal = i;
            setInterval(cycleImages,100);
            // if (i === posts.length){
            //     i = 0;
            // }
             
        };
        
        
    });
};

var cycleImages = function(){
    slideShowImg.src = posts[imgCountVal].data.thumbnail;
    console.log(slideShowImg.src);
}

var showSearchBar = function(){

    if (searchDiv.style.display === "none") {
        searchDiv.style.display = "block";
    } 
    if (slideShowDiv.style.display === 'block'){
        slideShowDiv.style.display = 'none';
    }

    clearInterval(cycleImages);

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