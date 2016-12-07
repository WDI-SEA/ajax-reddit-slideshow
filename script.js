$(document).ready(function() {
    $('#searchform').submit(function(event) {
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


        function getImage(response) {
            console.log(response);
            var i = 0;
            var posts = response.data.children;
            // console.log(posts);
            posts.forEach(function(post) {
                if (post.data.preview) {
                  setInterval(function() {
                        if (i == slideshow.length) {
                            i = 0};
                        $('#slideshow').html("");
                        $('#slideshow').append('<img src="' + post.data.preview.images[0].source.url + '">');
                        i++;
                    }, 2000);
                    $('#slideshow').append('<img src="' + post.data.preview.images[i++].source.url + '">');
                } else {
                    console.log("no image");
                }
            });
        }
    });
    $("#stop").click(function(){
      clearInterval();
      $('#visible').show();
    })
});
