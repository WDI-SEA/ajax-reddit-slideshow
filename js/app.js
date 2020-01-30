document.addEventListener("DOMContentLoaded", function() {
    console.log("Initiating fetch");
});

document.getElementById('button').addEventListener('click', function() {
    fetch("https://reddit.com/search.json?q=kittens")
    .then(function(responseData) {
      let jsonData = responseData.json();
      console.log(jsonData);
    });

    // alot more work to do here : (