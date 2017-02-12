
var imageArray = [];

$('#button').click(function() {
	var item = $('#toInput').val();
	$.get('http://www.reddit.com/r/pics/search.json', {    // /r/pics/
		q: item,
		restrict_sr: 'on',
		sort: 'new',
	}).done(function(data){
		changeData(data.data.children);
	}).fail(function(error){
		console.log('error, sorry');
	});
});

	function changeData(urls){
		// console.log(urls);
		for (var i = 0; i < urls.length; i++) {
			imageArray.push(urls[i].data.url);
		}
		imageAttach();
	};

	function imageAttach(){
		for (var i = 0; i < imageArray.length; i++){
			$('#links').append('<img src="'+imageArray[i]+'">');
		}
		createSlideShow();
	}

function createSlideShow() {
     $("#links").slidesjs({
        width: 940,
        height: 528,
        pagination: {
      	active: false,
        // [boolean] Create pagination items.
        // You cannot use your own pagination. Sorry.
      effect: "slide"
        // [string] Can be either "slide" or "fade".
    }
      });
 };
    



// get your textbox/submit  button working

// call the reddit API and get data from it basd on the search query

// done function, store data in an array

// set interval (set in the done function) : change the index of the array

//loop, start the index at 1

//stop button click, clear interval