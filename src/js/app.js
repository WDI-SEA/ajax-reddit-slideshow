$(document).ready(function() {
  var myData;
  var urls;
    // hide stop animation button on page load.
    $("#stopBtn").hide();

    // Hide elements after search button is clicked and show stop animation button.

    $("#searchBtn").click(function() {
        $("#h1Title").hide();
        $("#description").hide();
        $("#searchForm").hide();
        $("#stopBtn").show();


        // Add user input to variable

        var searchString = $('#searchInput').val();

        event.preventDefault();


        // Fetch related posts from reddit



        $.get('https://www.reddit.com/search.json', {
            q: searchString
        }).done(function(data) {
            console.log('success!');
            console.log(data);
            myData = data;
            logMyData();
        }).fail(function(data) {
            console.log('failed!');
        }).always(function(data) {
        });
    });

    function logMyData() {
        // console.log("My Data is: ", myData.data.children[0].data.thumbnail);
        var filter = myData.data.children.filter(function(thisChild){
          if (thisChild.data.thumbnail === "self" || thisChild.data.thumbnail === "") {
            return false;
          } else {
            return true;
          }
        })
        urls = filter.map(function(thisChild) {
          return thisChild.data.thumbnail;
        })
        console.log(urls);
    }




    // set interval and clear interval
    //
    // use has own property to pass in a string to see if an object has the image property


});
