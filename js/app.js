var searchTerm, img;
var counter = 0;
imgArr = [];
authorArr = []; 
titleArr = [];
var slideshowInterval;

var startSlideshow = function(imgSrc) {
	$('#explode-container').html('<div id="ui-explode"><div class="title-container"><p>' + titleArr[counter] + '</p></div><div class="author-container"><p>' + authorArr[counter] + '</p></div><div class="image-container"><img src="' + imgArr[counter] + '" /></div></div>');
	$('.slideshow-container').fadeIn(1000);
	slideshowInterval = setInterval(function() {
		counter === imgArr.length - 1 ? counter = 0 : counter += 1;
		$('.image-container img').attr('src', imgArr[counter]).hide().fadeIn(700);
		$('.title-container p').text(titleArr[counter]).hide().fadeIn(700);
		$('.author-container p').text(authorArr[counter]).hide().fadeIn(700);
	}, 5000);
};


$(document).ready(function() {
	$('#search-form').submit(function(e) {
		e.preventDefault();
		let formData = $(this).serializeArray();
		searchTerm = formData[0].value;

		$('.search-form-container').fadeOut(200);

		$.get('http://www.reddit.com/search.json', {
			q: searchTerm
		}).done(function(data) {
			data.data.children.forEach(function(item, i){
				imgArr.push(item.data.thumbnail);
				authorArr.push(item.data.author);
				titleArr.push(item.data.title);
			});
			imgArr = imgArr.filter(function(img) {
				return img !== 'null' && img !== 'self' && img !== 'default' && img !== 'undefined';
			});
			authorArr = authorArr.filter(function(author) {
				return author !== 'null' && author !== 'self' && author !== 'default' && author !== 'undefined';
			});
			titleArr = titleArr.filter(function(title) {
				return title !== 'null' && title !== 'self' && title !== 'default' && title !== 'undefined';
			});
			startSlideshow()
		});
		$('input').val('');
	});	

	$('.stop-btn').click(function() {
		if($(this).text() === 'pause') {
			$(this).text('resume');
			clearInterval(slideshowInterval);
		} else {
			$(this).text('pause');
			startSlideshow();
		}
	});

	$('.newsearch-btn').click(function() {
		$(this).text('pause');
		clearInterval(slideshowInterval);
		$('.slideshow-container').hide();
		$('.search-form-container').fadeIn(1000);
		imgArr.length = 0;
		titleArr.length = 0;
		authorArr.length = 0;
	});

	$('.arrow').click(function() {
		clearInterval(slideshowInterval);
		$("#ui-explode").hide("explode");
		if($(this).is('.right-arrow')) {
			counter === imgArr.length - 1 ? counter = 0 : counter += 1;
		}
		else {
			counter === 0 ? counter = imgArr.length - 1 : counter -= 1;
		}
		startSlideshow();
	});
});