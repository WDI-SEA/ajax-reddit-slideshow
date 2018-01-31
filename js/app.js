var results;
var approvedImages =[];
var countMax;
var count = 0;

function dc(str){
  console.log(str);
}
//num_comments
//Ups
function slideShowStart(){
  $('.slidedisplay').attr('src', approvedImages[count].thumbnail).fadeToggle(2000);
  $('.details').val("Test");
  $('.slidedisplay').attr('src', approvedImages[count].thumbnail).fadeToggle(2000);
  if(count < countMax){
    count +=1;
    setTimeout(slideShowStart, 4000)
  }
};

$(document).ready(function(){
  function dc (str){
    console.log(str);
  }
  $('.usersub').on('click', function(e){
    e.preventDefault();
    $('.request1').hide();
    $('.formcont').append("<img src='https://www.pedul.com/images/loading.gif'>")
    $('.formcont').fadeToggle(5000);
    var searchString = document.forms["request"].elements["userinput"].value;
    $('userinput').val();
    $.get('https://reddit.com/search.json',{
      q: searchString
    }).done(function(data){
      results = data.data.children;

      results.forEach(function(item){
        newItem = item.data;
        if(newItem.over_18 === false && newItem.thumbnail.charAt(0) === "h"){
          approvedImages.push(newItem);
        }
      });
      countMax = approvedImages.length
      setTimeout(slideShowStart, 4000);
      });
  });
});
