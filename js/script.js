var urlArray = [];
$(document).ready(function() {
$('#button').click(function() {
  var inputText = $('#search').val();
    $.ajax({
      url: "https://www.reddit.com/search.json",
      type: "get",
      data: {
      q: inputText
   },

  }).done(function(data) {
        var posts = data.data.children;
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            if (post.data.hasOwnProperty('preview') == true){
            var postImages = post.data.preview.images;
    //    for(var x in list){
    // setInterval(function(){
    //     list[x] += 10;
            for (var j = 0; j < postImages.length; j++) {
                var image = postImages[j];
                var relay = "<img src=" + "'" + image.source.url + "'" + ">";
 								$('#display').html(relay);
              },
             }
          }
          return urlArray;
          console.log("prep", urlArray);
   //    });
 	 //   for(var i = 0; i < urlArray.length; i++){
 	 //     doSetTimeout(i, urlArray[i]);

 	 //     	function doSetTimeout(i, item){
 	 // 		setTimeout(function(){
	  //   $("#display").attr('src').replace(urlArray[i]);
	  //   console.log(urlArray[i]);
  	// }, 1000 * (i + 1));
	})
 	   
 	 });
	});


