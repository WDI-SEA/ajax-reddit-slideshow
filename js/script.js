$(document).ready(function() {

//Hide stop button and error message so not there on load
 $('#stop').hide();
  $('#errorMessage').hide();

 $('#searchForm').submit(function(event) {
   event.preventDefault();
//Hide UI, show slideshow
   $('#UI').hide();
   $('#container').show();
   $('#stop').show();

   var searchTerm = event.target.search.value;

   $.ajax({
     url:'https://www.reddit.com/search.json?q=' + searchTerm,
     method:'GET',
     success: returnImages,
    error: function(response){
      console.log(response + "Error, sorry, no images for you.");
      $('#errorMessage').show();
     }
   });
// Search results
 function returnImages(response){
   var slideshowImgs = [];
   var posts = response.data.children;
   var index = 0;
   posts.forEach(function(post){
     if (post.data.preview) {
       slideshowImgs.push('<img src="' + post.data.preview.images[0].source.url + '">');
       }
   });
   console.log(slideshowImgs);
// Play images in slideshow
  var startSlideshow = setInterval(function(){
      $('#container').html('');
      $('#container').append(slideshowImgs[index]);
      index++;
    }, 3000);

    $("#stop").click(function(){
      clearInterval(startSlideshow);
      $('#UI').show();
      $('#errorMessage').hide();
      $('#container').hide();
      $('#stop').hide();
      $('#search').val('');
    });
 }
 });
});
