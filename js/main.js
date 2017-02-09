var urlArray = [];
var imgUrlArray = [];
var currImgIndex = 0;
var interval;
var audience = ["#jake", "#lsp", "#lady-r"]
var comments = {
  "#jake": ["Yeah, I could go for some blood", "I love you, Everything burrito", "I wish for... a sandwich!"],
  "#lsp": ["WHATEVERS 2009!", "What the jug?!", "What does it lumping mean?!"],
  "#lady-r": ["누구세요?", "으으, 잘 안 보이네", "	으! 아아! 그만해! 도와줘요!"]
}

$(document).ready(function()  {
  console.log("hello");
  $("#search-button").click(searchReddit);
  $("#start-slideshow").click(startSlideshow);
  $("#stop-slideshow").click(stopSlideshow);
  $("#loading, #container, #jake, #lady-r, #lsp, .speech-bubble").hide();
})

function searchReddit(){
  event.preventDefault();
  if($("#search-text").val()){
      //support multi word search-text
      submitToRedditApi($("#search-text").val().toLowerCase().replace(" ", "+"));
  } else {
    console.log("no search text");
  }
}

function submitToRedditApi(searchText){
  $("#loading").show();
  $("#activity-msg").text("");
  $.ajax({
    url: "https://www.reddit.com/r/pics/search.json",
    // url: 'https://www.reddit.com/search.json',
    method: 'GET',
    data: {
      q: searchText,
      nsfw: 0,
      restrict_sr: 1
    }
  }).done(function(data) {
    $("#loading").hide();
    $("#activity-msg").text("retrieved data!");

    var entryList = data.data.children;
    for(var i = 0; i < entryList.length; i++){
      urlArray.push(entryList[i].data.url)
    }
    //filter out all urls that are not images
    imgUrlArray = urlArray.filter(isImage);
    $("#activity-msg").append("<br><br>found " + imgUrlArray.length + " images");

  }).fail(function(error){
    $("#loadimg").hide();
    console.log("there was an error I'm sorry");
    $("#activity-msg").text("there was an error I'm sorry");
  });
}

function isImage(url){
  if(url.includes(".png") || url.includes(".jpg")){
    return true;
  }
  return false;
}

function startSlideshow(){
  event.preventDefault();

  if( imgUrlArray.length === 0 ){
    $("#activity-msg").text("Enter a search term first");
  } else {
    $("body").css("background-image", "url('img/curtain_open.jpg')");
    $("#lady-r, #jake, #lsp").show();
    displayImage(imgUrlArray[currImgIndex]);
    currImgIndex++;
    $("form").fadeOut(1000, function() {
        $("#container").fadeIn();
    });

    interval = setInterval(function() {
      if(currImgIndex >= imgUrlArray.length){
        currImgIndex = 0;
      }
      displayImage(imgUrlArray[currImgIndex]);
      currImgIndex++;
      $(".speech-bubble").hide();
      chooseRandomCharacter();
    }, 2000);
  }
}

function stopSlideshow(){
  event.preventDefault();
  $("body").css("background-image", "url('img/curtain_close.jpg')");
  $(".speech-bubble, #lady-r, #jake, #lsp").hide();
  $("#container").fadeOut(1000, function() {
      $("form").fadeIn();
  });

  resetData();
}

function resetData() {
  clearInterval(interval);
  $("#search-text").text("");
  $("#image").attr("src", "");
  urlArray = [];
  imgUrlArray = [];
  currImgIndex = 0;
}

function displayImage(url){
    //add it to the page
    $("#image").attr("src", url);
}

function chooseRandomCharacter(){
  var randChar = audience[Math.floor(Math.random()*audience.length)];
  console.log(".speech-" + randChar.replace("#", ""));
  $(".sb-"+ randChar.replace("#", "")).show();
  $(".speech-" + randChar.replace("#", "")).text(chooseRandomQuote(randChar));
}

function chooseRandomQuote(character){
  var quotes = comments[character];
  return quotes[Math.floor(Math.random()*quotes.length)];
}
