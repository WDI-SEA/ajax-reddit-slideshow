$(document).ready(function() {

  $("button").on("click", function() {
    // e.preventDefault();
    // console.log("in the click");
    var searchString = document.forms["imageform"].elements["imagebox"].value;
    $.get('https://www.reddit.com/search.json', { //Ajax get
      q: searchString   //this is an object, make sure there is no ; or ,
    }).done(function(data) {
      // var results = data.data.children;
      var results = data.data.children; //data -- children structure and name found on reddit
      console.log(data); //use this to find data structure
      results.forEach(function(item) {
        if (item.data.thumbnail !== 'default') {
          $("#content").append("<img src='" + item.data.thumbnail + "'>");
        }
      });
    });
  });
});
