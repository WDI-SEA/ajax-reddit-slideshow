$(document).ready(function(){
	counter = 0;
	myInterval = 0;
	// Start search on click
	$('#submit').on('click', function(e){
 		e.preventDefault();
 		var input = $('#input').val();
				$('#input').val('');
	$('.container').hide(1000);
	// JSON call to reddit for search term
 	$.get('http://www.reddit.com/search.json', {
 		q: input
 		}).done(function(data){
 			// create array of images
 			var searchResult = data.data.children.map(function(item){
 				if (item.data.preview !== undefined){
 					if (item.data.preview.images[0] !== undefined){
 						return item.data.preview.images[0].source.url;
 				}
 			}
 			});
 			// filter out undefined image array items
 			var filtered = searchResult.filter(function (filter){
 				return filter !== undefined;
 			});
 			// display photos in picture div with 2 second delay
 			myInterval = setInterval( function (){
 				$('.picture').html('').append('<img src=' +filtered[counter]+ '>');
 				counter ++;
 				counter = counter % filtered.length;
 			}, 2000);
 	
	});
 	});
 		// stop slideshow, clear picture div, restore search box
		$('.stop').on('click', function(){
 		clearInterval(myInterval);
 		$('.picture').html('');
 		$('.container').show(1000);
 	});
});