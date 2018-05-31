var searchInput;
var intervalHandle;

// function to show slides
// var showSlide = function(i) {
//     // i > 0 ? $('#stage').remove() : $('#stage'.remove(slide[0]))
//     // $('#stage').append[slides[i]];
    
    
// }
// ajax call to reddit
var getRedditResults = function(input) {
    $.get('http://www.reddit.com/search.json', {
        q: input + 'nsfw:no'
    }).done( function(returnData){
        var slides = [];
        var urls = [];
        returnData.data.children.forEach(function(listing){
            // test to see if image url exists
            var urlArr = listing.data.url.split('.')
            var imgExt = new RegExp('jpg|jpeg|png')
            if (urlArr[urlArr.length - 1].match(imgExt)) {
                urls.push(listing.data.url);
            }
        })
        // console.log(urls);
        slides = urls.map( function(url){
            return "<div class='img' id='slide'><img src='" + url + "'></div>";
        })

        intervalHandle = setInterval( function(){
            $('#slide').fadeIn(500);
            $('#slide').replaceWith(slides[0]);
            let slideShown = slides.shift();
            slides.push(slideShown);
            $('#slide').fadeOut(2000);
        },3000)
    })
}


$(document).ready(function() {
    // click search button to initiate ajax call and slideshow
    $('#search').click( function(e) {
        e.preventDefault();
        searchInput = $('#query').val();
        $('#form-tab').slideUp('slow');
        getRedditResults(searchInput);
        $('#slide').html('<h2>loading...');
    });

    $('#stop').click( function() {
        $('#form-tab').slideDown('slow');
        clearInterval(intervalHandle);
        $('#slide').empty();

    })



})