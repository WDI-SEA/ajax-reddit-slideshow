var images = [];
var count = 0;

$('#showStop').hide();

$('#myForm').submit(function(event) {
	event.preventDefault();

	var input = $('#search-bar');
	var userText = input.val();
	$.get('https://www.reddit.com/search.json', {
		q: userText, nsfw: 'no';
	}).done(function(response) {
		console.log(response);

		var results = response.data.children
		for (i = 0; i < results.length; i++) {
			var redditResults = results[i].data;
			if (redditResults.domain === "i.imgur.com" && redditResults.url) {
				images.push(redditResults.url);
			}
			console.log(images);
		}
		triggerTimer();
	});
});