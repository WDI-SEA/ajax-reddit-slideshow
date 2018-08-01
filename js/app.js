var picArray, currentIndex, interval;

$(document).ready(function(){
  console.log('app.js is loaded, and it\'s using jquery');

  $('#submit-form').submit(function(e){
    e.preventDefault();
    console.log('form was submitted!');

    var searchTerm = $('#search-box').val();
    if(searchTerm){
      console.log('You typed in', searchTerm);
      // This clears the textbox
      $('#search-box').val('');
      getData(searchTerm);
    }
    else{
      console.log('Please enter something');
    }
  });

  $('#stop').click(function(){
    clearInterval(interval);
    $('#results').empty();
  });
});

function getData(searchTerm){
  $.ajax({
    url: 'http://www.reddit.com/search.json',
    method: 'GET',
    data: {
      q: searchTerm,
      nsfw: 'no',
      limit: 20
    }
  }).done(function(response){
    picArray = response.data.children.filter(function(post){
      return post.data.post_hint === 'image';
    })
    picArray = picArray.map(function(post){
      return post.data.url;
    });
    currentIndex = 0;
    console.log(picArray);

    interval = setInterval(switchPic, 2000);
  }).fail(function(err){
    console.log('error', err);
  });
}

function switchPic(){
  // If we are at the end of the array, start at beginning again
  if(currentIndex >= picArray.length){
    currentIndex = 0;
  }

  console.log(currentIndex, 'current image is', picArray[currentIndex]);

  // Show the picture in the DOM
  var newImg = $('<img src="' + picArray[currentIndex] + '">');
  $('#results').empty().append(newImg);

  currentIndex++;
}

















