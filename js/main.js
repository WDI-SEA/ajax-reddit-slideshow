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
  console.log('search is: ', query + '+nsfw:no');
  $.ajax({
    url: 'https://www.reddit.com/search.json?q=cats+nsfw:no',
    method: 'GET'
  }).done(function(data) {
    console.log('success with result:', data);
  }).fail(function(data) {
    console.log('fail with feedback:', data);
  });
}

// setup event listener on submit button
$('#search').submit(runSearch);


//
// output
//
