$(document).ready(function(){

  $('#btn').on('click',function(){
  
    var newEntry = $('#addEntry').val(); // input value

    console.log(newEntry);

    $('#title').fadeOut('slow');
    $('#description').fadeOut('slow');
    $('#addEntry').fadeOut('slow');
    $('#btn').fadeOut('slow');

    $('#btn-stop').show();

    $.ajax({
      url:'https://www.reddit.com/search.json',
      method: 'GET',
      data: {
        q: newEntry
      },
      success: function(redditData){
        console.log(redditData);
        
        for(var i = 0; i < redditData.data.children.length; i++){
          var post = redditData.data.children[i];

          if(post.data.url){
            $('#slides').append("<img src="+post.data.url+"/>");
          }
        }        
      },
      error: function(error){
        console.log(error);
      }
    });
  });

  $('#btn-stop').on('click',function(){
    $('#title').fadeIn('slow');
    $('#description').fadeIn('slow');
    $('#addEntry').fadeIn('slow');
    $('#btn').fadeIn('slow');

    location.reload();
  });

  $(document).ajaxStop(function () {
      $('#slides').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
  });




});