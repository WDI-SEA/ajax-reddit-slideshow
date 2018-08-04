var audioplayer = document.getElementsByClassName("player")[0];
var results;
var approvedImages =[];
var countMax;
var count = 0;

function slideShowStart(){
  audioplayer.play();
  if(count%2 === 0){
    var page = $('.img1');
  }else{
    var page = $('.img2');
  }
  if(count === countMax){
    setTimeout(function(){
      audioplayer.pause();
      audioplayer.currentTime = 0;
      $('.waiting').hide();
      $('.formcont').fadeToggle();
      $('.replay').show();
      $('.request1').show();
      $('.rebutton').on("click",function(){
        count = 0;
        $('.formcont').hide();
        $('.replay').hide();
        $('.request1').hide();
        slideShowStart();
      });
    },4000);

  }
  page.css('background-image', 'url(' + approvedImages[count].thumbnail + ')').fadeToggle(2000);
  page.css('background-image', 'url(' + approvedImages[count].thumbnail + ')').fadeToggle(2000);
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
    $('.formcont').append("<img class= 'waiting' src='https://www.pedul.com/images/loading.gif'>")
    $('.formcont').fadeToggle(4000);
    var searchString = document.forms["request"].elements["userinput"].value;
    $('userinput').val();
    $.get('https://reddit.com/search.json',{
      q: searchString
    }).done(function(data){
      audioplayer.play();
      results = data.data.children;
      results.forEach(function(item){
        newItem = item.data;
        if(newItem.over_18 === false && newItem.thumbnail.charAt(0) === "h"){
          approvedImages.push(newItem);
        }
      });
      countMax = approvedImages.length -1;
      setTimeout(slideShowStart, 4000);
      });
  });
});
