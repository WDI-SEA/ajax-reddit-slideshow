





$(document).ready(function() {


  //hardcoded an array
  var arr = ["http://b.thumbs.redditmedia.com/WXyHqfIAhyuWvF8D-nnpHAC1Xsm86VZQxeP4DuuFGNI.jpg", "http://a.thumbs.redditmedia.com/2v6BSCMOC26peikAqqw1U0uhMI3skU9xg2WzrEGgIy8.jpg", "http://b.thumbs.redditmedia.com/GMU82-QD_AwN8B9uytIVbbPe10DV8EOTp-WetYJzYAM.jpg"];

  //verify array is available
  console.log("start for loop");
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  };
  console.log("end for loop");

  //started slideshow
  $("#slideshow > div:gt(0)").hide();
  setInterval(function() {
    $('#slideshow > div:first')
      .fadeOut(0)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  }, 3000);



  //started submit event listener

  $('#search-form').submit(function(event) {
    event.preventDefault();

    console.log(event.target);

     var searchTerm = event.target.search.value;

     $.ajax({
       url: 'https://www.reddit.com/search.json?q=' + searchTerm,
       method: 'GET',
       success: function(response) {
         $('#container').html(''); // Wipe out html of container
         var posts = response.data.children;
         var titleArray;
         posts.forEach(function(post) {
           console.log(post.data.title);
           var arr = $.map(post.data.title, function (el) {
             return el.titleArray;
           });

           $('#container').append('<p>' + post.data.title + '</p>');
         });
       },
       error: function(response) {
         console.log(response);
       }
     });
  });


});

  /*
  $('#search-form').submit(function(event) {
    event.preventDefault();
    console.log(event.target);
     var searchTerm = event.target.search.value;
     $.ajax({
       url: 'https://www.reddit.com/search.json?q=' + searchTerm,
       method: 'GET',
       success: function(response) {
         $('#container').html(''); // Wipe out html of container
         var posts = response.data.children;
         posts.forEach(function(post) {
          console.log(post.data.thumbnail);
           $('#container').append('<p>' + post.data.thumbnail + '</p>');
           //$('#slideshow').append('<div><img src="'+post.data.thumbnail+'"></div>');

         });
       },
       error: function(response) {
         console.log(response);
       }
     });
  });
  */

/*

"preview": {
            "images": [
              {
                "source": {
                  "url":

*/
