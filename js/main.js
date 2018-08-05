$(document).ready(function() {
  console.log('DOM and JQuery loaded');
});

//
// process user input
//
function runSearch(e) {
  // prevent page refresh on submit (and other defaults)
  e.preventDefault();
  // output input field contents CAUTION: probably html struc dependent
  console.log('submit sent, event is:', e);
  console.log('event target is: :', e.target);
  console.log('event target[0] is: :', e.target[0]);
  console.log('event target[0].value is: :', e.target[0].value);
  // set input field content
  var search = e.target[0].value;
  // run ajax to get search results
  scanReddit(search);
}

//
// ajax call
//
function scanReddit(query) {
  // filter inappropriate listings
  query = query + '+nsfw:no';
  console.log('search is: ', query);
  $.ajax({
    url: 'https://www.reddit.com/search.json',
    method: 'GET',
    data: {
      q: query,
      limit: 10
    }
  }).done(function(result) {
    console.log('success with result:', result);
    console.log('posts are in:', result.data);
    arrOfPosts = result.data.children;
    // print each post and append full img to images
    arrOfPosts.forEach(function(ele) {
      console.log('post obj is:', ele);
      console.log('picture is in:', ele.data.preview.images);
      console.log('picture is stored at:', ele.data.preview.images[0].source);
    });
  }).fail(function(response) {
    console.log('fail with feedback:', response);
  });
}

// setup event listener on submit button
$('#search').submit(runSearch);


//
// output
//
