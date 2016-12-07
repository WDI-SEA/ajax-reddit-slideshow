$(document).ready(function() {
  $("#search-form").submit(function(event){
    event.preventDefault();

    var searchTerm = event.target.search.value;
    var reddit = "https://www.reddit.com/search.json?q="

    $.ajax({
      url: reddit + searchTerm + "+nsfw:no",
      method: 'GET', // POST if posting to server, look this up
      success: function(response) { // response is an object
        $("#container").html(""); // clear HTML from container before (re)populating container
        var posts = response.data.children;

        posts.forEach(function(post) { // iterate over each item in posts, an array of "children"
          console.log(post.data.title); // "title" is found under "data", "data" is found in each input from function parameter
          $("#container").append("<p>" + post.data.title + "</p>");
        });
      },
      error: function(response) {
        console.log(response);
      },
    });

  });

});
