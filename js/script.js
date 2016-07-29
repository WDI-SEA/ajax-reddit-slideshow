console.log("javascript");

var currentSubreddit = "";
var subredditData;
var subredditImages = [];
var imagesLoaded = false;


$('#grabImageButton').click(function() {
  // body...
  console.log("clicked");
  currentSubreddit = $("#subreddit").val();
  getImages(currentSubreddit);
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

    //$('#slides').append("<img src=\"" + images[i] + "\">"); 
  }
}

function initializeSlideshow(){
  $("#slides").slidesjs({
    width: 940,
    height: 528
  });
}

function loadImageArray(redditData){
  var postData = redditData.data.children;
  for(var i = 0; i < postData.length; i++){
    if(!postData[i].data.over_18 && postData[i].data.preview.images.length == 1){
      
      if(postData[i].data.domain === "i.imgur.com"){
        //subredditImages.push(postData[i].data.url);
        subredditImages.push("<img src=\"" + postData[i].data.url + "\">");
        //$("#slides").append("<img src=\"" + postData[i].data.url + "\">");
      }

      else if(postData[i].data.domain === "imgur.com"){
        TestURL = postData[i].data.url;
        if(!TestURL.includes("/a/") && !TestURL.includes("/gallery/")){
          subredditImages.push("<img src=\"" + postData[i].data.url + ".jpg\">");
        }
        //$("#slides").append("<img src=\"" + postData[i].data.url + ".jpg\">");
      }
    }
  }
  makeSlideshow(subredditImages);
  initializeSlideshow();
}



