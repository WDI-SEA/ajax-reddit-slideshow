var searchInput;
var intervalHandle;

// ajax call to reddit
var getRedditResults = function(input) {
    $.get('http://www.reddit.com/search.json', {
        q: input + 'nsfw:no'
    }).done( function(returnData){
        var slides = [];
        var urls = [];
        returnData.data.children.forEach(function(listing){
            // test to see if image url exists, filter out gifv and collect
            var urlArr = listing.data.url.split('.')
            var imgExt = new RegExp('gif(?!v)|jpg|jpeg|png')

            if (urlArr[urlArr.length - 1].match(imgExt)) {
                urls.push(listing.data.url);
            }
        })
        // map to html elements
        slides = urls.map( function(url){
            return "<div id='slide'><img src='" + url + "' width='800px'></div>";
        })
        // cycle through slides arrayw
        intervalHandle = setInterval( function(){
            $('#slide').fadeIn(500);
            $('#slide').replaceWith(slides[0]);
            let slideShown = slides.shift();
            slides.push(slideShown);
            $('#slide').fadeOut(2900);
        },3000)
    }).fail( function() {
        $('#slide').html("<div class='error'><h1>Uh oh! something went wrong! Try again!</h1></div>");
    })
}

$(document).ready(function() {
    $('#query').focus();
    // click search button to initiate ajax call and slideshow
    $('#search').click( function(e) {
        e.preventDefault();
        searchInput = $('#query').val();
        $('#form-tab').slideUp('slow');
        getRedditResults(searchInput);
        $('#slide').html('<h2>loading...</h2>');
    });

    // bind stop button to stop slide show and clear the slide div
    $('#stop').click( function() {
        $('#query').val('');
        $('#form-tab').slideDown('slow');
        clearInterval(intervalHandle);
        $('#slide').empty();
        $('#query').focus();

    })

})