var lastImageIndex = 0;
var img;
var imgLink;
var responseDataArray;
var userInput;
// var pictureCount;

// Hide results div until search is triggered.
$("#after-search").hide();

// Links form to search function
$(function() {
  $("#form").on("submit", search);
});

$(function() {
  $("#stop").on("click", function() {
  	$("#after-search").hide();
    $("#before-search").show();
    location.reload();
  })
})


// Get data from AJAX, REDDIT
function search(event) {

  // Prevent default refresh on form
  event.preventDefault();

  userInput = $("#search-box").val() || "pancakes";
  console.log("User input was, ", userInput);
  // <TODO> Take in a number through input box, store it
  // pictureCount = $("#picture-count-box").val();

  $.get('https://www.reddit.com/search.json', {
    q: userInput,

    //<TODO> Make limit dynamic through var pictureCount
    limit: 10

  }).done(function(response) {
    console.log(response.data.children);
    responseDataArray = response.data.children;
    //Hide before-search
    $("#before-search").hide();
    //Show picture div
    $("#after-search").show();
    $("#after-search").first().prepend("<p>You are viewing a show of: "+ userInput +"</p>");
    //add what you are searching in h1
    setInterval(grabImage, 3000);
  });
}

//"https://b.thumbs.redditmedia.com/3EnvFbsTW0pRj1gk_qcn-WGB2cHa9R43uXaSm9pBovs.jpg"
function grabImage() {

	//setting img var to preview url at selected index
	img = responseDataArray[lastImageIndex].data.preview.images[0].source.url;
  // img = responseDataArray[lastImageIndex].data.thumbnail;
  imgLink = responseDataArray[lastImageIndex].data.permalink;
  // turn img src into img tag
  // change content of resultDiv to img with var img's src
  $("#resultDiv").html("<a href=\"https://reddit.com" + imgLink +"\"><img src=\"" + img + "\"></a>");
  console.log(img);
  lastImageIndex++;
}

