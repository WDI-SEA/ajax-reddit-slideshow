var picArray = [];
var picIndex = 0;

function displayImage() {									//this is Scott Ammon's function; not sure how to do this
    $('.image').attr("src",picArray[picIndex]);
    $('.image').fadeIn(1000);
    setTimeout(function() { $('.image').fadeOut(1000);}, 2000);
};


$(document).ready(function() {

	$('form').on('submit', function(e) {
	e.preventDefault(); 
	var userInput = $("#itembox").val();
    console.log(userInput);
	$(".hidethis").toggle();
	$("#itembox").focus();
  	
   	$.get("http://www.reddit.com/search.json", {   //ajax "get" call
		q: userInput + "+nsfw:no",
	 }).done(function(returnData){       //ajax callback to get photos array -- promise returnData is our function name
		
		//do a for each loop through array
		returnData.data.children.forEach(function(item) {
			
		if(item.data.thumbnail !== 'default' && item.data.thumbnail !== 'self') {		//this is Scott Ammon's loop
  		            picArray.push(item.data.thumbnail);

		$("#itembox").focus();
		$("#itembox").val('');
		}
	  })	
	})


    var picInterval = setInterval(function() {     //this is Scott Ammon's function; not sure how to do this
       displayImage();
       picIndex++;
       if(picIndex >= picArray.length) {
          picIndex = 0;
      }
      }, 4000);
  })
})





   

