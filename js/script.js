var images = [];

$(document).ready(function(){

  $('#search-form').submit(function(event){
    event.preventDefault();
    var imageLookup = event.target.search.value;

    $.ajax({//It takes an object
          url: 'https://www.reddit.com/search.json?q=' + imageLookup,
          method: 'GET', // getting data from the above server locatioin
          success: function(response){//response is a argument (Whats coming back)
            console.log(response);//When page refreshes look in console to see the object
            $('#search-form').hide();//Wipe out HTML of container. Lets you do multiple requests
            var posts = response.data.children; //The layers in dev tools of the object
            posts.forEach(function(post){//Post is just a name not set in JS ex:0 object
              // console.log(post.data.title);//garbbing object 0 then object data then the title
              images.push(post.data.url);

              // $('#container').append('<p>' + post.data.title + '</p>');//allows multiple requests
            });
            // console.log(images);
            // console.log(images);
            // images.forEach(function(imageURL){//Post is just a name not set in JS ex:0 object
            //   // console.log(post.data.title);//garbbing object 0 then object data then the title
            //   $('#container').append('<img src=' + imageURL + '/>');//allows multiple requests
            // });

            var counter = 0;
          setInterval(function() {
                $('.image-container').html('');
                $('.image-container').append('<img src=' + images[counter] + '/>');//allows multiple requests
                counter++;
            }, 3000);
          },

        // error: function(response){
        //    console.log(response);
        //   }
      });

  });


});
