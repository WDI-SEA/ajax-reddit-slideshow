
let searchForm;
let queryField;
let queryOption;
let submitBtn;
let searchResults;
let searchCarousel;
let stopBtn;

document.addEventListener("DOMContentLoaded", function() {

    searchForm = document.getElementById("search-form");
    searchResults = document.getElementById("search-results");
    queryField = document.querySelector("form")["query-field"];
    queryOption = document.querySelector("form")["search-option"];
    submitBtn = document.getElementById("submit-btn");
    searchCarousel = document.querySelector(".search-carousel");
    stopBtn = document.getElementById("stop-btn");

    searchResults.style.display = "none";

    submitBtn.addEventListener("click", submitRedditQuery);    
    stopBtn.addEventListener("click", stopSlideShow);
});

const initializeSlideShow = function() {
    $(document).ready(function() {
        $(".search-carousel").slick({
            autoplay: true,
            autoplaySpeed: 2500,
        });
    });
}

const submitRedditQuery = function(e) {
    e.preventDefault();

    let query = queryField.value;
    let option = queryOption.value;

    searchCarousel.innerHTML = " ";

    fetchRedditQuery(query, option);
};

const fetchRedditQuery = function(query, option) {

    let optionStr = option === "no"?"+nsfw:no":"";

    fetch(`https://www.reddit.com/search.json?q=${query.toLowerCase()}${optionStr}`)
        .then(function(responseData) {
            return responseData.json();
        })
        .then(function(jsonRedditData) {
            let result = jsonRedditData.data.children;
            let slideshowInfo = result.map(getSlideshowInfo);

            slideshowInfo.forEach(function(item, index) {
                createSlide(item);
            });
            initializeSlideShow();
            searchForm.style.display = "none";
            searchResults.style.display = "initial";
        });
};

const createSlide = function(data) {
    let slideDiv = document.createElement("div");
    let slideLink = document.createElement("a");
    slideLink.href = "https://www.reddit.com" + data.url;
    slideLink.target = "_blank";
    let slideImage = document.createElement("img");
    slideImage.src = data.imgLink;
    slideImage.alt = data.title;

    slideLink.appendChild(slideImage);
    slideDiv.appendChild(slideLink);
    searchCarousel.appendChild(slideDiv);
    
}

const getSlideshowInfo = function(result) {
    return {
        imgLink: result.data.url,
        title: result.data.title,
        url: result.data.permalink
    }
}

const stopSlideShow = function() {
    searchForm.style.display = "initial";
    searchResults.style.display = "none";
    $(".search-carousel").slick('unslick');
} 

