$(document).ready(function() {

var searchWord = $('#searchTerm');
var button = $('#btn');


// button.on('click' ,function(){
//   if(!searchWord){
//     //jQuery function to inform user to enter text
//   }else{
//   console.log(searchWord.val());
//   search(searchWord.val());
// }



button.click(function() {

  var inputText = searchWord.val();
 $.ajax({
      url: "https://www.reddit.com/search.json",
      type: "get",
      data: {
      q: inputText
   },
  }).done(function(data) {
    var posts = data.data.children;
    //console.log(posts)
    for(var i = 0; i<posts.length; i++){
      if (posts[i].data.hasOwnProperty('preview')){
        var pictureObj = posts[i].data.preview.images;
        for(var j = 0; j < pictureObj.length; i++){
          var imgURL = pictureObj[j].source.url;
          $('#container').append("<img src=" + "'" + imgURL + "'" + ">");
        }
      }
    }
    
      });
   });
});