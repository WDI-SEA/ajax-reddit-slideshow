var inputBox = $('#textInput');
var imageBox = $('#imagebox');
var slidesDiv = $("#slides");
var dirText = $('#searchbox p')
var userInput="";
var redditCollection = [];
var printNonsense = function(){
	console.log("Nonsense");
	}
$(inputBox).focus()

//from jquery library


//loads redditCollection into img tags on html
var loadDivs = function(){
	$('#slides img').remove();
;	for(var i = 0; i<redditCollection.length; i++){
		slidesDiv.append("<img src='" + redditCollection[i] + "'>");
	}
};

//loads redditCollection array with urls for .jpg or .png files based on input from user
var askReddit = function(){
	$.get('http://www.reddit.com/search.json', {
		q:userInput,nsfw:"no"}).done(function(response){
			var results = response.data.children;
			redditCollection = [];
			for(var i = 0; i<results.length; i++){
				if(results[i].data.hasOwnProperty('preview')){
					if(results[i].data.url.includes('.jpg')){
						redditCollection.push(results[i].data.url);
					} else if(results[i].data.url.includes('.png')){
						redditCollection.push(results[i].data.url);
					}
				}
			}
			
			$(inputBox).focus(); 
			loadDivs();
			inputBox.val("");
			dirText.replaceWith("Results for: " + userInput);
			console.log(userInput);
			
		});
}

//gets user input on click.  Alert if blank
$('#search').click(function(){
	userInput = inputBox.val();
	if(userInput===""){
		alert("WRITE SOMETHING YO!");
	} else{
		askReddit();
	}
});

$('#search').click(function(){
	userInput = inputBox.val();
	if(userInput===""){
		alert("WRITE SOMETHING YO!");
	} else{
		askReddit();
	}
});

$(document).keypress(function(e) {
    if(e.which == 13) {
        userInput = inputBox.val();
		if(userInput===""){
			alert("WRITE SOMETHING YO!");
		} 	else{
			askReddit();
		}
    }
});





