$(document).ready(function() {


$('#button').click(function() {

  var inputText = $('#search').val();

    $.ajax({
      url: "https://www.reddit.com/search.json",
      type: "get",
      data: {
      q: inputText
   },
  }).done(function(data) {
        var posts = data.data.children;
        var imgArray = [];
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            if (post.data.hasOwnProperty('preview') == true){
            var postImages = post.data.preview.images;
            for (var j = 0; j < postImages.length; j++) {
                var image = postImages[j];
                var htmlImg = "<img src=" + "'" + image.source.url + "'" + ">";
                $('#slides').append(htmlImg);
              } 
            } 
          }          
          $("#slides").slidesjs({
            width: 940,
            height: 528
        });
      });
   });
});

      
   



