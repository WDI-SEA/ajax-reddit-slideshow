$(document).ready( function(){

  var progressInterval = null;
  var myInterval = null;
  var imageArray = [];
  var imgCounter = 0;
  var intervalTimer = 1000;

  var updateImage = function(){
    // hide the search field
    if (imgCounter < imageArray.length){
      imgCounter++;
        // replace content with html for current item on the page
        $(".content").html("<img src='" + imageArray[imgCounter].data.thumbnail + "'>'");
    } else {
      imgCounter = 0;
      stopSlideInterval();
      $( ".slideControls" ).accordion( "option", "active", 0 );
      $(".instructions").show();
      $("#searchTerm").val("");
      $("#searchTerm").focus();
    }
  };

  function stopSlideInterval() {
      clearInterval(myInterval);
    }

  $("#searchButton").on("click", function(){
    // if you use a submit button
    // get the value of the term to search for
    var searchString = document.forms["imageForm"].elements["searchTerm"].value;
    // check to see if searchString === empty
    if (searchString !== ""){
      $( ".progressbar" ).progressbar({ value: false });
      $(".instructions").hide();
      // use the requested value to find
      // thumbnail images from reddit search .get()
      $.get("https://www.reddit.com/search.json", {
        q: searchString
      }).done(function(data){
        // store results from query
        var results = data.data.children;
        // for each results look at the item filer the item where thumbnail === default
        // imageArray = results.filter(data.data.children[result].data.thumbnail !== "default");
        for (result in results){
            if (results[result].data.thumbnail !== "default"){
              imageArray.push(results[result]);
            }
        }
        $( ".slideControls" ).accordion( "option", "active", 1 );
        $( ".progressbar" ).progressbar({ value: 75 }).delay( 2000 ).fadeOut( 400 );
        myInterval = setInterval(updateImage, intervalTimer);

      });
    } else {
      $("#searchTerm").focus();
      $("#searchTerm").attr("placeholder", "Enter a search term");
    }

  });

  // accordion
  $(".slideControls").accordion({
    animate: 600
    });

  // start and stop functions
  $("#stopShow").on("click", stopSlideInterval);
  $("#startShow").on("click", function(){
    myInterval = setInterval(updateImage, intervalTimer);
  });
  $("#searchTerm").focus();

});// end of documentReady
