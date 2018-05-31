console.log("javascript working!");

var picArray = [];
var i = 0;

$(document).ready(function() {
  console.log('jquery is working!');

  $('form').on('submit', function(e) {
    e.preventDefault();
    var userInput = $('.inputbox').val();
    console.log(userInput);
//hide form/button here
    $.get('http://www.reddit.com/search.json', {
      q: userInput + '+nsfw:no',
    }).done(function(returnData){
        var filteredImages = returnData.data.children.filter(function(item) {
          return item.data.thumbnail.includes('http');
        });
        // This is where you will loop through your array
        filteredImages.forEach(function(item, i){
          console.log(item.data.thumbnail)
          picArray.push("<div class='fadeimg'><img src='" + item.data.thumbnail + "'></div>")
        });
        mainFunk(picArray);
      });
   });
});


setTimeout(function(){
  mainFunk(picArray)
}, 2500);

function startPicShow () {
  if(i >= picArray.length){
    i = 0;
  }
  $(".insert").append(picArray[i]);
  i++
}

function stopPicShow() {
  clearInterval()
}

function mainFunk(picArray) {
  setInterval(startPicShow, 3000);
  setTimeout(startPicShow, 3500);
  // console.log(picArray)
  // for(i = 0; i < picArray.length; i++){
  // console.log(picArray[i])
  }
//}
