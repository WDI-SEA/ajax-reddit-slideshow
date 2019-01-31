
// click
    // get images from Reddit API
        // get value of textbox
        // insert value into API url
        // fetch Reddit url
            // promise data.json()
            // promise do something with the data
                // look inside the object to see where the data is

var handle = null;
var textBox;
var imgElement;

document.addEventListener("DOMContentLoaded", function () {
    textBox = document.getElementById("searchterm");
    imgElement = document.querySelector("img");

    document.getElementById("stop").addEventListener("click", function() {
        clearInterval(handle);
    })

    document.getElementsByTagName("button")[0].addEventListener("click", function() {
        var searchTerm = document.getElementById("searchterm").value;
        var url = ("http://www.reddit.com/search.json?q=" + searchTerm + "+nsfw:no");
        fetch(url)
            .then(function(data) {
                return data.json();
            })
            .then(function(json) {
                var images = [];
                var imageCounter = 0;
                console.log(json.data.children[0].data.url);
                json.data.children.forEach(function(item) {
                    images.push(item.data.url);
                })
                image = images.filter(function(image) {
                    if (image.includes("jpeg") || image.includes("jpg") || image.includes("png")) {
                        return true;
                }   else {
                        return false;
                }
                })
                handle = setInterval(function() {
                    document.querySelector("img").src = images[imageCounter];
                    imageCounter++;
                    if (imageCounter === images.length) {
                        imageCounter = 0;
                    }
                }, 1000);                        
            })
      })
})