var images = [];
var posts = {};
var count = 1;
var jsonObject = {};
var interval;

//added a search query +url%3Apng to return only png inclusive terms
var getAjaxRedditImages = function(term){
  $.ajax({
    url: 'https://www.reddit.com/search.json?q='+term+'+url%3Apng',
    method: 'GET',
    success: function(response){
      responseImagesToObject(response);
      hideSearchAndDarken(); //these need to be here or wont have ajax images
      // jsonObject = response;
      intervalChange(); //these need to be here or wont have ajax images
    },
    error: function(response){
      printResponseToConsole(response);
    },
  });
};

var responseImagesToObject = function(input){
  posts = input.data.children;
  posts.forEach(function(post){
    var str = post.data.url;
    if(str.endsWith(".png")||str.endsWith(".jpg")){
      images.push(str);
    } else{
      //dont add to images because not image file
    }
  });
};

//Map/filter example for how to do the above
// var posts = [
//   {data: {url:"google.com"}},
//   {data: {url:"giphy.com/cat.jpg"}},
//   {data: {url:"facebook.com/profilepic.png"}},
//   {data: {url:"reddit.com/r/img/funny.png"}},
//   {data: {url:"ebay.com"}}
// ];
//
// var mapped = posts.map(function(post){
//   return post.data.url;
// });
//
// console.log("only mapped:", mapped);
// console.log();
//
// images = posts.map(function(post){
//   return post.data.url;
// }).filter(function(url){
//   return url.endsWith(".png")||url.endsWith(".jpg");
// });

var printResponseToConsole = function(input){
  console.log("AJAX error");
};

var changeBackground = function(link){
  $("#slide").css("background-image", "url('"+link+"')");
};

var intervalChange = function(){
  changeBackground(images[0]); //why isnt images an object yet? How do i start immediately? AJAX not run..
  interval = setInterval(function(){
    var linkFromArray = images[count];
    changeBackground(linkFromArray);
    if(count==images.length){
      count=0;
    } else{
      //nothing
    }
    // console.log(linkFromArray);
    count++;
  },2000);
};

var hideSearchAndDarken = function(){
  $("#inputBox").hide();
  $("#submitButton").hide();
  $("h1").hide();
  $("h5").hide();
  $("body").css("background-image","linear-gradient(rgb(100, 100, 100),rgb(0, 0, 0))");
};

$("#search-form").submit(function(event){
  event.preventDefault();
  var searchTerm = event.target.search.value;
  getAjaxRedditImages(searchTerm);
});

$("#resetButton").click(function(event){
  $("body").css("background-image", "linear-gradient(rgb(59, 161, 245),rgb(126, 188, 245))");
  $("#slide").css("background-image", "url('')");
  $("#inputBox").val("");
  images = [];
  posts = {};
  count = 0;
  jsonObject = {};
  $("#inputBox").fadeIn();
  $("#submitButton").fadeIn();
  $("h1").fadeIn();
  $("h5").fadeIn();
  clearInterval(interval);
});
