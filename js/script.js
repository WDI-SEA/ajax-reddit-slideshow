var searchScreen = document.getElementById("searchScreen");

var button = document.getElementsByTagName('button')[0];

var inputBox = document.getElementsByTagName("input")[0];

var thumbnails = [];

var show = document.getElementById("show");

var lastPart = "+nsfw:no";

var imgIndex = 0;

var handle = null;


button.addEventListener('click', function(e) {
    if (inputBox.value !== '') {
        var text = inputBox.value;
        searchScreen.style.display = "none";
        var url = 'http://www.reddit.com/search.json?q='+ text + lastPart;
        console.log(url);
        fetch(url)
            .then(function(responseData) {
                return responseData.json();
            })
            .then(function(jsonData) {
                // console.log(jsonData);
                var searchArray = jsonData.data.children; 
                // console.log("test", searchArray[1].data.thumbnail);
                thumbnails = searchArray.map(function(child) {
                    // console.log(child.data.thumbnail);
                    return child.data.thumbnail;
                });
                // console.log(thumbnails);
                show.src = thumbnails[0]
                handle = setInterval(function(){ 
                    imgIndex++;
                    show.src = thumbnails[imgIndex];
                }, 2000);
            });
    }
});















