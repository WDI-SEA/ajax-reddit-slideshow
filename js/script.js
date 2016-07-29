console.log("javascript");

var currentSubreddit = "";
var subredditData;
var imagesLoaded = false;


$('#grabImageButton').click(function() {
  // body...
  if(currentSubreddit == ""){
     currentSubreddit = $("#subreddit").val(); 
  }
  else{
    resetImageSlideshow();
    currentSubreddit = $("#subreddit").val(); 
  }

  getImages(currentSubreddit);
  showHideForm();
});

function getImages(curSubReddit){
  $.get("https://www.reddit.com/r/" + curSubReddit + ".json", { 
  }).done(function(data){
    loadImageArray(data);
    console.log(data);
  });
}

function makeSlideshow(images){
  for(var i = 0; i < images.length; i++){
    try {
      $('#slides').append(images[i]);
    } catch (error){
      console.log("image failed to load");
    }
  }
}

function initializeSlideshow(){
  $("#slides").slidesjs({
    width: 940,
    height: 500,
    play:{active: true,
        // [boolean] Generate the play and stop buttons.
        // You cannot use your own buttons. Sorry. (ED: Thanks for nothing)
      effect: "slide",
        // [string] Can be either "slide" or "fade".
      interval: 5000,
        // [number] Time spent on each slide in milliseconds.
      auto: true,
        // [boolean] Start playing the slideshow on load.
      swap: true,
        // [boolean] show/hide stop and play buttons
      pauseOnHover: false,
        // [boolean] pause a playing slideshow on hover
      restartDelay: 2500
        // [number] restart delay on inactive slideshow
      },
    navigation: {active: false, effect: "slide"}
  });
}

function loadImageArray(redditData){
  var postData = redditData.data.children;
  var subredditImages = [];
  for(var i = 0; i < postData.length; i++){
    if(!postData[i].data.over_18 && checkForGifV(postData[i].data.url)){
      
      if(postData[i].data.domain === "i.imgur.com"){
        subredditImages.push("<img src=\"" + postData[i].data.url + "\">");
        console.log(postData[i].data.url);
      }

      else if(postData[i].data.domain === "imgur.com"){
        TestURL = postData[i].data.url;
        if(!TestURL.includes("/a/") && !TestURL.includes("/gallery/")){
          subredditImages.push("<img src=\"" + postData[i].data.url + ".jpg\">");
          console.log(postData[i].data.url);
        }
      }

    }
  }
  $('#container').append("<div id=\"slides\"></div>")
  makeSlideshow(subredditImages);
  initializeSlideshow();
  $('.slidesjs-navigation').on('click', function(){
    showHideForm();
  });
}

function checkForGifV(item){
  if(item[item.length - 1] === "v"){
    console.log(item[item.length - 1]);
    return false;
  }
  else{
    return true;
  }
}

function showHideForm(){
  if($("#formStuff").is(':visible')){
    $("#formStuff").hide();  
  }
  else{
    $("#formStuff").show();
  }
}

$().click(function(){
  console.log('clicked start stop');
});

function resetImageSlideshow(){
  $('#container').empty();
}



