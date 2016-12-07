var posts;
var slideshowPics = [];
var i=0;
var posting;
$(document).ready(function() {
    $('#searchform').submit(function(e){
        e.preventDefault();
        slideshowPics = [];
        console.log("trying to stop " + posting);
        clearInterval(posting);
        i = 0;
        var searchTerm = e.target.searchfield.value;
        $.ajax({
            url: 'https://www.reddit.com/search.json?q=' + searchTerm,
            method: 'GET',
            success: getImage,
            error: function(response) {
                console.log(response);
            }
        });
        console.log("Searching for : "+searchTerm );
    });




});

function getImage(response) {
  // console.log(response);
  // var i = 0;


  var posts = response.data.children;
  console.log(posts);
  posts.forEach(function (post) {
    if (post.data.preview) {
     slideshowPics.push('<img src="' + post.data.preview.images[0].source.url + '">');
    } else {
      console.log("skipped, has no image");
    }
  });
  console.log(slideshowPics);
  $('#slideshow').html("");
  $('#headline').text("");
  $('#headline').append("I LIKE WHAT YOU'VE GOT!");
  console.log("posting slideshowPic " + i);
  $('#slideshow').append(slideshowPics[i]);
  i++;
  posting = setInterval(postImage,5000);

}

function postImage (){
  if(i == slideshowPics.length) {i=0};
  $('#slideshow').html("");
  console.log("posting slideshowPic " + i);

  $('#slideshow').append(slideshowPics[i+1]);
    i++;
}
