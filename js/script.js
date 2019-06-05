// variables


// DOM
var btnSearch = document.getElementById('btnsearch');
var searchDiv = document.getElementById('searchdiv');
var userSearchItem = document.getElementById('search');
 


// functions
var init = function(){
    userSearchItem.value = '';
}
var initiateSearch = function(){
    console.log("initiate search");
    console.log("Search: " + userSearchItem.value);

}


// event listeners

btnSearch.addEventListener('click', initiateSearch);
