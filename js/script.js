// console.log('1. Beginning of the page');

// $('#button').click(function() {
// 	var item = $('#toInput').val();
// 	addNewItem(item);
// });

// function addNewItem(param){
// 	$('#todoList').append('<li class="1">' + param + '</li>');
// };

$('#button').click(function() {
	var item = $('#toInput').val();
	$.get('http://www.reddit.com/r/pics/search.json', {    // /r/pics/
		q: item,
		restrict_sr: 'on',
		sort: 'new',
	}).done(function(data){     // a promise
		var kitPosts = data;
		console.log(kitPosts.data.children);
		var kitObjects = kitPosts.data.children;    // sort through array 

		for (var i = 0; i < kitObjects.length; i++) {
			console.log(kitObjects[i]);
			postToPage(kitObjects[i]);
		}
	}).fail(function(error){
		console.log('error, sorry');
	});
});


	function postToPage(urls){
		var containerDiv = $('#links');
		// if(url.contains('.jpg', '.png'){
		containerDiv.append('<img src =   + urls.data.url +  >')

		// })
	};

