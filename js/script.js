$(document).ready(function(){

	var reddit= [];
	var counter = 0;
	var filteredData = [];
	


		 $("form").on('submit', function(e){
		 	e.preventDefault();
		 	var search = $('input').val();

		 


	    $.get('https://www.reddit.com/search.json',{q: search }).done(function(data) {
				reddit = data;
				$('input').val(' ');

			reddit.data.children.filter(function(child){
				
				if(child.data.preview){
					filteredData.push(child.data.preview.images[0].source.url)
				}
				
			});
		
		
		setInterval(function(){	

			$('#container')
			.html(' ')
			.append('<img src=' + filteredData[counter] +'>');

				counter++;
				if(counter == filteredData.length){
				  	counter = 0;
				}
			}, 2000);


		});
		
		
	});		
});  
