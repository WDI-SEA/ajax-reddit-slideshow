var posts;


$(document).ready(function() {
    $('#searchform').submit(function(e){
        e.preventDefault();

        var searchTerm = e.target.searchfield.value;
        $.ajax({
            url: 'https://www.reddit.com/search.json?q=' + searchTerm,
            method: 'GET',
            success: getImage,
            error: function(response) {
                console.log(response);
            }
        });
        // console.log(searchTerm );
    });




});

function getImage(response) {
  console.log(response);
  var i = 0;
  var slideshowPics = [];

  var posts = response.data.children;
  console.log(posts);
  posts.forEach(function (post) {
    if (post.data.preview) {
     slideshowPics.push('<img src="' + post.data.preview.images[0].source.url + '">');
    } else {
      console.log("skipped, has no image");
    }
  });
  $('#slideshow').html("");
  $('#searchform').append("<h1>I LIKE WHAT YOU'VE GOT!</h1>");
  $('#slideshow').append(slideshowPics[i]);
  setInterval(function(){
    if(i == slideshowPics.length) {i=0};
    $('#slideshow').html("");
    $('#slideshow').append(slideshowPics[i+1]);
      i++;
  },5000);

}
