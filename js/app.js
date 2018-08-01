$.ajax({
  url: "https://www.reddit.com/search.json",
  method: "GET",
  data: {
    q: "Kittens"
  }
}).done(function(response){
  console.log("response.data", response.data);
  response.data.children.forEach(function(post){
    console.log(post.data.title);
  });
}).fail(function(err){
  console.log("error", err);
});