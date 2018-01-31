$(document).ready(function() {
    document.forms["searchBox"].addEventListener("submit", submitSearch);
});

var searchResults = null;

function displayResults(results) {
    var posts = results.data.children;
    console.log(posts);
    posts.forEach(function(post){
        $("#results").append("<img src='" + post.data.thumbnail + "'>");
    });
}

function submitSearch(e) {
    e.preventDefault();
    search = document.forms["searchBox"].elements["search"].value;
    searchReddit(search);
}

function searchReddit(search) {
    var URL = "http://www.reddit.com/search.json?q=" + search + "+nsfw:no";
    var myXHTTP = new XMLHttpRequest();
    myXHTTP.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            searchResults = JSON.parse(this.responseText);
            displayResults(searchResults);
        }
    }
    myXHTTP.open("GET", URL, true);
    myXHTTP.send();
}
