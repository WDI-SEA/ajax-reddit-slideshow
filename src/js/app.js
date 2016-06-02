var picArray = [];
var count = 0;

$(document).ready(function(){
  $('#inputForm').focus();

  $('#searchForm').on('submit', function(e){
    e.preventDefault();
    $('#inputForm, #searchButton, #title, #description').addClass('hidden');
    $('#stopButton').addClass('shown');

    $.get('http://api.giphy.com/v1/gifs/search', {
      q: $('#inputForm').val(),
      api_key: 'dc6zaTOxFJmzC'
    }).done(function(data){
      var array = data.data;

      for(var i = 0; i < array.length; i++) {
        var pic = array[i].images.original.url;
        picArray.push(pic);
      }
    }).fail(function(data){

    }).always(function(data){

    });
    $('#inputForm').val('');
  });

  $('#stopButton').on('click', function(e) {
    e.preventDefault();
    //location.reload() was kind of a cheeky way out, but it works and the code below it was giving me some issues, I may come back to it.

    location.reload();

    // clearInterval(slideGetter);
    // $('#inputForm, #searchButton, #title, #description').addClass('shown');
    // $('#stopButton').addClass('hidden');
    // $('#slides').attr('src', "");
  });
});

// function slideShow(array) {
//   for(i=0;i<array.length;i++) {
//     $('#searchReturn').html('<img src=' + array[i] + '>');
//   }
//   array.pop();
// }
// USE BELOW FUNCTIONALITY, ABOVE IS SILLY (BUT DOES WORK-ISH).

var slideGetter = setInterval(function() {
  if (picArray.length === count){
    count = 0;
  }
  $('#slides').attr('src', picArray[count])
  count++
}, 2000);
// function stopFunction() {
//   clearInterval(slideGetter);
// };
