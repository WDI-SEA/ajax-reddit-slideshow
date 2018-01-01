document.addEventListener('DOMContentLoaded', function() {

var input = $('#query');

$('#button').click(function(){
  $('.titlePage').hide();
  $('.slideshow').show();
});

$('#end').click(function(){
  $('.slideshow').hide();  
  $('.titlePage').show();
});


$(function() {
  $("#search-form").on('submit', search);
});

function search(event) {
  event.preventDefault();
  clearSearchResults();
  var input = $("#query");
  var userQuery = input.val() || input.attr("placeholder");
  $.get('https://www.reddit.com/search.json', {
    q: userQuery + '+nsfw:no' 
  }).done(function(response) {
    console.log(response);
    var results = response.data.children;
    var filterSearch = results.filter(function(result) {
    	return result.data.preview;
    });
  	var imageFilter = filterSearch.map(function(result){
  		return result.data.preview.images[0].source.url
  	});
    for (var i = 0; i < imageFilter.length; i++) {
    	showImages(imageFilter[i]);
    }
  }).fail(function() {
    console.log("something failed");
  })
}

var showImages = function(url) {
	var image = document.createElement('img');
	image.src = url;
	$("#results").append(image);
};

var imageFilter = 1;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsById("results");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    imageFilter++;
    if (imageFilter > slides.length) {imageFilter = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 2000); 
}

function clearSearchResults() {
  $("#results").html("");
}


function addSearchResult(result) {

  var li = document.createElement("li");

  var link = document.createElement("a");
  link.href = result.url; 
  link.textContent = result.title; 

 
  $(li).append(link);


  $("#results").append(li);
}
});