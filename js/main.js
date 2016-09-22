$(document).ready(function(){
	
	//make ajax call
	// $.ajax()
	var picArray = [];
	var interval = null;
	var count = 0;


	$("#searchButton").click(function(){
		var text = $("#searchText").val();
		if(text) {
			fillData(text);
			$("#questionForm").hide();
			$("").show//create a stopn button and set display none
	    }
		else {
			alert("empty textbox");
		}

	});


	function fillData(searchTerm) {
		$.get("https://www.reddit.com/search.json", {
			q: searchTerm
		}).done(function(info){
		    info.data.children.forEach(function(post){
				var a = $("<a>");

				var thumb; 
					if(!post.data.thumbnail || post.data.thumbnail === "self" || post.data.thumbnail === "default" || post.data.thumbnail === "nsfw") {
						thumb = $("<img src= http://i.imgur.com/pfPxFBw.jpg>");
						}
					else {
						thumb = $("<img src='" + post.data.thumbnail + "'>");
					}

				a.append(thumb);
				picArray.push(thumb);
			   // $("#results").append(a); go in change picture
				
			});
			//set interval


			interval = setInterval(changePicture, 1000); //refreshes function indefinitely
			
		});

	}



	function changePicture(){
		if(count < picArray.length){
			$("#results").append(picArray[count]);
			count++;
		} else {
			count = 0;
		}

		console.log("changing picture");//set index to count, pull out atag and replace it in the results
	}

	function stopSlideShow(){

	}
	//post.data.preview.images[0].source.url
});











// function removeText(){

// }