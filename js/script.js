var searchData = [];

$(document).ready(function(){

var whatToSearch = "";
var counter = 0;


$('input').focus().val("");

var appendPicture = function(){
	if(searchData.data.children[counter].data.domain === "i.imgur.com"){
			$('#slideshow').html("<img src='" + searchData.data.children[counter].data.preview.images[0].url + "' height='400px' width='400px'>");
			counter++
	}else{
		counter++
	}

}

	$('#search-button').on("click", function(){
		whatToSearch = $('#input').val();
		$.get("http://www.reddit.com/search.json?q=" + whatToSearch, function(data){
			console.log(data);	
			searchData = data;
		}).done(function(){
			// var onlyImages = function(redditArray){
			// 	return redditArray.data.children.data.preview.images.source.url != null;
			// }

			// $(searchData).filter(onlyImages);

			// console.log(onlyImages);
			// .map(function(image){
			// 	return image;
			// })
			// var interval = setInterval(function(){
			// 	appendPicture();
			// 	counter++
			// }, 2000)

			console.log("data success");
			var interval = setInterval(function(){
				appendPicture();
				if(counter >= searchData.data.children.length){
					counter = 0;
				}
			}, 2000)	
		})
	})






})