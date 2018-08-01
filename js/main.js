$(function(){
	console.log("DOM has loaded.");
});
var turn = 0;

$("#query").click(function(){
	$("#query").val("");
});

$("#button").click(function(){
	if(turn %2 === 0){
		$.ajax({
		  url: "https://www.reddit.com/search.json",
		  method: "GET",
		  data: {
		    q: $("#query").val()
		  }
		}).done(function(response){
		  console.log("response.data", response.data);
		  response.data.children.forEach(function(post){
		    post.data.preview.images.forEach(function(photo){
		    	$("#images").css("backgropund", photo.source), 3000;
		    });
		  });
		}).fail(function(err){
		  console.log("error", err);
		});

		$("#title").hide();

		$("#query").hide();

		$("#button").html("Stop");

	}
	else{
		$("div").html("");

		$("#title").show();

		$("#query").show();

		$("#button").html("Search");
	}

	turn++;

});

	