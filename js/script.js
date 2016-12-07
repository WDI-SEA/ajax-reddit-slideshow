$("document").ready(function(){
  console.log("I'm ready");
  $("#stop").hide();

  $("stop").submit(function(event){
    event.preventDefault();
    clearInterval();
    toggleButtons();
  })

  $("#search-form").submit(function(event){
    event.preventDefault();

    var photoSearch = event.target.search.value;

    $.ajax({
      url:"https://www.reddit.com/search.json?q=" + photoSearch + "+nsfw:no",
      method: "GET",
      success: function(response) {
        console.log(response);
        // hide search form & show stop button
        toggleButtons();

        var photos = [];
        var photo = response.data.children;
        photo.forEach(function(pic){
          if (pic.data.preview)
          photos.push(pic.data.preview.images[0].source.url);
        })

        var counter = 0;
        setInterval(function(){
            $("#results").html("");
            console.log("<img src=" + photos[counter] + ">");
            $("#results").append("<img src=" + photos[counter] + ">");
            counter++
            if (counter > 13) {
              counter = 0
            };
        },3000)
      },
      error: function(response) {
        console.log(response);
      }
    })
  })

  function toggleButtons() {
    $("#intro").toggle();
    $("#stop").toggle();
  }
});
