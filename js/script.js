var datArr=[];
var count = 0;
var interval = -1;
var forEachChild = function(reddit){
	reddit.data.children.forEach(function(children){
		if (children.data.preview){
			datArr.push(children.data.preview.images[0].source.url)
		}


	});

}

// var getUrl = function(children){
// 	if (children.data.preview){
// 		datArr.push(children.data.preview.images[0].source.url)
// 	}
// }

var insert = function(){
	$("#pic1").attr("src", datArr[count]);
	count++;
	if (count>datArr.length){
		count = 0;
	}
	console.log(datArr[count]);
	console.log(count);
}


$(document).ready(function() {
	$('.btn-danger').hide();
	$('.btn-success').click(function(e){
			e.preventDefault();
			datArr = [];
			insert();
			var $searchTerm=$('#search-form input').val();
			var urlSearch = $searchTerm.replace(" ","+");
			console.log(urlSearch);
		
		$.get('https://www.reddit.com/r/hearthstone/search.json?q='+urlSearch+'&restrict_sr=on&sort=relevance&t=all').done(function(reddit){
			
			forEachChild(reddit);

			if (datArr.length === 0){
			 sweetAlert('Y-Y-You gotta be kidding me!!', 'r/Hearthstone does not have these pictures!', 'error');
			 $("#pic1").attr("src", "images/error.jpg");

			 }
			var insertPic = setInterval (insert, 5000);
			$('.btn-success').hide();
			$('.btn-danger').show();
		});
		
	});

	$('.btn-danger').click(function(e){
		clearInterval(insertPic);
		$('.btn-success').show();
		$('.btn-danger').hide();

	});

});