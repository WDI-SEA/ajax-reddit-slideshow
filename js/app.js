$(document).ready(function(){
//call the reddit api & get data from it based on the search query
    $('#inputSearch').click(function(e){
        var search = $('#input').val();
        $.get('https://www.reddit.com/r/pics/search.json', {
            q: search,
            nsfw: 0,
            restrict_sr: "on",
            sort: "new"
        }).done(function(data){
            var imgPosts = data;
            var imgObjects = imgPosts.data.children;
            for (var i = 0; i < imgObjects.length; i++){
                showResults(imgObjects[i]);
            }
            console.log();
        }).fail(function(error){
            console.log('There was an error :(');
        })
        e.preventDefault();
        //After search button is clicked, hide h1,description and form. 
        hideContainer();
    });

    function showResults(urls){
        var containerDiv = $('#output');
        var imgURL = urls.data.url;
        if (imgURL){
            containerDiv.append('<img class="scaled" src="'+imgURL+'">')
        } else{
            console.log('No images');
        }
        createSlides();
    }

    function hideContainer(){
        $('#container').hide();
        $('#output').prepend("<button id='reset'>Reset</button>").append("<br>")
        $('#reset').click(function(){
            resetSearch();
        })
    }

    function resetSearch(){
        $('#container').show();
        $('#input').val("").focus();
        $('img').remove();
        $('#reset').remove();
    }
    // createSlides
    function createSlides(){
        console.log("create slides");
    }

});




 
    
//done function store the data in an array
//set interval: change the index of the array
//loop: start the index over at 0
//if you want to have a stop button then do step below
//stop button click: clear interval