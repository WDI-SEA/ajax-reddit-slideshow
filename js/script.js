$(document).ready(function(){
  

   

  $("#searchButton").click(function(){
    var text = $("#searchText").val();
    if(text){
      fillData(text);
    }
    else {
      alert("Empty textbox!");
    }
  });

 $(function(){
      $("#searchButton").on('click',function() {
         $('#hideForm').hide();
            
            }); 
     });


 $(function(){
      $("#display").on('click',function() {
         $('#hideAll').hide();
            
            }); 
     });



  function fillData(searchTerm){
    $.get("https://www.reddit.com/search.json", {
      q: searchTerm
    }).done(function(info){
      info.data.children.forEach(function(post){
        var link = $("<a href='" + post.data.url + "'>" + post.data.title + "</a>");
        var listItem = $("<div>");

        var thumb;
        if(!post.data.thumbnail || !post.data.thumbnail === "self") {
          thumb = $("<img src='http://static9.depositphotos.com/1533960/1232/i/950/depositphotos_12328114-Text-word-on-blue-cubes.jpg'>");
        }
        else{
          thumb = $("<img src='" + post.data.thumbnail + "'>");
        }

        listItem.append(thumb);
       

        $('#images').append(listItem);
      }); //end of forEach


    }); //end of done()
  }

});

 // $("#loading").ajaxStart(function(){
  //    $(this).show();
  //     }).ajaxStop(function(){
  //       $(this).hide();
  //           });
