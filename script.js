$(document).ready(handleDocumentReady);

function handleDocumentReady() {
  console.log("ready function actually running");
  $('#stop').show();
  $('#searchform').submit(handleSubmit);
  $("#stop").click(handleStop);
}

console.log("after ready function definition");

function handleSubmit(event) {
  event.preventDefault();
  $('#visible').hide();


  var searchTerm = event.target.searchfield.value;
  $.ajax({
      url: 'https://www.reddit.com/search.json?q=' + searchTerm,
      method: 'GET',
      success: getImage,
      error: function(response) {
          console.log(response);
      }
  });
}

function handleStop() {
  clearInterval();
  $("slideshow").html("");
  $('#visible').show();
}

// The response object looks something like this:
// response {
//   data: {
//     children: [
//       {data: { preview: "cat.png"}},
//       {data: { preview: "dog.png"}},
//       {data: { preview: "cow.png"}},
//     ]
//   }
// }

function getImage(response) {
  console.log(response);
  var i = 0;
  var posts = response.data.children;
  // console.log(posts);
  setInterval(handleInterval, 2000);
  posts.forEach(attachPostToSlideshow);
}

function attachPostToSlideshow(post) {
  if (post.data.preview) {
    var url = post.data.preview.images[0].source.url;
    $('#slideshow').append('<img src="' + url + '">');
  } else {
    console.log("no image");
  }
}

function handleInterval() {
  if (i == slideshow.length) {
      i = 0
  };
  $('#slideshow').html("");
  $('#slideshow').append('<img src="' + post.data.preview.images[0].source.url + '">');
  i++;
}
