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
		$.get('https://www.reddit.com/search.json', {
			q: userRequest,
			limit: 25
		}).done(function(data) {
			console.log(data);
		})
	})

		// display animation
		// show stop / reset button
		// animation to be on loop


})