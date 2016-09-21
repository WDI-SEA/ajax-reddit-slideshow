$(document).ready(function(){

//STOP THE FORM FROM SUBMISSION FROM REFRESHING PAGE
$('#hideForm').on('submit', function(e) {
  e.preventDefault();
  console.log('clicked!');
});

//ASSIGNING THE SEARCH BUTTON CLICK TO THE VALUE ENTERED IN SEARCH BOX
$("#searchButton").click(function(){
  var text = $("#searchText").val();
  if(text){
    fillData(text);
  }
  else {
    alert("Enter something to search for!");
  }
});

//HIDE THE SEARCH BOX AND BUTTON DIV WHEN SEARCH IS CLICKED
$("#searchButton").on('click',function() {
  $('#hideForm').slideToggle();
  });

//GET THE PICTURES FROM REDDIT AJAX AND APPEND THEM TO THE IMAGE DIV
//SHOWS THE STOP BUTTON WHEN SEARCH IS CLICKED
//NEED TO FIGURE OUT A WAY TO CREATE AN ARRAY OF IMAGES AND APPLY
//SETINTERVAL AND CLEARINTERVAL
function fillData(searchTerm){
  $.get("https://www.reddit.com/search.json", {
    q: searchTerm
  }).done(function(info){
    console.log(info);

    info.data.children.forEach(function(post){
      console.log(post);

      var listItem = $("<div>");
      var images = $("<img class='mySlides' src='" + post.data.preview.images[0].source.url + "'>");

      listItem.append(images);
      $("#results").append(listItem);
      $('#stopButton').show();
    });
  });
}

//REMOVES THE LAYERED PICTURES ONE BY ONE WITH EACH CLICKED
$(document).on('click', '.mySlides', function(event){
  event.preventDefault();
  $(this).fadeOut("slow");
});

//MAKES THE STOP BUTTON REFRESH THE PAGE
$('#stopButton').click(function() {
    location.reload();
});

});
