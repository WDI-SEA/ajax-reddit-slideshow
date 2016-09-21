
//prevent default submit action
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
});


//form and search button
$("#searchButton").click(function(){
  var text = $("#searchText").val(); //getting value from form text input
  if(text) {
    fillData(text); //sending search value to fillData function
  }
  else {
    alert("Empty textbox;")
  }
});


//set up variables and defaults
var myImage = 0;
var imagesArray = [];
var slideshow = 0;
$("#stopButton").css("display", "none");
$("#slideShowImages").html("");


//get data from reddit api
function fillData(searchTerm) { //passing searchTerm from above
  $.get("http://www.reddit.com/search.json", {
    q: searchTerm
  })
  .done(function(info){
    console.log(info);
    info.data.children.forEach(function(post){

      if (post.data.thumbnail !== "self") {
        // $("#results").append("<img src='" + post.data.thumbnail + "'>");
        myImage = post.data.thumbnail;
        imagesArray.push(post.data.thumbnail);
      };
    });

    setInterval(function(){
      indexNum = Math.floor(Math.random() * ((6)+1));
      $("#slideShowImages").html("<img src='" + imagesArray[indexNum] + "' width='300'>");
      imagesArray[indexNum];
     }, 2000);

     setTimeout(function(){
      $("#stopButton").css("display", "inline");
     }, 2000);

  });
};


//stop button functionality
$("#stopButton").click(function(){
  $("#slideShowImages").fadeOut('slow');
  $("#stopButton").fadeOut('slow');
  $("#form").fadeIn('slow');
});



//form dissapears when search
$('#searchButton').click(function(){
  $('#form').fadeOut('slow');
  $('#searchReddit').fadeOut('slow');
});
