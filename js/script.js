// Set up the page when it loads.
$(function() {

  $("#stop").on('click', function(){
  	$("#results").empty()
  })

  // attach the form submission to the search function
  $("#go").on('click', search);


function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var input = $("#textbox");
  var userQuery = input.val() || input.attr("placeholder");
  var results = [];

  // console.log("searching for:", userQuery);
  // console.log(results);

	var getResults = function () {

		// console.log("getResults about to run");
	  $.get('https://www.reddit.com/search.json', {
	    q: userQuery }).done(function(response) {
	    	// var results = response[i].data.thumbnail;
	    	var results = response.data.children;
	    	$('#results').empty()
		    for (var i = 0; i < 100; i++) {
		    	var url = results[i].data.url
		    	var last_three = url.substr(url.length - 3)
		    	if(last_three === 'jpg' || last_three === 'png' || last_three ==='jpeg' || last_three === 'gif'){
		    		$("#results").append("<img src='" + url + "' height='350' width='350'>" + "<br>");
		    	}
		    
		    }
		    console.log("getResults function has been ran")
	    });
	}

	if (userQuery === undefined) {
		console.log("nothing typed in");
	} else {
		getResults();
		console.log("GO clicked, to run getResults()");
	}
}

});

// // Clear previous search results.
// function clearSearchResults() {
//   $("#results").html("");
// }

// // Set up the page when it loads.
// $(function() {
//   // attach the form submission to the search function
//   $("#form").on('submit', search);
// });

// function search(event) {
//   // Stop the form from changing the page.
//   event.preventDefault();
//   clearSearchResults();
// 	var input = $("#textbox");
// 	var userQuery = input.val() || input.attr("placeholder");
// 	var results = [];

// console.log("searching for:", userQuery);
// // $("#go").on("click", function() {
//   $.get('https://www.reddit.com/search.json', {
//   	q: userQuery 
//       }).done(function(response) {
// 	  	console.log(response);
// 		console.log(userQuery)
// 		var results = response.data.children;
// 		var result = results[i].data;
// 		    for (var i = 0; i < 50; i++) {
// 		    	 if(results[i].data.hasOwnProperty('preview')) {
// 		    	 	return results.map(results)
// 		    	 	$("ol").append("<img src='" + results + "'>");
// 		    	 	if (results[i].data.includes('.jpg')) {
// 		    	 		$("ol").append("<img src='" + results + "'>");
// 		    	 } else {
// 		    	 	console.log("moving on to addSearchResult");
// 		    	addSearchResult(result);
// 		    }
//     	}	
//   }
// });

// // Adds a single result object to the page.
// function addSearchResult(result) {
//   // Create a list item to contain the search result link
//   var li = document.createElement("li");

//   // create an anchor tag
//   var link = document.createElement("a");
//   link.href = result.url; // reset the value of the the href
//   link.textContent = result.title; // set the value of the text in the link

//   // put the link inside the list item.
//   $(li).append(link);

//   // add the list item to the list of search results
//   $("#results").append(li);
// }

// }

