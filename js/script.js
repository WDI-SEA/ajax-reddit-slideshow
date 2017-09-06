var searchWord = $('#searchTerm');
var button = $('#btn');

button.click(function() {
  var inputText = searchWord.val();
  $.ajax({
    url: "https://www.reddit.com/search.json",
    type: "get",
    data: {
      q: inputText
    },
  }).done(function(data) {
    searchWord.focus();
    var posts = data.data.children;
      for(var i = 0; i<posts.length; i++){
        //this is how I'm checking to make sure the reddit post is an image and not text
        if (posts[i].data.hasOwnProperty('preview')){
          var imgURL = posts[i].data.url;
          $('#container').append("<img src=" + "'" + imgURL + "'" + ">");
        }
      }
  });
});