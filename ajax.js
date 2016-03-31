//global variable for user search term, pic Array and counter
var searchTerm; 
var picArray= [];
var counter =0;

$('#inPut').submit(function(event){
  event.preventDefault();

  searchTerm = $('#searchField').val();

  if(!searchTerm) {
    alert('Please enter a search term!');
    return;
  } else {
    searchReddit(searchTerm);
  }
  $('#searchField').val('');  

});

//event listener to fade out input once pictures have loaded
$(document).on('click', '#searchButton', function(){
 $('#inPut').fadeOut();
})

//event listener
$(document).on('click', '#stop', function(){
 $('#slide').fadeOut();
 // $('#slide').val('');
 $('#inPut').fadeIn();
 $('#searchField').val(''); 
})


var searchReddit = function(text) {

  console.log("searching for: ", searchTerm);
  
  $.get('https://www.reddit.com/search.json', {
    q: searchTerm
  }).done(function(response) {
    console.log(response);

    var results=response.data.children ;

    for(var i = 0; i < results.length; i++){

      if(results[i].data.preview) {

        var result = results[i].data.preview.images[0].source.url;

        addSearchResult(result);
        
      }
    } 
    setInterval(flashPics, 1000);
  })
};


function addSearchResult(result) {

  picArray.push(result);

};


function flashPics() {

  $("#slide").attr("src", picArray[counter])
  counter++;
}    





