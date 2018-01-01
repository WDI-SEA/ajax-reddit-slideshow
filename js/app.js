
$(function() {
  
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();
  $('.top').hide();
  var input = $("#query");
  var userQuery = input.val();

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery + '+nsfw:no'
  }).done(function(response) {
    console.log(response);

    var results = response.data.children;
    var filteredResults = results.filter(function(result) {
    	return restult.data.preview;
    });
    var pictureUrls = filteredResults.map(function(result) {
    	return result.data.preview.images[0].source.url
    });
    for (var i = 0; i < pictureUrls.length; i++) {
    	displayResults(pictureUrls[i]);
    }
    
		$(function() {
			$('#slides').slidesjs({
				width: 10000,
				height: 550
			});
		});
	});
};

vardisplayImages = function(url) {
	var image = document.createElement("img");
	link.src = url;
	$('#slides').append(image);
};

function clearSearchResults() {
	$('#slides').html("")
  $(".top").show()
};

$('#clear').on('click', clearSearchResults);
