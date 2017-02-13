$(document).ready(function() {
  var myData;
  var urls;
    // hide stop button on page load.
    $("#stopBtn").hide();

    //After search button is clicked, hide h1,description and form. 
    //Then show stop animation button.
    $("#searchBtn").click(function() {
        $("h1").hide();
        $("#description").hide();
        $("#searchForm").hide();
        $("#stopBtn").show();
    //Get posts from reddit
        var search = $('#searchInput').val();
        $.get('https://www.reddit.com/r/pics/search.json', {
            q: search
        }).done(function(data) {
            console.log(data);
            myData = data;
            logMyData();
        }).fail(function(error) {
            console.log('Something went wrong!');
        }).always(function(data) {
        });
    });

    function logMyData() {
        var filter = myData.data.children.filter(function(thisChild){
          if (thisChild.data.thumbnail === "self" || thisChild.data.thumbnail === "") {
            return false;
            }else{
            return true;
          }
        })
        urls = filter.map(function(thisChild) {
          return thisChild.data.thumbnail;
        })
        console.log(urls);
        // createSlides();
    }

    // function createSlides(){
    //     console.log("create slides");
    //    }

});
// GAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!


//get your textbox/submit button working
//call the reddit api & get data from it based on the search query
//done function store the data in an array
//set interval: change the index of the array
//loop: start the index over at 0
//if you want to have a stop button then do step below
//stop button click: clear interval