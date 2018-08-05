$(document).ready(function() {
  console.log('DOM and JQuery loaded');
});

//
// process user input
//
function runSearch(e) {
  e.preventDefault();
  console.log('submit sent, event is: ', e);
  console.log('event target is: : ', e.target);
  console.log('event target[0] is: : ', e.target[0]);
  console.log('event target[0].value is: : ', e.target[0].value);
}

//
// user input
//
// get user input
$('#search').submit(runSearch);

//
// ajax call
//

//
// output
//
