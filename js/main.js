$(function(){
	console.log("DOM has loaded.");
});
var turn = 0;
var interval, picArray, currentindex;

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
		  picArray = response.data.children.filter(function(post){
		  	return post.data.post_hint === "image";
		  })
		  picArray = picArray.map(function(post){
		  	return post.data.url;
		  });
		  currentindex =0;
		  console.log(picArray);

		  interval = setInterval(switchPic, 3000);
		  })
		.fail(function(err){
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

		clearInterval(interval);

	}

	turn++;

});

function switchPic(){
	console.log("switching picture");
	if(currentindex>= picArray.length){
		currentindex = 0;
	}

	console.log(picArray[currentindex]);

	var newImage = $("<img src='" + picArray[currentindex] + "'>");
	$("#images").empty().append(newImage);

	currentindex++;
};

	