//indicates if images are displayed
var viewerStatus = false;
var displayNumber = 0;

var userInput
var imgArray = [];

//display imgs on click
$(function() {
	$('#addButton').on('click', search);
});

//alternate between search and clear buttons
function buttonSwitch(){
	if(viewerStatus === false){
		$('button')
		.attr('id','removeButton')
		.text('Clear')
		.off('click', search)
		.on('click', clearSearchResults)
		viewerStatus = true;
	}else{
		$('button')
		.attr('id','addButton')
		.text('Go')
		.off('click', clearSearchResults)
		.on('click', search)
		viewerStatus = false;
	}
}


//convert input to variable
function getInput(){
	userInput = $('#inputField').val();
}

//clears returned images
function clearSearchResults(){
	$('#displayedImgs').html('');
	$('h1').html('The Internet can be a scary place<br>Discover The Internet below!');
	buttonSwitch();
	imgArray = [];
	//turn off setinterval
}

//looks up userInput var, finds reddit pics
function picLookUp(){
	$.get('https://www.reddit.com/search.json', {
		q: userInput + '+nsfw:no',
		limit: 25
	}).done(function(response) {
		// console.log(response.data.children)
  		createDisplay(response.data.children);
	});
}

function createDisplay(results){
	for(var i = 0; i < results.length; i++){
		imgArray.push(results[i].data.url);
		//declare variables
		var img = document.createElement('img');
		//create img gallary
		img.src = results[i].data.thumbnail;
		img.a = results[i].data.url;
		$('h1').html('');
		$(displayedImgs).append(img);
	}
}

function carousel(){
	console.log(displayNumber);
	displayNumber ++;
	if (displayNumber >= imgArray.length){
		displayNumber = 0;
	}
}

// function postImg(){
// 	$('#displayedImgs').html('<img src="' + imgArray[displayNumber] + '">')
// }

//run on click function
function search(event){
	getInput();
	event.preventDefault(); 
	clearSearchResults();
	console.log('user input: ', userInput);
	picLookUp();
	buttonSwitch();
	setInterval(carousel, 200);
}

