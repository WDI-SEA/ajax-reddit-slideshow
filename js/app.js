var picArray, currentIndex, interval; 

$(document).ready(function(){
	console.log('Jquery and script js loaded');

	$('#submit-form').submit(function(e){
		e.preventDefault();
		console.log('form was submitted');

		var searchTerm = $('#search-box').val();
		if(searchTerm){
			console.log('You typed in', searchTerm);
			// this clears text box
			$('#search-box').val('');
			getData(searchTerm);
			
		}
		else{
			console.log('Please enter something');
		}
	});

	$('#stop').click(function(){
		console.log('stop button was clicked');
		clearInterval(interval);
		$('#results').empty();
	});
});

function getData(searchTerm){
	$.ajax({
		url: 'http://www.reddit.com/search.json',
		method: 'GET',
		data: {
			q: searchTerm,
			nsfw: 'no',
			limit: 10
		}
	}).done(function(response){
		picArray = response.data.children.filter(function(post){
			return post.data.post_hint === 'image';
		})
		picArray = picArray.map(function(post){
			return post.data.url;
		});
		currentIndex = 0;
		console.log(picArray);

		interval = setInterval(switchPic, 2000)
	}).fail(function(err){
		console.log('error', err);
	});
}

function switchPic(){
	console.log('switching this picture');
	if(currentIndex >= picArray.length){
		currentIndex = 0;
	}

	console.log(currentIndex, 'current image is', picArray[currentIndex]);

	// To Do: show the picin the dom
	var newImg = $('<img src="' + picArray[currentIndex] + '">');
	$('#results').empty().append(newImg);

	currentIndex++;
} 
