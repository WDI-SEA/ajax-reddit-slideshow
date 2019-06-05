//declare all variables globally for the elements
var button;
var stopButton;
var searchBox;
var show;
var splash;
var content;

// this holds the users search phrase
var searchTerm = '';
var firstPart = "http://www.reddit.com/search.json?q=";
var lastPart = "+nsfw:no";
var url = '';
var imageIndex = 0;
var handle = null; //uninitialized-

//this program fires AFTER whole page has loaded
document.addEventListener('DOMContentLoaded', function() {
    button = document.getElementById('searchbutton');
    searchBox = document.getElementById('searchterm');
    show = document.getElementById('show');
    splash = document.getElementById('splash');
    content = document.getElementById('content');
    stopButton = document.getElementById('stop');

    stopButton.addEventListener('click', function(e) {
        clearInterval(handle);
        splash.classList.add('visible');
        splash.classList.remove('hidden');
        content.classList.remove('visible');
        content.classList.add('hidden');
    })


    //use function(e) or e event bcs it is set up as input
    button.addEventListener('click', function(e) {
        searchTerm = searchBox.value;
        searchBox.value ='';
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
                // console.log(json.data.children[1].data.thumbnail);
                var newThumbs = json.data.children.map(function(thumb) {
                    return thumb.data.thumbnail;
                });
                show.src = newThumbs[0];
                handle = setInterval(function() {
                    if (imageIndex > newThumbs.length) {
                      imageIndex = -1;
                    }
                    imageIndex++;
                    show.src = newThumbs[imageIndex];
                }, 3000);
          });
    });
})