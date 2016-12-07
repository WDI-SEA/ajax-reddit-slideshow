$(document).ready(function(){
  $("#search-form").submit(function(event){
    event.preventDefault();

    var searchTerm = event.target.search.value;

    $.ajax({
    url: 'https://www.reddit.com/search.json?q=' + searchTerm,
    method: 'GET',
    success: function(response) {
      console.log(response);
      $("#container").html(""); // wipe out html of container
      var posts = response.data.children;
      posts.forEach(function(post){
        console.log(post.data.title);
        $("#container").append('<p>' + post.data.title + '</p>');
      });
    },
    error: function(response) {
      console.log(response);
    }
    });
});
});
