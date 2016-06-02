$(function() {
  $('#slide-cont').hide();
  $(function(){
    $("#slides").slidesjs({
      width: 600,
      height: 400
    });
  });

  $('form').on('submit', function(e){
    e.preventDefault();
    // getResults();
    // $('.container').hide()
    $('#slides').show();
  })


})

function getResults() {
  $.ajax({
    type: "GET",
    url: "http://www.reddit.com/search.json?q=cats+nsfw:no",
    dataType: "json",
    success: function(reddit) {
      console.log(reddit.data.children[0].data.thumbnail);
    }
  })
}
