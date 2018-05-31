var pics = [];
var userInput;

function searchFor(e){
e.preventDefault();
	userInput = $('form').data
$(".label").focus();
}

$(document).ready(function() {
	$.get('http://www.reddit.com/search.json', {
		q: userInput + '+nsfw:no',
	}).done(function(returnData) {
		console.log(returnData.data.children);
		returnData.data.children.forEach(function(item, i) {
			if(item.data.thumbnail !== "default") {
			$('.insert').append("<img src='" + item.data.url + "'>")
			pics.push('item.data.url')}

		})
	})
})

// pics.forEach(displayPics) {
// 	$('.insert').append("<img src='" + item.data.url + "'>")
// };

// setInterval(displayPics, 1000);