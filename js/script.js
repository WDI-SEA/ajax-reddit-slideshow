

$(document).ready(function() {
  console.log("jQuery loaded");
  
  // Query reddit for images and display on page
  $('form').on('submit', function(){
    var userInput = $("[type='text']").val();
    event.preventDefault();
    // $(".search-box").attr("hidden", true);
    // $(".slideshow").attr("hidden", false);
    $.get('http://www.reddit.com/r/aww/search.json', {
      q: userInput + '+nsfw:no'
    }).done(function(returnData) {
      // Filter out any that do not have thumbnails
      var hasThumbs = returnData.data.children.filter(redditEntry => redditEntry.data.thumbnail != null)
      hasThumbs.forEach(function (item, i) {
        console.log(item.data);
        $('.img-box').append("<a href='" + item.data.url + "' target='blank'><img src='" + item.data.thumbnail + "'/></a>");
      })
    });
  });
  // Reset Page
  $('#reset-button').on('click', function() {
    // $(".slideshow").attr("hidden", true);
    // $(".search-box").removeAttr("hidden");
  })
});













//Submit search function
// function search(e) {
//   e.preventDefault();
  
// }

