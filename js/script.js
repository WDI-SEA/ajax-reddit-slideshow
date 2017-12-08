//indicates if images are displayed
var viewerStatus = false;
var displayNumber = 0;
var rotate;
var userInput
var imgArray = [];
var linkArray = [];

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
		.on('click', search);
		// clearSearchResults();
		viewerStatus = false;
	}
}

function startTimer(){
	rotate = setInterval(carousel, 3000);
}

function stopTimer(){
	clearInterval(rotate);
}

//convert input to variable
function getInput(){
	userInput = $('#inputField').val();
}

//clears returned images
function clearSearchResults(){
	$('#displayedImg').html('');
	$('h1').html('The Internet can be a scary place<br>Discover The Internet below!');
	$('a').html('');
	buttonSwitch();
	imgArray = [];
	stopTimer();
}

//looks up userInput var, finds reddit pics
function picLookUp(){
	$.get('https://www.reddit.com/search.json', {
		q: userInput,
		limit: 25
	}).done(function(response) {
  		createDisplay(response.data.children);
	});
}

function createDisplay(results){
	for(var i = 0; i < results.length; i++){
		imgArray.push(results[i].data.thumbnail);
		linkArray.push(results[i].data.url);
	}
}

function carousel(){
	console.log(displayNumber);
	postImg();
	displayNumber ++;
	if (displayNumber >= imgArray.length){
		displayNumber = 0;
	}
}

function postImg(){
	var p = ('<a href="' + linkArray[displayNumber] + '">Post ' + (displayNumber + 1) + '</a>');
	$('#displayedImg').html('<img src="' + imgArray[displayNumber] + '">').append(p);
}

//run on click search 
function search(event){
	getInput();
	event.preventDefault(); 
	picLookUp();
	$('h1').html('');
	buttonSwitch();
	startTimer();
}