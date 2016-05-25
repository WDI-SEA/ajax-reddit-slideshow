$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);

});

imageArray =[];


function search(event) {
	event.preventDefault();
  	clearSearchResults();

  	var userQuery = $(this).children('input').val();
  	console.log("searching for:", userQuery);

  	$.get('https://www.reddit.com/search.json', {
    	q: userQuery
  	}).done(function(response) {
  		console.log(response);
  		for(var i = 0; i < response.data.children.length; i++) {
    		addSearchResult(response.data.children[i].jpg);
		}
	});
}

function clearSearchResults() {
  $("#results").html("");
}

function addSearchResult(result) {
	response.data.children.filter(function (result) {
	if (result.data.preview.images[0].source.url) {
		imageArray.push(result.data.preview.images[0].source.url);
		console.log(imageArray);
	}
	});
  // Create a list item to contain the search result link
  // var jpg = document.createElement("img");
  // //console.log(result.data.children);
  // // create an anchor tag
  // var link = document.createElement("a");
  // link.href = "#"; // reset the value of the the href
  // link.textContent = result.data.children; // set the value of the text in the link

  // // put the link inside the list item.
  // $(img).append(link);

  // // add the list item to the list of search results
  // $("#results").append(li);
}


// need to access the images from the children and be able to differentiate between a child with and with out an image
// I need to assign a src to the images 
// 


















