$( document ).ready(function() {

  //Stores user input field data (string)
  var newSearch = $("input").val();

  //Clear input field on click
  $("input").focus(function() {
    if ($(this).val() == "Image Search") {
      $(this).val('');
    }
  });

  //Reset dummy input if focus is lost
  $("input").blur(function() {
  if ($(this).val()=="") {
    $(this).val("Image Search");
  }
  });

  //On submit perform AJAX query on reddit
  $("#userInput").submit(function(event){
    //Prevent default behavior on submission form
    event.preventDefault();
    //Variable to store user input
    var searchTerm = event.target.search.value;
    console.log(searchTerm);
    //Query Reddit for JSON matching searchTerm
    $.ajax({
      url:"https://www.reddit.com/search.json?q=" + searchTerm,
      method: "GET",
      success: function(response) {
        console.log(response);
        //Clear out images on successful AJAX query
        $("#imageContainer").html("");
        //Variable set to images obj
        var images = response.data.children;
        //Loop through and append each image to imageContainer
        images.forEach(function(image){
          //Check to see if image preview (image) exists
          if(image.data.preview){
            console.log(image.data.preview.images[0].source.url);
            //Append image to imageContainer
            $("#imageContainer").append("<img src= " + image.data.preview.images[0].source.url + ">");
          }
          else {
            console.log("Item has no image")
          }
          // console.log(image.data.title);
          // $("#imageContainer").append(response.data.children.data.preview.images.source.url);
        });
      },
      error: function(respone) {
        console.log(response);
      }
    });
  })
});


// $.get('https://www.reddit.com/search.json', {
//   q: 'kittens'
// }).done(function(data) {
//   console.log(data);
// });
