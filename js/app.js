/*
-Catchy title
-Search query textbox
-Submit button for search 
- stop button 
- place for image to live 
- reset to beginning when you get to the end 
- <--include jQuery -->
- make ajax request to reddit 
- use setInterval to start slideshow 
- ensure image exists 
*/

/*   <========this is my version of the reddit slideshow ====>
console.log("app.js is working for reddit slideshow");

$(".getImage").click(function(){

	console.log("click go is clicked");
	$.ajax({
		url: "https://www.reddit.com/search.json",
		method: "GET",
		data: {
			category: "Puppies + images"

		} 
	}).done(function(response){
		console.log("success", response);
		response.data.children.forEach(function(post){
			console.log(post.data.title);
		})
	// You can always print it in the console:
	console.log("Today is an interesting day")

}).fail(function(err){
	console.log("error", err);
});
//$.get("https://www.reddit.com/search.json")
//.done()
//$.getJSON("http://www.reddit.com/r/pics/.json?jsonp=?", function(data) { 
    // $.each(data.data.children, function(i,item)
    //  {
    //      $("<img/>").attr("src", item.data.url).appendTo("#images");
    //  }
    // );
//});

});
<========================================================>
*/
// <=========the code along: ============================>
console.log("app.js is working for reddit slideshow");
var picArray, currentIndex, interval;

$(document).ready(function(){
	console.log('app.js is loaded, and it\'s using jQuery');

	$('#submit-form').submit(function(e){   // the element that triger the event.
		e.preventDefault();
		console.log('form was submitted!'); 

		var searchTerm = $('#search-box').val();
		if(searchTerm){
			console.log('You typed in', searchTerm);
			// This clear the textbox:
			$('#search-box').val('');
			getData(searchTerm);
		}
		else{
			console.log('Please enter something');
		}
	});
	$('#stop').click(function(){
		console.log('stop button was clicke');
		clearInterval(interval);
	});

});
//the function that gets the search data from reddit
function getData(searchTerm){
	$.ajax({
		url: 'https://www.reddit.com/search.json',
		method: 'GET',
		data: {
			q: searchTerm,
			nsfw: 'no',
			limit: 20
		}
	}).done(function(response){
		console.log('success', response.data);
		// Clear any old data 
		//picArray = response.data.children.map(function(post){
			//return post.data.preview.images[0].source.url;    // post.data.url;   // or post.data.thumbnail 
			picArray = response.data.children.filter(function(post){
				return post.data.post_hint === 'image';
			})
			picArray = picArray.map(function(post){
				return post.data.url;
		})		//});
			currentIndex = 0;
			console.log(picArray);
		// loop up the setInterval function:
		interval = setInterval(switchPic, 3000);
	}).fail(function(err){
		console.log('error', err);
	})
}
// this function switches url in the search results: 
function switchPic(){
	console.log('switching picture');
	//if wer are at the end of the array, start at beginning again
	if(currentIndex >= picArray.length){
		currentIndex = 0;
	}
	console.log(currentIndex, 'current image is ', picArray[currentIndex]);
	//to do: show the picture in the DOM :
	var newImg = $('<img src="' + picArray[currentIndex] + '">');
	$('#results').empty().append(newImg);

	currentIndex++;
}





















