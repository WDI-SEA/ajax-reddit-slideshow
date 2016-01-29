var searchResults = [];

$(document).ready(function() {
	$('#submit').on('click', function(e) {
		e.preventDefault();
		console.log($('input').val());
		var searchinput = "https://www.reddit.com/search.json?q="+$('input').val()+"+nsfw:no";
		console.log(searchinput);
		$.get("https://www.reddit.com/search.json?q="+$('input').val()+"+nsfw:no").done(function(results) {
			searchResults = results;
			console.log(searchResults);
			var children = searchResults.data.children;
			console.log(children);
// create array of image urls using filter and map
			var length = function (object) {
				if (object.data.url.length) {
					return true;
				};
			};
			var mapResult = function (object) {
				return object.data.url;
			};
			var filterResult = children.filter(length);
			console.log(filterResult);

			var imageUrlArray= filterResult.map(mapResult);
			console.log(imageUrlArray);
		});
	});
});





	



// document.getElementById("button").addEventListener("click", function(){
//     document.getElementById("quoteAppear").innerHTML = 
//     quotes[Math.floor(Math.random()* quotes.length)];
// });
	
// 	/var newThing = $('#taskInput').val();
// 	console.log("this"+newThing);

// 	$('#taskList').append('<li>' + newThing + '<button id="delete">X</button></li>');
// 	$('#taskInput').val('');

// 	$('#taskList').on('click', "li #delete", function(e) {
// 	e.preventDefault();
// 	console.log("Hay");
// 	$(this).parent().remove();
	
// });