$(document).ready( function(){

  var myInterval = null;
  var imageArray = [];
  var imgCounter = 0;

  var updateImage = function(){
    // hide the search field
    console.log("update image " + imgCounter + " " + imageArray.length)

    if (imgCounter < imageArray.length){
      imgCounter++;
        // add the item to the page
      console.log("<img src='" + imageArray[imgCounter].data.thumbnail + "'>'");
      $(".content img").remove();
      $(".content").append("<img src='" + imageArray[imgCounter].data.thumbnail + "'>'");
      // $(".content").append("<img src='" + imageArray + "'>'");
    } else {
      imgCounter = 0;
      stopSlideInterval();
    }
    // stopSlideInterval()
    console.log(imgCounter);
  };

  function stopSlideInterval() {
      clearInterval(myInterval);
    }

  $("#searchButton").on("click", function(){
    // if you use a submit button
    // e.preventDefault();
    // get the value of the term to search for
    var searchString = document.forms["imageForm"].elements["searchTerm"].value;
    // use the requested value to find
    // thumbnail images from reddit search .get()
    $.get("https://www.reddit.com/search.json", {
      q: searchString
    }).done(function(data){
      console.log(data);
      // const result = words.filter(word => word.length > 6);
      var results = data.data.children;
      // for each results look at the item
      // filer the item where thumbnail === default
      // imageArray = results.filter(results[data.thumbnail] !== "default");
      for (result in results){
        console.log("item " + result);
          if (data.data.children[result].data.thumbnail !== "default"){
            imageArray.push(results[result]);
            // console.log("results " + data.data.children[result].data.thumbnail)
          }
      }
      $( "#slideControls" ).accordion( "option", "active", 1 );
      myInterval = setInterval(updateImage, 3000);
    });
  }); // searchButton

  // accordion
  $("#slideControls").accordion();

  $("#stopShow").on("click", stopSlideInterval);

  // $( function(){
  //   $("#button").on("click", function(){
  //     $( "#myDiv" ).toggleClass( "newClass", 1000 );
  //   });
  // });

  // progressbar
  $( "#progressbar" ).progressbar({
      // var myInterval = setInterval(function, milliseconds);
      // myInterval.clearInterval();
      // while(<100){}
      // figure this out
      // var myInterval = setInterval(function moveProgressBar(){
      //   for (var i = 0; i < 10; i++){
      //     value++;
      //   }
      //   clearInterval(myInterval);
      // }, 3000);
    });

});// end of documentReady
