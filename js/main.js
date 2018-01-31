$(document).ready( function(){

  var imageArray = [];
  var updateImage = function(){
    if (imgCounter < results.length){
      imgCounter++;
    } else {
      imgCounter = 0;
    }
  };

  function stopTime() {
      clearInterval(myInterval);
    }

  $("#searchButton").on("click", function(){
    // get the value of the term to search for
    var searchString = document.forms["imageForm"].elements["searchTerm"].value;
    // use the requested value to find
    // console.log(searchString);
    // thumbnail images from reddit search .get()
    $.get("https://www.reddit.com/search.json", {
      q: searchString
    }).done(function(data){
      // console.log(data);
      // sort the results
      // this is where all
      // imageArray.filter(data.data.children);
      imageArray = data.data.children;
      // for each results look at the item
      imageArray.forEach(function(item){
        // if the item does not contain a URL ignore
          if (item.data.thumbnail !== "default"){
            // add the item to the page
            $(".content").append("<img src='" + item.data.thumbnail + "'>'");
            var myInterval = setInterval(updateImage, 3000);
          }
      });
    });
  }); // searchButton

  // accordion
  $("#slideControls").accordion();

  $("#stopShow").on("click", stopTime);


  // $( function(){
  //   $("#button").on("click", function(){
  //     $( "#myDiv" ).toggleClass( "newClass", 1000 );
  //   });
  // });

});// end of documentReady
