

$(document).ready(function() {
  console.log("jQuery loaded");
  
  // Cursor is focused in search box
  $("#search").focus();
  // Query reddit for images
  $('form').on('submit', function(){
    var userInput = $("[type='text']").val();
    event.preventDefault();
    $(".search-box").css("display", "none");
    $(".slideshow").css("display", "inline-block");
    $.get('http://www.reddit.com/r/aww/search.json', {
      q: userInput + '+nsfw:no'
    }).done(function(returnData) {
      // Filter out any that do not have thumbnails
      var hasThumbs = returnData.data.children.filter(redditEntry => redditEntry.data.thumbnail != null)
      hasThumbs.forEach(function (item, i) {
        console.log(item.data);
        //display images on page
        $('.img-box').append("<a href='" + item.data.url + "' target='blank'><img src='" + item.data.thumbnail + "'/></a>");
      })
    });
  });
  // Reset Page for a new search
  $('#reset-button').on('click', function() {
    $(".search-box").css("display", "inline-block");
    $(".slideshow").css("display", "none");
    $("input[type='text']").val("");
    $("#search").focus();
    // Remove data/images from previous search
    
  })
});













//Submit search function
// function search(e) {
//   e.preventDefault();
  
// }

