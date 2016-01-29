$(document).ready(function(){

	var formVal;
	var redditData;
	var picNumber = 0;
	var picArray = [];
	var picInt;
	var currentPic;



	$('#search-form').on('submit', function(e){
		e.preventDefault();
		formVal = $('#sf-input').val();
		$.get('http://www.reddit.com/search.json?q=' + formVal + ' nsfw:no').done(function(info){
			redditData = info.data.children;

			$('#pic-box').html("<p>Hold on, we're getting your pictures...<p>");
			$('header').addClass('hidden');
			$('#stop-button').removeClass('hidden');
			
			redditData.filter(function(child){
				if (child.data.preview){
					picArray.push(child.data.preview.images[0].source.url);
				};
			});

			function getPictures(){
				$('#pic-box').html('<img src="' + picArray[picNumber] + '"/>');
				picNumber++;
				if (picNumber === picArray.length){
					picNumber = 0;
				};
			};

			picInt = setInterval(getPictures, 5000);

		});

	});

	$('#stop-button').on('click', function(){
		clearInterval(picInt);
		$('#pic-box').html('');
		$('#sf-input').val('');
		$('header').removeClass('hidden');
		$('#stop-button').addClass('hidden');
		picArray = [];
	});
});