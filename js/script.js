var inputField = $('#inputField');
var button = $('#button');
var userInput

//run function on click
$(function() {
  $(button).on('click', search);
});

function getInput(){
	userInput = $('#inputField').val(); }

//run 
function search(event){
	console.log('dev hell');
	event.preventDefault();
	clearSearchResults();

	//assign user input to var
	//call 
}



function lookUp(){

}

function clearSearchResults(){
	$('#input').html('');
}