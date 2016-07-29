$(document).ready(function() {
  var intervals = [];
  $('#search').click(function(){
    var moviePosters = [];
    console.log('hi');
    var input = $('#textInput').val();
    console.log(input);
    $.getJSON('http://www.omdbapi.com/?s=' + input + '&y=&plot=short&r=json&type=movie', function(movies){
      console.log(movies);
      for(var i = 0; i < movies.Search.length; i++){
        if(movies.Search[i].Poster != 'N/A'){
          moviePosters.push(movies.Search[i].Poster);
        }
      }
      displayPic(moviePosters);
    });
  });

  function displayPic(moviePosters){
    for(var i = 0; i<moviePosters.length; i++){
      doSetTimeout(moviePosters[i], i);
    }
  }

  function doSetTimeout(poster, i){
    var id = setInterval(function(){
      $('#pic').html($('<img src="' + poster + '" style=" height:600px; width:800px;">'));
    },1000 *(i +1));
    intervals.push(id);
    console.log(id + ' is pushed');
  }

  $("#clearButton").click(function(){
    for(var i = 0; i < intervals.length; i++){
      clearInterval(intervals[i]);
    }
  });

});



// $('#container').click(function(){
//   $.getJSON('http://api.doughnuts.ga/doughnuts', function(data){
//     for(var i = 0; i < data.length; i++){
//       doSetTimeout(i, data[i]);
//     }
//   });
// });

// function doSetTimeout(i, item){
//   setTimeout(function(){
//     console.log((i + 1).toString() + ": " + item.flavor + ": " + item.style);
//     $('#container').append("<br>" + (i + 1).toString() + ": " + item.flavor + ": " + item.style +"<br>");
//   }, 1000 * (i + 1));
// }