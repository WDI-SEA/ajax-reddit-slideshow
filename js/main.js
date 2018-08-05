//
// global variables
//
// pictures is global in the interest of future features
var pictures = [];

$(document).ready(function() {
  console.log('DOM and JQuery loaded');
  // setup event listener on submit button
  $('#search').submit(runSearch);
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
  // if search term is empty (at most just whitespace)
  if (search.trim() === '') {
    console.log('please enter a search term!');
  }
  // else attempt to retrieve pictures
  else {
    // run ajax to get search results
    scanReddit(search);
  }
}

//
// ajax call
//
function scanReddit(query) {
  // clear previous results
  clearResults();
  // filter inappropriate listings
  query = query + '+nsfw:no';
  console.log('search is: ', query);
  // do the search
  $.ajax({
    url: 'https://www.reddit.com/search.json',
    method: 'GET',
    // data here is specified by reddit's API, not standard
    data: {
      q: query,
      limit: 10
    }
  }).done(function(result) {
    // get all results (posts)
    console.log('success with result:', result);
    console.log('posts are in:', result.data);
    arrOfPosts = result.data.children;
    // print each post and picture info
    var src;
    arrOfPosts.forEach(function(ele) {
      // if post has an img
      if (ele.data.preview) {
        console.log('post obj is:', ele);
        console.log('picture is in:', ele.data.preview.images);
        src = ele.data.preview.images[0].source.url;
        console.log('picture is stored at:', src);
        // add picture src to array of pictures
        pictures.push(src);
      }
      // else post did not contain an image
      else {
        console.log('skipping post');
      }
    });
    // now that search is complete, output results
    outputResults();
  }).fail(function(response) {
    console.log('fail with feedback:', response);
  });
}

//
// output search results
//
function outputResults() {
  console.log('outputResults() reached');
  // hide search form
  $('#search').hide();
  // TODO replace with carosuel
  pictures.forEach(function(ele) {
    // setup img tag
    var tag = '<img src=' + ele + ' />';
    // create a new img element
    $('#img-display').append(tag);
  });
  // show stop button (not using hide/show because of css)
  $('#stop-div').removeClass('hidden').addClass('shown');
}

//
// removes previous results
//
function clearResults() {
  console.log('clearing previous results');
  // clear displayed pictures
  $('#img-display').empty();
  // clear stored pictures
  pictures = [];
}
