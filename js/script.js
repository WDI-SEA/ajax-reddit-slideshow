var images = [];
var posts = {};
var count = 0;

$("#search-form").submit(function(event){
  event.preventDefault();
  var searchTerm = event.target.search.value;
  getAjaxRedditImages(searchTerm);
  intervalChange();
});

var getAjaxRedditImages = function(term){
  $.ajax({
    url: 'https://www.reddit.com/search.json?q='+term,
    method: 'GET',
    success: function(response){
      responseImagesToObject(response);
    },
    error: function(response){
      printResponseToConsole(response);
    },
  });
};

var responseImagesToObject = function(input){
  posts = input.data.children;
  posts.forEach(function(post){
    images.push(post.data.url);
  });
};

var printResponseToConsole = function(input){
  console.log("AJAX error");
};

var changeBackground = function(link){
  $("#slide").css("background-image", "url('"+link+"')");
};

var intervalChange = function(){
  setInterval(function(){
    if(count==images.length){
      count=0;
    } else{
      //nothing
    }
    var linkFromArray = images[count];
    changeBackground(linkFromArray);
    console.log(linkFromArray);
    count++;
  },1000);
};
