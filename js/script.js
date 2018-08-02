$(document).ready(function() {


  var $input = $('#inputtext');
  var $submit = $('.ui-button');
  var $output = $('#output');
  var $form = $('form');

  $( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
      event.preventDefault();
    } );
  } );

  $( function() {
  // run the currently selected effect
  function runEffect() {
    // get effect type from
    var selectedEffect = "fade";

    // Most effect types need no options passed by default
    var options = {};
    // some effects have required parameters
    if ( selectedEffect === "scale" ) {
      options = { percent: 50 };
    } else if ( selectedEffect === "size" ) {
      options = { to: { width: 200, height: 60 } };
    }

    // Run the effect
    $( "#effect" ).hide( selectedEffect, options );
  };

  // Callback function to bring a hidden box back
  function callback() {
    setTimeout(function() {
      $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
    }, 1000 );
  };

  // Set effect from select menu value
  $( "#button" ).on( "click", function() {
    runEffect();
  });
  $(document).keypress(function(e) {
    if (e.which === 13) {
      runEffect();
    }
  });
} );

  $submit.on('mouseup', function(e) {
    search(e);
  });

  function search(event) {
    // Stop the form from changing the page.
    event.preventDefault();

    clearSearchResults();

    // Get the users search input and save it in a variable.
    // Use the input placeholder value (like "kittens") as a default value.
    var userQuery = $input.val() || $input.attr("placeholder");

    console.log("searching for:", userQuery);

    $.get('https://www.reddit.com/search.json', {
      q: userQuery,
      limit: 1
    }).done(function(response) {
      console.log(response);
      var results = response.data.children;
      for (var i = 0; i < results.length; i++) {
      	var result = results[i].data;
      	addSearchResult(result);
      }
    }).fail(function() {
      console.log("something failed");
    });
  }
  // Clear previous search results.
  function clearSearchResults() {
    $("#output").html("");
  }
  // Adds a single result object to the page.
  var imageCache;
  function addSearchResult(result) {
    // create a image item

    var newImg = document.createElement("img");

    var isImage = false;

    if (/(jpg|gif|png)$/.test(result.url)) {
      console.log(result.url);
      newImg.src = result.url;
      newImg.width = "300";
      isImage = true;
    }

    // add the list item to the list of search results
    if (isImage) {
      removeSearchResult(imageCache, $output.append(newImg));
    }

    imageCache = newImg;

    function removeSearchResult($img, $newImg) {
      if ($newImg === undefined || $img === undefined) {

      } else {
        $img.fadeOut();
        $newImg.fadeIn();
      }
    }

  }


});
