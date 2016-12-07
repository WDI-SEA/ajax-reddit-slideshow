var posts=[];
var index=0;
var refreshIntervalId;

var displayPost = function(){ //iterating over each post
  while (posts[index].data.preview === undefined) {
      index++;
      if (index === posts.length) {
          index = 0;
      }
  }

  console.log(posts[index].data.preview.images[0].source.url); //printed out titles on first page
  $('#img').attr('src', posts[index].data.preview.images[0].source.url); //appends to the html element
  index++;
  if (index === posts.length) {
      index = 0;
  }
}


function onAjaxSuccess(response) {
    // $('#container').html(''); // wipes out html of container  - document.getElementbyId('container').innerHTML = '';
    posts = response.data.children; //dig down
    // posts.forEach(displayPost);
    refreshIntervalId=setInterval(displayPost, 1000);
}

function onAjaxError(response) {
    console.log(response);
}

function onFormSubmit(event){ // gets for input
    event.preventDefault(); // stops page reloading

    var searchTerm = event.target.search.value; //gets input from search value

    $.ajax({
      // https://www.reddit.com/search.json?q=cats
      url: "https://www.reddit.com/search.json?q=" + searchTerm,
      method: "GET",
      success: onAjaxSuccess,
      error: onAjaxError
    });
    $("h1").hide();
    $("h3").hide();
    $("#search-form").hide();
    $("#stop").show();
    $("#container").show();
}

function onDocumentReady() {
    $("#stop").hide();
    $("#container").hide();
  $('#search-form').submit(onFormSubmit);
}

$(document).ready(onDocumentReady);

var onStopClick = function() {
    clearInterval(refreshIntervalId);
    $("#search-form").show();
    $("h1").show();
    $("h3").show();
    $("#stop").hide();
    $("#container").hide();
}

$("#stop").click(onStopClick);
