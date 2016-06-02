$(document).ready(function() {

console.log('test');
$('#slideshow').on('submit', function(elem) {
  elem.preventDefault();
  console.log('clicked');
  var input = $('#inputSpot').val();

$.get('http://www.reddit.com/search.json', {
  q: input
}).done(function(data) {
  console.log('search done! wait for image');
  console.log(input);


  var imageArray = getImage(data);
  //console.log(imageArray);

  //console.log(data);
}).fail(function(data) {
  console.log('search failed!');
  //console.log(data);
})

});
});



function getImage(itemArray) {
  var answerArray = [];
  var childrenArray = itemArray.data.children;
  console.log('inside itemArray');

  console.log(childrenArray);

  for (var i = 0; i < childrenArray.length; i++) {
    console.log('start of loop');

    if (childrenArray[i].data.preview) {

      console.log('first IF condition met');

      var url = childrenArray[i].data.preview.images[0].source.url;

      if (url !== "") {
        answerArray.push(url);
        console.log('second IF condition met');
      }

      //NOT SURE WHY THIS FAILED WHILE DEFINING 'URL' WORKED
      //if(childrenArray[i].data.preview.images[0].source.url != "") {
      // answerArray.push(childrenArray[i].data.preview.images[0].source.url);
    }
  }
  doStuff(answerArray);
};


function doStuff(urlArray) {
  urlArray.forEach(function(url) {
    $('.imgReturn').append('<img src="'+url+'">');
      });
};

/*

$.ajaxSetup({
  headers: {
    "Access-Control-Allow-Origin": true
  }
});

*/
