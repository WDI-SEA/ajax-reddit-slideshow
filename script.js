$(document).ready(function(){
	counter = 0;
	myInterval = 0;

	$('#submit').on('click', function(e){
 		e.preventDefault();
 		var input = $('#input').val();
				$('#input').val('');
	$('.container').hide(1000);

 	$.get('http://www.reddit.com/search.json', {
 		q: input
 		}).done(function(data){

 			var searchResult = data.data.children.map(function(item){
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
 				$('.picture').html('').append('<img src=' +filtered[counter]+ '>');
 				counter ++;
 				counter = counter % filtered.length;
 			}, 2000);
 	
	});
 	});
		$('.stop').on('click', function(){
 		clearInterval(myInterval);
 		$('.picture').html('');
 		$('.container').show(1000);
 	});
});