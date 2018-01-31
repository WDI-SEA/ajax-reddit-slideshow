var results= [];
//how many images we've replaces
var imgCounter = 1;
//this is for the seconds interval
var myInterval = null;

//set itnerval function tht replaces images
//two if else statments - one for img counter, one to replace image
var updateImage = function() {
  if (imgCounter < results.length) {
    imgCounter++;
  } else {
    imgCounter = 0;
    //how we move through the array by iteration using the imgCounter
    $("img").attr('src', results[imgCounter]);
  }
  if (results[0].data.thumbnail !=== 'default') {
    $('img').attr('src', results[0].data.thumbnail);
  } else {
    $('img').attr('src', results[1].data.thumbnail);
  }
}

//on the click function, we start doing this
$(document).ready(function() {

  $("button").on("click", function() {
    // e.preventDefault();
    // console.log("in the click");
    //hide div that holds title, p and form
    $("#splash").hide();

    var searchString = document.forms["imageform"].elements["imagebox"].value;


    $.get('https://www.reddit.com/search.json', {
      q: searchString
    }).done(function(data) {
      var results = data.data.children;

      var filteredResults = results.filter(function(item)) {
        return.item.data !== 'default';
      });

      // if (results[0].data.thumbnail !=== 'default') {
      //   $('img').attr('src', results[0].data.thumbnail);
      // } else {
      //   $('img').attr('src', results[1].data.thumbnail);
      // }
      myInterval = setInterval(updateImage, 3000);

      });


    }
  });
});


  });
});
