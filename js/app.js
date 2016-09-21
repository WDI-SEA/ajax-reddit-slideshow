console.log('working');

// fix previous and next buttons
// why slow

var testArray = ['this', 'that', 'the other'];

//var arrayLength = testArray.length;

//console.log(testArray.length);

var listLength = $("#imageList li").length; //<------- !!!
console.log(listLength);

// $("#imageList").append('<li> this is a new list item</li>');
// $("#imageList").append('<li> this is a new list item 2</li>');
// $("#imageList").append('<li> this is a new list item 3</li>');
// $("#imageList").append('<li> this is a new list item 4</li>');
//$("ul li(testArray)").append('<li> this is a new list item - added to li</li>');



//-----------




var imageURL;
var images = [];

$("#nextImage").hide();
$("#previousImage").hide();

	$("#searchButton").click(function() {
		//images = [];
		var text = $("#searchText").val();
		if(text) {
			getImages(text);
			$("#nextImage").show();
			$("#previousImage").show();
			$("#welcome").hide();
		}
		else {
			console.log("empty textbox");
		}
	});

$("#resetButton").click(function() {
	images = [];
	$("#navigation").hide();
	$("#imageList li").remove();
	$("#welcome").show();
	$('#searchText') = '';
	// placeholder in text box
});

function listItem(list) {
	$(list).append('<li></li>');
}

function getImages(searchTerm) {
	$.get("https://www.reddit.com/search.json", {
		q: searchTerm
	})
	.done(function(info) {  
		info.data.children.forEach(function(post){
			var imageURL = post.data.url;
			console.log(imageURL);
			if(post.data.domain.includes('imgur.com') && post.data.url.includes('.jpg')) {
				images.push(post.data.url); // ----- array
				$("#imageList").append('<li><img src="' + post.data.url + '" class="image"/></li>');
				$("#imageList li").hide();
				$("#imageList li").first().show();
				$("#imageList li").first().addClass("active");
			}

		});	

		var currentImage = images[0];
		//$("#ssImage").html('<img src="' + currentImage + '" class="image">');
		$("#slidePosition").html(images.indexOf(currentImage) + 1 + '/' + images.length);



// clicking next button

		$("#nextImage").click(function() {

//back to beginning

			// $("#imageList li.active").removeClass('active');

			// $("#imageList > li").next(1).show().addClass('active');

			var item = $('#imageList li.active');
			item.removeClass('active').hide();
			item.next().addClass('active').show();
			if(item.next().length == 0){
				$('#imageList li').first().addClass('active');
			}
			
			currentImage = images[images.indexOf(currentImage) + 1];

/// existing

			// if(images.indexOf(currentImage) == images.length - 1) {
			// 	$("ssImage").html('<img src="' + images[0] + '" class="image">')
			// }

			// else {
			// currentImage = images[images.indexOf(currentImage) + 1];
			// console.log(images.currentImage);
			// $("#ssImage").html('<img src="' + currentImage + '" class="image">');
			// }

			$("#slidePosition").html(images.indexOf(currentImage) + 1 + '/' + images.length);
		})

// clicking previous button

		$("#previousImage").click(function() {

// recycle to end  HERE HEREH HERE I AM

			if(images.indexOf(currentImage) == 0) {
				$("#ssImage").html('<img src="' + images[images.length - 1] + '" class="image">');
			}

			else {
				currentImage = images[images.indexOf(currentImage) - 1];
				console.log(images.currentImage);
				$("#ssImage").html('<img src="' + currentImage + '" class="image">');
			}

			$("#slidePosition").html(images.indexOf(currentImage) + 1 + '/' + images.length);
		})


	});


	console.log(images);

}



//--- original way (full)

// var images = [];

// 	$("#searchButton").click(function() {
// 		images = [];
// 		var text = $("#searchText").val();
// 		if(text) {
// 			getImages(text);
// 		}
// 		else {
// 			console.log("empty textbox");
// 		}
// 	});

// function getImages(searchTerm) {
// 	$.get("https://www.reddit.com/search.json", {
// 		q: searchTerm
// 	})
// 	.done(function(info) {  
// 		info.data.children.forEach(function(post){
			
// 			if(post.data.domain.includes('imgur.com') && post.data.url.includes('.jpg')) {
// 				images.push(post.data.url);
// 			}
// 		});	

// 		var currentImage = images[0];
// 		$("#ssImage").html('<img src="' + currentImage + '" class="image">');
// 		$("#slidePosition").html(images.indexOf(currentImage) + 1 + '/' + images.length);

// // clicking next button

// 		$("#nextImage").click(function() {

// //back to beginning

// 			if(images.indexOf(currentImage) == images.length - 1) {
// 				$("ssImage").html('<img src="' + images[0] + '" class="image">')
// 			}

// 			else {
// 			currentImage = images[images.indexOf(currentImage) + 1];
// 			console.log(images.currentImage);
// 			$("#ssImage").html('<img src="' + currentImage + '" class="image">');
// 			}

// 			$("#slidePosition").html(images.indexOf(currentImage) + 1 + '/' + images.length);
// 		})

// // clicking previous button

// 		$("#previousImage").click(function() {

// // recycle to end  HERE HEREH HERE I AM

// 			if(images.indexOf(currentImage) == 0) {
// 				$("#ssImage").html('<img src="' + images[images.length - 1] + '" class="image">');
// 			}

// 			else {
// 				currentImage = images[images.indexOf(currentImage) - 1];
// 				console.log(images.currentImage);
// 				$("#ssImage").html('<img src="' + currentImage + '" class="image">');
// 			}

// 			$("#slidePosition").html(images.indexOf(currentImage) + 1 + '/' + images.length);
// 		})


// 	});


// 	console.log(images);

// }

