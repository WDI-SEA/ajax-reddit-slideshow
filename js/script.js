document.addEventListener('DOMContentLoaded', function(){
  console.log('script.js is loaded!');
  $("#query").focus();

var interval;
var searchResults = {};
var slideCount = 0;

$(function() {
  $('#search-form').on('submit', search);
});

$('#quit').click('click', 
    function() {
        clearInterval(interval);
        $('#loading').text(''); 
        $('#slideshow').css('background','transparent');
        $('#search-bar').removeClass('inprogress'); 
        $('#quit').removeClass('inprogress');
        $('#slideshow').removeClass('inprogress');
        $("#query").focus();
});

function search(event) {
    event.preventDefault();  
    $("#loading").text('Loading'); 
    $("#search-bar").addClass('inprogress'); 
    $("#quit").addClass('inprogress');
    $("#slideshow").addClass('inprogress');

    var userInput = $('#query').val() || 'kittens'; 
    console.log(userInput);

    $.get('https://www.reddit.com/search.json', {
        q: userInput + 'nsfw:no',
        limit: 50       
    }).done(function(response) {
        console.log(response);   
        searchResults = response.data.children;
        addSearchResult(); 
        startSlideShow();
    });
}

function startSlideShow() {
    interval = setInterval(addSearchResult, 3000);
}

function addSearchResult() {  
    $("#loading").text('Loading'); 
    var source = searchResults[slideCount].data.url;
    console.log(source);
    $('#slideshow').css('background-image', 'url('+ source +')');
    slideCount++;
}


});
