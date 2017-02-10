var query = null;
$('#photoGet').click(function(){
	query = $('#categoryToFind').val();
	getData();
});


function getData(){
	$.get('https://www.reddit.com/r/pics/search.json', {
		q: query
	}).done(function(data){
		// for (var i = 0; i < dataObjects.length; i++){
		// // var imageObjects = $('requestedObjects[i]').includes('.jpg');
		// 	postToFrame(dataObjects[i]);
		// }
		var gotData = data.data.children;
		postToFrame(gotData);

	}).fail(function(error){
		console.log('there was erROR');
});
}

// function filterbyJpg(url){
// 	return url.indexOf('.jpg') > -1
// }

function postToFrame(children){
	//var frameDiv = $('#imageFrame');
	console.log(children)
	var urls = [];
	for(var i=0; i< children.length; i++){
		urls.push(children[i].data.url);
	}
	console.log(urls)
	//var filteredUrls = urls.filter(filterbyJpg);

	// if (requestedObjects[i].includes('.jpg')){
	// 	frameDiv.append('<img src=' + urls.data.url + '>');
	// }
}


//done func: store the data in an array
//SetInterval func: change the index of the array (increment value you are showing)
//Loop: start the index over at 0
//Stop button click: ClearInterval

// function startSearch(){
//   $.get('https://www.reddit.com/r/pics/search.json', {
//     q: query,
//     sort: 'new',
//     restrict_sr: 'on'
//   }).done(function(data){
//      	postToFrame(data.data.children);
//   }).fail(function(error){
//     console.log('err');
//   });
// }

