var picArray = [];
var i = 0;
function slideShow() {
  //display pic array i to screen
  $('.tasklist').html(picArray[i]);
  console.log(picArray[i], i);
  i++;
}

function mainFunc(picArray) {
  setInterval(slideShow, 2000)
}


$(document).ready(function() {
  $('.button').click(function(e) {
    var userInput = $('.input').val();
    console.log(userInput);
    $('form').hide();
    e.preventDefault();
    $.get('http://www.reddit.com/search.json', {
      q: userInput + '+nsfw:no',

    }).done(function(returnData) {
        returnData.data.children.forEach(function(item, i) {
          picArray.push("<div class='image'>" + "<img src='" + item.data.thumbnail + "'></div>");
        });
        mainFunc(picArray);
    });
  });
});
