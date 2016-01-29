$(document).ready(function(){
	counter = 0;
	myInterval = 0;
	$('#searchBtn').on('click', function(e){
 		e.preventDefault();
 		var input = $('.search').val();
				$('.search').val('');
 	$.get('http://www.reddit.com/search.json', {
 		q: input
 		}).done(function(reddit){
 			var searchResult = reddit.data.children.map(function(item){
 				if (item.data.preview !== undefined){
 					if (item.data.preview.images[0] !== undefined){
 						return item.data.preview.images[0].source.url;
 				}
 			}
 			});
 			var filtered = searchResult.filter(function (filter){
 				return filter !== undefined;
 			});
 			myInterval = setInterval( function (){
 				$('.item active').html('').append("'<data src='+filtered[counter]+' Alt: Reddit Picture '+'src='+filtered[counter]>");
 				counter ++;
 				counter = counter % filtered.length;
 			}, 3000);
 	
	});
 	});
		$('#stop').on('click', function(){
 		clearInterval(myInterval);
 		$('.item active').html('');
 		$('.container').show(1000);
 	});
});