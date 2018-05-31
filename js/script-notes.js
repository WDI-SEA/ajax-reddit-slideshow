
$(document).ready {

}


// picArray....create global array =[];

// add event handles to button
// function for Click
  // get data from search box using (jquery)
  // -->data from reddit --> write our callback function (see below comment)
  // instructions/button disapeared

// call back and promise- call back function -
// handle the data using an array or loop through results ...we have an object (see forEach...long line concat)
  // store thumbnail in an array (watn to form a loop)...like append we NEED to use an array, saved locally and use PUSH...
    // item.data.thumbnail = HTTP://



    // 1. Add event Handler to button Click
    // 2. write function for Click
    // 3. inspect
    // 4. jquery reddit(?) data from reddit
    // 5 call back function (25 items will be returned)
    // 6. loop through returnData
    //    6A. push data to global array
    // 7. call another function and pass array
    // MAIN Functionality (timeouts...etc)
    // 8.
    $(document).ready {

    }
function mainFunction(arr){

};



$(document).ready(function(){
  $('.button').click(){
    // hide form / button
    $.get('address', {   //this is jQuery Ajax
      p: "userInput"   //our options
  }).done(function(returnData){
    // loop
    returnData.data.children.forEach(function(item, i){
    picArray.push(item.data.thumbnail)
    })
  })

  mainFunction(picArray)
// need photos to start slide show!!!!




$(document).ready( function (){
  var userInput = prompt('Click to start slideshow')

  $.get('http://www.reddit.com/search.json', {
    q: userInput + '+nsfw:no',

  }).done(function(returnData){

    returnData.data.children.forEach(function(item, i){
    picArray.push(item.data.thumbnail)
      $('.insert').append('<div><h3>' + item.data.author + "</h3><img src='" + item.data.thumbnail + "'><a href='"+ item.data.url +"'>Click Here to Learn More<a></div><hr />")
    })
  })
});











// using push instead of append

// for loop -->interval



// css display none
// .done      call back and promise




// button, to clear interval
//









// $(document).ready( function (){
//   var userInput = prompt('What do you want to see?')
//   console.log(userInput)
//   $.get('http://www.reddit.com/search.json', {
//     q: userInput + '+nsfw:no',
//
//   }).done(function(returnData){
//     console.log(returnData.data.children);
//     returnData.data.children.forEach(function(item, i){
//       console.log(item.data)
//       $('.insert').append('<div><h3>' + item.data.author + "</h3><img src='" + item.data.thumbnail + "'><a href='"+ item.data.url +"'>Click Here to Learn More<a></div><hr />")
//     })
//   })
// });
