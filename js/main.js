$('document').ready(function() {
	console.log('ready to work');

	// add event listener to button
	$('#submitBtn').on('click', function() {
		var userRequest = $('#userEntry').val()
		
		//let user know search in progress
		console.log('now searching');
		
		if (userRequest === '') {
			alert('Please enter something to search for');
			return;
		}
		//reddit.com/r/SEARCHTERM.json
		$.get('https://www.reddit.com/r/pics.json', {
			q: userRequest,
			limit: 25
		}).done(function(data) {
			var galleryArr = []
			var dataArr = data.data.children;
			console.log('done searching'); // place holder
			//run filter function to search for things only from the domain "imgur.com"
			for (var i = 0; i < dataArr.length; i++) {
				console.log(dataArr[i].data.url);
				if (dataArr[i].data.domain === 'i.redd.it' || dataArr[i].data.domain === 'imgur.com') {
				galleryArr.push(dataArr[i].data.url)	
				}
				//add to anchor tags
			}
			console.log(dataArr);
		})
	})

		// display animation
		// show stop / reset button
		// animation to be on loop


})