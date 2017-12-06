//indicates if images are displayed
var viewerStatus = false;

var inputField = $('#inputField');
var button = $('#button');
var removeButton = 
var displayedImgs = $('#displayedImgs');
var userInput

//display imgs on click
$(function() {
	$(button).on('click', search);
});

//remove img display on click
$(function(){
	$()
})

//convert input to variable
function getInput(){
	userInput = $('#inputField').val();
}

//clears returned images
function clearSearchResults(){
	$(displayedImgs).html('');
}

//looks up userInput var, finds reddit pics
function picLookUp(){
	$.get('https://www.reddit.com/search.json', {
		q: userInput + '+nsfw:no',
		limit: 10
	}).done(function(response) {
		// console.log(response.data.children)
  		createDisplay(response.data.children);
	});
}

function createDisplay(results){
	for(var i = 0; i < results.length; i++){
		//declare variables
		var img = document.createElement('img');
		//create img gallary
		img.src = results[i].data.thumbnail;
		img.a = results[i].data.url;
		$(displayedImgs).append(img);
	}
}

//run on click function
function search(event){
	getInput();
	event.preventDefault();
	viewerStatus = true; 
	clearSearchResults();
	console.log('user input: ', userInput);
	picLookUp();
}


