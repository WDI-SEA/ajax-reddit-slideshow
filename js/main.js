$( document ).ready(function() {

  //Stores user input field data (string)
  var newSearch = $("input").val();
  var i = 0;

  //Store all images as array for slideShow
  var slideShow = [];

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
            //Append image URL to slideShow array
            slideShow.push(image.data.preview.images[0].source.url);
            console.log(slideShow);
              // $("#imageContainer").append("<img src= " + image.data.preview.images[0].source.url + ">");

          }
          else {
            console.log("Item has no image")
          }
          // console.log(image.data.title);
          // $("#imageContainer").append(response.data.children.data.preview.images.source.url);
        });
        if(slideShow.length > 0) {
          $("#imageContainer").append("<img src=" + slideShow[0] + "/>");
          setInterval(function(){
          //Clear previous image
            $("#imageContainer").html("");
          //Append image to imageContainer
            $("#imageContainer").append("<img src=" + slideShow[i+1] + "/>");
            console.log(slideShow[i]);
            i++;
          }, 5000);
        }
      },
      error: function(respone) {
        console.log(response);
      }
    });

    // if(slideShow.length > 0) {
    //   setInterval(function(){
    //   //Clear previous image
    //     $("#imageContainer").html("");
    //   //Append image to imageContainer
    //     $("#imageContainer").append("<img src=" + slideShow[i] + "/>");
    //     console.log(slideShow[i]);
    //     i++;
    //   }, 2000);
    // }

  })
  // if(slideShow.length > 0) {
  //   setInterval(function(){
  //   //Clear previous image
  //     $("#imageContainer").html("");
  //   //Append image to imageContainer
  //     $("#imageContainer").append("<img src=" + slideShow[i] + "/>");
  //     console.log(slideShow[i]);
  //     i++;
  //   }, 2000);
  // }


});
