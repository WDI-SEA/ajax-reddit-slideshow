$(document).ready(function(){

$('.carousel').carousel({
        interval: 3000
    })
//var reddit = require("./data.json");
var redditData = [];
var userSearch = '';
var filteredData = [];
var counter = 0;
var search = '';

//$('#searchButton').click(function(){
//  search = $('#search').val();
//  console.log(search);
//});

$('#hit').on('click', function(e){
  e.preventDefault();
  search = $('#search').val();
  console.log(search);
  $('#pic').html('<div class="item active"></div>');
  filteredData = [];

 if(search != ''){
  $.get('https://www.reddit.com/search.json?q='+search+'+nsfw:no').done(function(data) {
    redditData = data;
    
    redditData.data.children.filter(function(child){
      
      if (child.data.preview) {
        filteredData.push(child.data.preview.images[0].source.url);
      }
      
      //filterData = child.data.preview.images[0].url;
      //console.log(filterData);

    });
    console.log(filteredData);




    //setInterval(function() {
    for (var i = 0; i < filteredData.length; i++) {
      /*if (filteredData[i] === filteredData[0]){
        $('#pic').append('<div class="item active"><img src="'+filteredData[i]+'"></div>');
      }
      else{
        $('#pic').append('<div class="item"><img src="'+filteredData[i]+'"></div>');
      }*/
      $('#pic').append('<div class="item"><img src="'+filteredData[i]+'"></div>');
    }
      
    if ($('#pic').html() != '') {
    $('.carousel').carousel({
        interval: 3000
    })
    }

      //counter++;
      // if (counter > filteredData.length) {
      //   counter = 0;
      // }
      //counter = counter % filteredData.length;
    //}, 1000);

  });
  }
});



});