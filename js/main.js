$('document').ready(function() {
	console.log('ready to work');
	var galleryArr = [];
	// add event listener to button
	$('#submitBtn').on('click', function() {
		var userRequest = $('#userEntry');
		
		if (invalidEntry(userRequest)) {
			return;
		}
		$('#searching').show();
		jsonRequest(userRequest);
		userRequest.val(''); 
		
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
		$.get('https://www.reddit.com/r/pics.json', {
			q: userRequest.val(),
			limit: 25,
			restrict_sr: "on", 
			sort: "new"
		}).done(function(data) {
			var dataArr = data.data.children;
			console.log('done searching'); // place holder
			
			storeImages(dataArr);
			$('#searching').hide();
			displayImage();
		})
	}

	function storeImages(dataArr) {
		galleryArr = [];
		for (var i = 0; i < dataArr.length; i++) {
			if (dataArr[i].data.domain === 'i.redd.it' || dataArr[i].data.domain === 'imgur.com' ||
				dataArr[i].data.domain === 'i.reddituploads.com') {
				galleryArr.push(dataArr[i].data.url);
			}
		}
	}
	function displayImage() {
 
	}

		// display animation
		// show stop / reset button
		// animation to be on loop











})