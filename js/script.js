// variables
var imageArr = [];

// DOM
var btnSearch = document.getElementById('btnsearch');
var searchDiv = document.getElementById('searchdiv');
var userSearchItem = document.getElementById('search');
var btnStop = document.getElementById('stop');

// functions
var init = function(){
    userSearchItem.value = '';
    imageArr = [];
};
var initiateSearch = function(){
    //console.log("Search: " + userSearchItem.value);
    let searchLink = "http://www.reddit.com/search.json?q=" + userSearchItem.value + "+nsfw:no"
    //console.log("link = " + searchLink);
    userSearchItem.value = '';
    searchDiv.style.display = "none";


    fetch(searchLink) 
        .then(function(responseData) {
        return responseData.json();
        })
        .then(function(jsonData) {
        //console.log(jsonData);
        

        let posts = jsonData.data.children
        for (let i = 0; i < posts.length; i++){
            imageArr = posts[i].data.thumbnail;
        };
    });
    
    console.log(imageArr);
};


var showSearchBar = function(){
    let status = searchDiv.style.display;
    //console.log(status);
    if (status === "none") {
        searchDiv.style.display = "block";
    } 
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



// data
// children
// Array [0]…[n]
// data
// thumbnail