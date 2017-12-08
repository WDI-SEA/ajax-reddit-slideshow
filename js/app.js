$(function() {
  // attach the form submission to the search function
  $('#search-form').on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();
  $('#new-search').hide();
  var userInput = $('#query').val();
  $.get('http://www.reddit.com/search.json',{
    q: userInput,
    limit: 30
  }).done(function(response){
    try{
    addSearchResult(response.data.children);
    }catch(e){
          console.warn("post had invalid link");
          $(slideShow).createElement('<p>').html("No Photo Available")
        }
  });
}

//stop button
$("#stop").on('click', clearSearchResults);

// Clear previous search results.
function clearSearchResults() {
  $('#slide-show').html('');
  $('#happening').hide();
  $('#new-search').show();
  $('#query').val();
}

// Adds a single result object to the page.
function addSearchResult(results) {
  $('#happening').show();
  for(var i=0; i<results.length; i++){
    (function(i){
      setTimeout(function(){
        var slideShow = document.getElementById('slide-show');
    
    // create an anchor tag
        var a = document.createElement('a');
        a.href = results[i].data.url;
          var img = document.createElement('img');
          img.src = results[i].data.preview.images[0].source.url;
          img.style.height = "300px";
          $(img).append(a);
          $(slideShow).html(img);
      
      }, 3000*i);
    })(i);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  console.log('script.js is loaded!');
  $('#happening').hide();
});