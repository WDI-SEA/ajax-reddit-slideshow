$(document).ready(function() {




$('#searchBtn').on('click', function(event) {
  event.preventDefault();


  $.get('https://www.reddit.com/search.json', {

    q: searchInput,
  }).done(function(data) {
    intoArray(data);
    // console.log(data);
  }).fail(function(data) {
    console.log('failed!');
  });


});
//function to grab the input from the text box and put it into the q field above
function searchInput() {
  return $('#input').val();
}

function intoArray(data) {
  var newArray = [];
  var childrenArray = data.data.children;

  for (var i = 0; i < childrenArray.length; i++) {
    if (childrenArray[i].data.preview) {
      //iterate over children[i]....url to push into a new array
      var url = childrenArray[i].data.preview.images[0].source.url;
      if (url !== '') {
        newArray.push(url);

      }
    }
  }


  doStuff(newArray);

}

function doStuff(images) {
  images.forEach(function(url) {
    $('#slideshow').append('<div><img src="'+url+'"></div>');
  })
  $("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
},  3000);
}



//end of document.ready function

});
