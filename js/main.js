
$('#submit').click(function(){
	var query = $('#userContent').val();
	$.get('https://www.reddit.com/r/pics/search.json', {
  		q: query,
  		nsfw: 0,
  		restrict_sr: "on",
  		sort: "new"
  	}).done(function(data){
  		var contentPosts = data; //data obtained after click?
		var contentObjects = contentPosts.data.children; //I don't know what this var is for
		for(var i =0; i < contentObjects.length; i++){
		postToPage(contentObjects[i]);
  	}
  	}).fail(function(error) {
  console.log('An error occurred');
});		
})

function postToPage(urls){
	var query = $('#userContent').val();
	var containerDiv = $('#links');
	containerDiv.append('<a href=" '+urls.data.url +'">'+ urls.data.url+ '</a>') // I don't know what this line is doing to the page 
	console.log(containerDiv); // is this the right var to console log?
	
}

