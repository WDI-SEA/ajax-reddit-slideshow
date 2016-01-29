console.log("ready")
$('#stop').hide();
$(document).ready(function(){

	$('#search').on('click', function(e) {
	 	e.preventDefault();
	var pics = [];
	var counter = 0;


//hide search field and show Reset button
    $('#container').hide(750);
    $('#stop').show(100);


//search reddit posts for input term
$.get('https://www.reddit.com/search.json?q=' + $('#searchTerm').val()).done(function(data) 
	{ 

		console.log(data);
		pics = data; 

	//filter for only posts with images
	var filtered = pics.data.children.map(function (child) {
		return child.data.thumbnail;
	}).filter(function(child){
		if(child !== "" && child !== "self") {
			return true;
		}
	}); 

	console.log(filtered);
	counter === 0;

		
		//start image slideshow
		setInterval(function() {
		$('#display')
		.html ("")
		.append("<img src="+filtered[counter]+">");
		counter++	
		counter = counter % filtered.length;		
		}, 900)
	 });	
	
//reset page
	$('#stop').on('click', function(e) {
	 	e.preventDefault();
	 	location.reload();
//	 	$('#display').html('');
//	 	$('#container').show(500);
//	 	$('#searchTerm').val("");
//	 	$('#stop').hide();
	});

});
});
