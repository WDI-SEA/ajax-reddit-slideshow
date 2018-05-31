$(document).ready(function () {
  $("form").on("submit", function(e) {
    e.preventDefault();
    $(".stopbutton").click (function () {
        clearInterval(slideshow);
      });

    $.get("http://www.reddit.com/search.json", {
    q: $("#searchbox").val() + "+nsfw:no",
  }).done(function(returnData) {            //this is a promise
    console.log(returnData.data.children);
    returnData.data.children.forEach(function(item, i){
      if(item.data.thumbnail.includes(".")){ //filtering out broken images by only showing results that have a ., like .jpg
        $(".slideShowBox").append("<div>" + "<img src='" + item.data.thumbnail + "'></div>");
        $(".slideShowBox > div:gt(0)").hide(); //had to hide images initially otherwise they glitched
      }
      })
  })
})

var slideshow = setInterval(function() { //set interval between pics
  $('.slideShowBox > div:first')
    .fadeOut(1000) //fade out first pic after 1 second
    .next() //grab next picture
    .fadeIn(1000) //fade in next picture for 1 second
    .end() //
    .appendTo('.slideShowBox');
}, 3000);
})
