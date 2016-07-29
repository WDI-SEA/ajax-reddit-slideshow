//set document ready
$(document).ready(function() {
  //start the function when #searh is clicked
  $("#search").on("click", function(e) {
    //prevent the page from automatically refreshing
    e.preventDefault();
    //Create a var for storing the input to the search bar
    var storedQuery = $("#query").val();
    //Create a var for the url+storedQuery
    var url = "http://www.reddit.com/search.json?q=" + storedQuery + "+nsfw:no";
      //Request results from the URL and start a function
    $.get(url, function(data1) {
      //for loop that cycles through all the results from the query submitted
      for (var i = 0; i < data1.data.children.length; i++) {
        //Create a var for the path to the images
        var thumbnail = data1.data.children[i].data.thumbnail;
        console.log(typeof thumbnail);
        if (thumbnail.indexOf('http') != -1) {
        //display the thumbnail before repeating the for loop
        $("#imgDisplay").append('<div><img class="slide" src=" '+thumbnail+' "></div> ')

        }

      }
      $(".autoplay").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });


    });

  });
});
