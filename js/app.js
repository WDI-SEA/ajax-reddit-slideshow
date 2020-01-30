document.addEventListener('DOMContentLoaded', function()
{
    // find and assign certain DOM elements to display
    display.searchForm = document.querySelector('#search-images-form');
    display.cancelSlideshow = document.querySelector('#cancel-slideshow-form');
    display.imageDisplay = document.querySelector('#image-present');
    display.searchDiv = document.querySelector('#search-form');

    // add event listeners
    display.searchForm.querySelector('#send-search').addEventListener('click', searchForImages);
    display.cancelSlideshow.querySelector('#stop-slideshow').addEventListener('click', Slideshow.stopSlideshow);
}
);

// slide show timer
let imageTimer;

// contains the DOM elements to interact with
const display = {
    searchForm: null,
    imageDisplay: null,
    cancelSlideshow: null,
    searchDiv: null
};

// search for pictures to show in slideshow
const searchForImages = function(event) {
    event.preventDefault();
    let keyword = document.querySelector('#keyword').value;
    retrieveImagesWithKeyword(keyword, Slideshow.populateSlideshow);
};

// retrieve images
function retrieveImagesWithKeyword(keyword, callback) {
    fetch(`https://reddit.com/search.json?q=${keyword}+nsfw:no`).then((data)=>{
        return jsonfy(data);
    })
    .then((unfilteredJson)=>{
        // filter for images and return their url and title
        return selectTitleAndUrlOfImages(unfilteredJson);
    }).then((data)=>{
        // calls Slideshow.populateSlideshow
        callback(data);
    });
};

// can't live in Slideshow object
function startSlideshow() {
    display.searchDiv.style.display = 'none';
    display.cancelSlideshow.style.display = 'block';
    display.imageDisplay.style.display = 'block';
    Slideshow.changeImage();
    imageTimer = setInterval(function(){
        Slideshow.changeImage();
     }, slideshowValueContainer.interval);3
};

// this object controls the slideshow
const Slideshow = {
    populateSlideshow: (dataTransferObject)=> {
        // empty current images
        slideshowValueContainer.clearImages();
        // populate the data container with URLs
        for (dto of dataTransferObject) {
            slideshowValueContainer.images.push(dto.url);
        }
        // then start the slideshow
        this.startSlideshow();
    },
     
    changeImage: ()=>{
        console.log(slideshowValueContainer.images[slideshowValueContainer.currentIndex]);
        display.imageDisplay.querySelector('img').src=slideshowValueContainer.images[slideshowValueContainer.currentIndex];
        slideshowValueContainer.increaseIndex();
    },

    stopSlideshow:(event) => {
        event.preventDefault();
        // stop the timer
        clearInterval(imageTimer);
        // hide and show relevant DIVs
        display.searchDiv.style.display = 'block';
        display.cancelSlideshow.style.display = 'none';
        display.imageDisplay.style.display = 'none';    
    }
};

function selectTitleAndUrlOfImages(unfilteredJson) {
    // get title and url from all images
    return unfilteredJson.data.children.filter(function(redditJson)
        {
            // check if it is an image
            if (typeof redditJson.data.thumbnail_height === 'number')
            {
                return redditJson;
            }
        }).map((filteredJson)=>{ 
            return {
                title: filteredJson.data.title,
                url: filteredJson.data.url
            }
        });
}

function jsonfy(data) {
    return data.json();
}

const slideshowValueContainer = {
    currentIndex: 0,
    images: [],
    interval: 5000,
    clearImages: function() {
        this.images = [];
    },
    increaseIndex: function() {
        if (this.currentIndex + 1 < this.images.length - 1) 
        {
            this.currentIndex++;
        }
        else 
        {
            this.currentIndex = 0;
        }
    }
};