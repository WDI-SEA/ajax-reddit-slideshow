//hide search bar
//run timer
// When the user clicks the "stop" button
// Animation stops / images are removed
// Form / title / description are shown again
// User can enter a new search term

var api = "http://www.reddit.com/search.json?q=";
var imageSourceArray = [];
var intDelay = 2000
var currentIndex = 0
var interval 
var search = [];

document.addEventListener("DOMContentLoaded", main)

function main() {
    document.getElementById('search').addEventListener('submit', getValue)
    document.getElementById('stop').addEventListener('click', stop)
}; 

function getValue(e) {
    e.preventDefault() 

    var userInput = document.getElementById('query').value
  
    if(userInput) {
    
    fetch(api+userInput)
    .then(function(data) {
        return data.json()
    })
    .then(function(jsonData) {
        var postArray = jsonData.data.children
        imgSourceArray = postArray.map(function(post) {
            return {
                 subreddit: post.data.subreddit,
                 title: post.data.title,
                 url: post.data.url.replace(".gifv", ".gif")
            }
        })
        .filter(function(item) {
            return item.url.includes("i.imgur") || item.url.includes("i.redd")
        })
        postImage()
        clearInterval(interval)
        interval = setInterval(nextSlide, intDelay)
        })
        
} 
 }
            
       function postImage() {
        var slideshow = document.getElementById("slideshow")
        slideshow.textContent = ""
        var returnImg = document.createElement("img")
        returnImg.src = imgSourceArray[currentIndex].url
        slideshow.appendChild(returnImg)
       
        document.getElementById("title").textContent = imgSourceArray[currentIndex].title
    }
    
    function nextSlide() {
        currentIndex++
        if (currentIndex >= imgSourceArray.length) {
            currentIndex = 0
        }
        postImage()
    }
    

    function stop() {
        clearInterval(interval)
        document.getElementById('query').value = "";
        slideshow.textContent = "";
        title.textContent = "Slideshow Time!";
    };