// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  $("#head").hide();



  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var userQuery = $("#query").val();

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', { // helper function
    q: userQuery
  }).done(function(response) { //promiss - ment to replace callbacks, waiting until all the data is retrieved and then fired the function.
    // debugger; // adding manual break point
    console.log(response);

    var results = response.data.children;

    var index = 0;
    var interval = setInterval(function(){
      var result = results[index].data;
      $("#theImage").attr('src', result.url);
      index = index+1;

      if (index === results.length){
          clearInterval(interval);
          $("#query").val("");
          $("#head").show();
          $("#theImage").attr('src', "");
      }
    }, 2000);

  }).fail(function() { //
    console.log ("something failed");
  })

}

