var results = [];
var imgCounter = 0;
var myInterval = null;

function stopAt() {
  clearInterval(myInterval);
  console.log("in the stopAt function");
  $("#updateImage").show();
  $("#stopbutton").show();
}

var updateImage = function(){
  if (imgCounter < results.length){
    imgCounter++;
  } else {
    imgCounter = 0;
  }
  $("img").attr('src', results[imgCounter].data.thumbnail);
}

$(document).ready(function() {
  console.log("in the ready function...");
  $("#updateImage").hide();
  $("#stopbutton").hide();
  $("#stopbutton").on("click", stopAt);
  $("#searchbutton").on("click", function() {
     $("#splash").hide();
     // $("#updateImage").fadeIn( "slow");

    var searchString = document.forms["imageform"].elements["imagebox"].value;
    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data) {
      console.log("in the done function...");
      results = data.data.children;
      console.log(results);
      results = results.filter(function(item){
        return item.data.thumbnail !== 'default'
      });
      console.log(results, "after filter");
      $("#updateImage").show();
      $("#stopbutton").show();
      myInterval = setInterval(updateImage, 1000);
    });
  });
});
