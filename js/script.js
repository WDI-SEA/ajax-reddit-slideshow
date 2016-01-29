$(document).ready(function(){

 
   $.get('https://www.reddit.com/search.json', {
	  q: 'images'
	}).done(function(data) {
	  console.log(data);
	});

  


});