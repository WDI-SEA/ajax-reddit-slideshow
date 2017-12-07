$(function() {
  $('#search-form').on('submit', search);
});

function search(event) {
  event.preventDefault();

  clearSearchResults();
    var userInput = $('#query').val() || 'kittens';
    console.log('user input was here', userInput);

  $.get('https://www.reddit.com/search.json', {
    q: userInput,
    limit: 15
  }).done(function(response) {
    console.log(response.data.children);
    addSearchResult(response.data.children);
  });
}
function clearSearchResults() {
  document.getElementById('results').value = '';
}

function addSearchResult(results) {
  for(var i=0; i < results.length; i++){
  console.log(results[i].data.thumbnail);

  // check for bad images
  if (results[i].data.thumbnail === 'nsfw'
  || results[i].data.thumbnail === 'default'
  || results[i].data.thumbnail === 'self'){
    // do nothing
  } else {
    // create a list item and an image tag
    var li = document.createElement('li');
    var img = document.createElement('img');

    // style image and add src attribute
    img.src = results[i].data.thumbnail; // 'https://myimage.jpg'
    img.style.height = 200;
    img.style.width = 200;

    // add image to the list item
    li.appendChild(img);

    // // var a = document.createElement('a');
    // // a.href = results[i].data.url;
    // // a.textContent = results[i].data.title;
    // // $(li).append(a);

    // add the list item to the list of search results
    $('#results').append(li);
  }

  }
}
