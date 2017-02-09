$('document').ready(function() {
	console.log('ready to work');
	var galleryArr = [];
	var changeImage = null;
	// add event listener to button
	$('#submitBtn').on('click', function() {
		var userRequest = $('#userEntry');
		
		if (invalidEntry(userRequest)) {
			return;
		}
		$('#searching').show();
		jsonRequest(userRequest);
		cleanUi(userRequest);
		// reset entry field
		userRequest.val(''); 
		$('#stopBtn').on('click', stopSlideShow);
	});

function invalidEntry(userRequest) {
	if (userRequest.val() === '') {
		alert('Please enter something to search for');
		return true;
	} else {
		return false;
	}
}
function jsonRequest(userRequest) {
	$.get('https://www.reddit.com/r/pics/search.json', {
		q: userRequest.val(),
		limit: 50,
		restrict_sr: "on", 
		sort: "new"
	}).done(function(data) {
		var dataArr = data.data.children;
		storeImages(dataArr);
		$('#searching').hide();

		$('#displayArea').css('background-image', "url('" + displayArea[0] + "')");
		changeImage = setInterval(displayImage, 2000);

	})
}
function cleanUi(userRequest) {
		$('#title').text(userRequest.val());
		$('#submitBtn').hide();
		$('#userEntry').hide();
}
function storeImages(dataArr) {
	galleryArr = [];
	dataArr.forEach(function(child) {
		if (usableImg(child)) {
			galleryArr.push(child.data.url);
		}
	})
}
function usableImg(child) {
	if (child.data.url.includes('.jpg') && !child.data.url.includes('i.reddituploads.com')) {
		return true;
	} else {
		return false;
	}

}
function displayImage() {
	var randomNum = Math.floor(Math.random() * galleryArr.length);
	$('#displayArea').css('background-image','url("' + galleryArr[randomNum] + '")');
}
function stopSlideShow() {
	$('#displayArea').css('background', 'white');
	$('#submitBtn').show();
	$('#userEntry').show();
	clearInterval(changeImage);
	$('#title').text('Slide Show Generator')
}












})