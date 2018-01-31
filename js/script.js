var imageArray = [];
var myInterval = null;
var count = 0;

var hide = function() {
  $('.container').toggleClass('hide');
}

function stopImage() {
  clearInterval(myInterval);
}

function resume() {
  myInterval = setInterval(slideShow, 1000);
}

function reset() {
  clearInterval(myInterval);
  imageArray = [];
  count = 0;
  $('.container').toggleClass('hide');
  $('#searchterm').focus();
  $('#searchterm').val('');
  $('#results').children().remove();
}

var slideShow = function() {
  if(imageArray.length > (count+1)){
      $('#results').children().remove();
      count++
      $('#results').append('<img src="'+imageArray[count]+'">');
    } else {
      count = 0;
      $('#results').children().remove();
      $('#results').append('<img src="'+imageArray[count]+'">');
    }
}


$(document).ready(function(){

  $('#resume').on('click', resume);
  $('#stop').on('click', stopImage);
  $('#reset').on('click', reset);
  $('#searchbutton').on('click', function(){
    var searchString = $('#searchterm').val();
    console.log(searchString);
// $.get('url', {q: searchstring}).done(function(data))
    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data){
      console.log(data);
      var results = data.data.children;

      results.forEach(function(item){
        var image = item.data.thumbnail;
        if (image.indexOf('reddit') !== -1) {
          imageArray.push(image);
        }
      });
      console.log(imageArray);
      hide();
      $('#results').append('<img src="'+imageArray[count]+'">');

      myInterval = setInterval(slideShow, 1000);

    });
  });

});
