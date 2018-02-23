
var imgCounter = 0;
var myInterval = null;
var results = [];


var updateImage = function() {
	if (imgCounter < results.length) {
		imgCounter++;
	}else {
		imgCounter = 0;
	}
	$("img").attr('src', results[imgCounter].data.thumbnail);
}

var clearShow = function() {
	clearInterval(myInterval);
  $("img").attr('src', " ");
}

$(document).ready(function() {

  $("#startbutton").on("click", function() {
    var searchString = document.forms["imageform"].elements["imagebox"].value;
    
    $.get('https://www.reddit.com/search.json', {
        q: searchString
    }).done(function(data) {
      results = data.data.children; //item stored as a variable
      //console.log(data); //important to d in arder to find data in response log
      //results.forEach(function(item) {
        //if (item.data.thumbnail !== 'default') {//checks for broken images
        results = results.filter(function(item) {
          return item.data.thumbnail !== 'default'
      });
      
      myInterval = setInterval(updateImage, 2000);
      $("#inputContainer").hide();
      $("#stopbutton").show();
      
      $("#stopbutton").on("click", function() {
  		    clearShow();
          results = [];
          imgCounter = 0;
          $("#stopbutton").hide();
          $("#inputContainer").show();
          $("#imagebox").val('');
          $("#imagebox").focus();
      })
	   });
  });
});



