var counter = 0;
var intervalId;

$(document).ready(function() {

	$('#reddit-search').on('click', function(e) {
	    e.preventDefault();
	    search($('#input').val());
	    console.log('clicked'+$('#input').val())
	    $('#input').val('');
  	})

  		$('#stop-search').on('click', function(e) {
			    e.preventDefault();
			    $('#images').html('');

			    clearInterval(intervalId);

  			})

	function search(input) {
		$.get('http://www.reddit.com/search.json', {q:input},"+nsfw:no").done(function(data) {
	   		console.log(data);

	   		var children = data.data.children;
	   		console.log(children);

	   		var hasUrl = function(child){
	   			if(child.data.url){
	   				return true;
	   			} else {
	   				return false;
	   			}
	   		};

	   		var filteredChildren = children.filter(hasUrl);
	   		
	   		var imageArray = filteredChildren.map(function(img) {
				return img.data.url;
		   	});

	   		intervalId =setInterval(function() {
		     $('#images').html('').append('<img src="'+imageArray[counter]+'">');
		      
		     

		      counter++;
		      // if (counter >= doughnuts.length) {
		      //   counter = 0;
		      // }
		      counter = counter % imageArray.length;

		   	}, 2000);

		   
		});		 // console.log(imageArray);
	};

	
	// //filter the children, making sure each child has an image url (hint data.url)
	// i = reddit.data.url.filter(function(children) {

	// };


	// //after you filter, use .map to grab all the urls, and create a new array of just the urls (hint, 
	// //.map() creates a new array for you)	
	// var imageArray = children.data.map(function(img) {
	// 			//return image
	// 		}


	// //use setinterval to print out each url

	// function findPics(postData) {
	// 	var img = [];
	// 	postData.data.children.forEach(function(post) {
	// 		console.log(post.data.img);

			

	}); 

	


 	// 		var myInterval = setInterval(findPics, 2000) {
 			
 	// 		data.forEach(function(pic) {

 	// 			// $donut = donuts.style;
		// 		// console.log(donut.style);
		//    $('ul').append('<li>'+ pic.style + '</li>');
		//    counter++;
		// 	menu = $('#menu').map(function() {
		// 		return this.id;

// 			});
		// });
 	




