$(document).ready(function() {
  $("#search").on("click", function(e) {
    e.preventDefault();
    var storedQuery = $("#query").val();
    var url = "http://www.reddit.com/search.json?q=" + storedQuery + "+nsfw:no";
      console.log(url);
    $.get(url, function(data1) {
      // $("query").html()
      for (var i = 0; i < data1.data.children.length; i++) {
        var thumbnail = data1.data.children[i].data.thumbnail;
        var img = $(document.createElement('img'));
          console.log(img);
          img.attr('src', thumbnail)
        //console.log(data1.data.children[i].data.thumbnail);
      }


    });

  });
});
