var slidesArray = [];
// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on("submit", search);
});

function search(event) {
  showLoader();
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  var userInput = $("#query").val() + "+nsfw:no" || "kittens+nsfw:no";
  console.log("user input is " + userInput);

  $.get("https://www.reddit.com/search.json", {
    q: userInput,
    limit: 10
  }).done(function(response) {
    addSearchResult(response.data.children);
    console.log(response);
  });

  hideLoader();
}

// Clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(results) {
  for(var i = 0; i < results.length; i++) {
  	document.getElementsByClassName("slide")[i].style.display = "inline";
    document.getElementsByClassName("slide")[i].src = results[i].data.preview.images[0].source.url;
	console.log(results[i].data.thumbnail);
  }
  document.getElementById("search-form").style.display = "none";
  document.getElementsByTagName("h1")[0].style.display = "none";
  
  //adds button to stop and reload page
  var resetButton = document.createElement("button");
  resetButton.textContent = "CLEAR";
  resetButton.addEventListener("click", deanimateSlides);
  document.body.appendChild(resetButton);

  //runs slides
  animateSlides();
  setInterval(deanimateSlides, 10000);
}

function animateSlides() {
  $('#slides').slidesjs({
    width: 940,
    height: 428,
    play: {
      active: true,
      auto: true,
      interval: 1000,
      swap: true,
      pauseOnHover: true,
      restartDelay: 2500,
    }
  });
}

function deanimateSlides() {
	location.reload();
}

function showLoader()
{
    $(".loader").fadeIn("slow");
}
function hideLoader()
{
    $(".loader").fadeOut("slow");
}

