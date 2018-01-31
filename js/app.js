console.log("JS running")

var imageArray = [];
 var myInterval = null;
 var count = 0;
 
 var hide = function() {
   $('.container').toggleClass('hide');
 }
 
 function stopImage() {
   clearInterval(myInterval);
 }
 
 function resume() {
   myInterval = setInterval(slideShow, 5000);
 }
 
 function reset() {
   clearInterval(myInterval);
   imageArray = [];
   count = 0;
   $('.container').toggleClass('hide');
   $('#results').children().remove();
 }
 
 var slideShow = function() {
   if(imageArray.length > (count+1)){
       $('#results').children().remove();
       count++
       $('#results').append('<img src="'+imageArray[count]+'">');
     } else {
       count = 0;
       $('#results').children().remove();
       $('#results').append('<img src="'+imageArray[count]+'">');
     }
 }
 
 
 $(document).ready(function(){
 
   $('#resume').on('click', resume);
   $('#stop').on('click', stopImage);
   $('#reset').on('click', reset);
   $('#searchbutton').on('click', function(){
     var searchString = $('#searchterm').val();
     console.log(searchString);
 // $.get('url', {q: searchstring}).done(function(data))
     $.get('https://www.reddit.com/search.json', {
       q: searchString
     }).done(function(data){
       console.log(data);
       var results = data.data.children;
 
       results.forEach(function(item){
         var image = item.data.thumbnail;
         if (image.indexOf('reddit') !== -1) {
           imageArray.push(image);
         }
       });
       console.log(imageArray);
       hide();
       $('#results').append('<img src="'+imageArray[count]+'">');
 
       myInterval = setInterval(slideShow, 5000);
 
     });
   });
 
 });

//credit to Brant Porter

// var results = [];
// var imgCounter = 1;
// var myInterval = null;
// var placeholderImage = https:commons.wikimedia.org/wiki/File:Bee_in_apple_blossom.jpg

// var updateImage = function() {
// 	if (imgCounter < results.length) {
// 		$("img").attr('src', results[imgCounter]);
// 		imgCounter++;
// 	} else {
// 		imgCounter = 0;
// 		$("img").attr('src', results[imgCounter]);
// 	}
// 	}
	


// $(document).ready(function() {
// });
// $("button").on("click", function() {


// var searchString = document.forms["imageform"].elements["imagebox"].value;

// $.get('https:www.reddit.com/search.json', {
// 	q: searchString
// }).done(function(data) {
// 	var results = data.data.children;
// 	console.log(data);
// 	results.forEach(function(item) {
// 		if (item.data.thumbnail !== 'default') {
// 			$("#content").append("<img src'" + item.data.thumbnail + "'>");
// 				}
// 			});
// 			console.log(results[0].data.thumbnail);
// 			if (results[0].data.thumbnail !== 'default') {
// 			$("img").attr('src', results[0].data.thumbnail);
// 		} else {
// 			$("img").attr('src', )
// 		}


// 			myInterval = setInterval(updateImage, 3000)
		
// 	});
// });