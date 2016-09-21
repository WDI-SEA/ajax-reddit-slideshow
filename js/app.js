
//prevent default submit action
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
});

$("#slideShowImages").html("");

//form and search button
$("#searchButton").click(function(){
  var text = $("#searchText").val(); //getting value from form text input
  if(text) {
    fillData(text); //sending search value to fillData function
  }
  else {
    alert("Empty textbox;")
  }
});


//set up variables for image array
var myImage = 0;
var imagesArray = [];
var slideshow = 0;

$("#stopButton").css("display", "none");



//get data from reddit api
function fillData(searchTerm) { //passing searchTerm from above
  $.get("http://www.reddit.com/search.json", {
    q: searchTerm
  })
  .done(function(info){
    console.log(info);
    info.data.children.forEach(function(post){

      if (post.data.thumbnail !== "self") {
        // $("#results").append("<img src='" + post.data.thumbnail + "'>");
        myImage = post.data.thumbnail;
        imagesArray.push(post.data.thumbnail);
      };
    });


    setInterval(function(){
       indexNum = Math.floor(Math.random() * ((6)+1));

      $("#slideShowImages").html("<img src='" + imagesArray[indexNum] + "' width='300'>");
      imagesArray[indexNum];

     }, 2000);

     setTimeout(function(){
    $("#stopButton").css("display", "inline");
     }, 2000);

     
      

    // var intervalID = window.setInterval(myCallback, 3000);
    // function myCallback() {
    //   indexNum = Math.floor(Math.random() * ((6)+1));
    //   $("#results").html("<img src='" + imagesArray[indexNum] + "'>");
    //   imagesArray[indexNum].fadeOut('slow');
    // }



  });
};



$("#stopButton").click(function(){
  $("#slideShowImages").fadeOut('slow');
  $("#stopButton").fadeOut('slow');
  $("#form").fadeIn('slow');
});










// //click button to generate quote
// $('#buttonQuote').click(function() {
// indexNum = Math.floor(Math.random() * ((6)+1));
// $('#quotes').text(quotesArray[indexNum]).append('<br><span class="author">-Charles Bukowski</span>');

// });




// imagesArray.forEach(function(image){
//   $("#results").append("<img src='" + image + "'>");
// })


//form dissapears when search
$('#searchButton').click(function(){
  $('#form').fadeOut('slow');
  $('#searchReddit').fadeOut('slow');
});



// //interval photos appear
// var theImage = 0;
// var intervalID = window.setInterval(myCallback, 500);

// function myCallback() {
// $("#results").append("<img src='" + theImage + "'>");
// }











  
// $.get("http://pokeapi.co/api/v2/pokemon/151", {})
// .done(function(data){
//     console.log(data);

//  $("#name").append(data.name + 
//   "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'>");
// $("#info").append(data.weight + " lbs");
// $("#info").append("<br>" + data.height + " ft");
// data.moves.forEach(function(sec){
//   //    var mewMove = sec.move.name;  
//     // $("#results").append(mewMove);
//       var listItem = $("<li>");



//       listItem.append("(" + sec.move.name + ") ");

//       $("#results").append(listItem);
//     });  //end forEach



//     });
 



//  function fillData(searchTerm) {
//   $.get("https://www.reddit.com/search.json", { 
//   	q: searchTerm //this part equal to "data" above. don't need to specify method
//   }).done(function(info){
//   	info.data.children.forEach(function(post){
//   		var link = $("<a href='" + post.data.url + "'>" + post.data.title + "</a>");
//   		var listItem = $("<li>");

//   		var thumb;
//   		if (!post.data.thumbnail || post.data.thumbnail === "self"){
//   			thumb = $("<img src='http://static9.depositphotos.com/1533960/1232/i/950/depositphotos_12328114-Text-word-on-blue-cubes.jpg'>");
//   		} 
//   		else {
//   			thumb = $("<img src='" + post.data.thumbnail + "'>");
//   		}

//   		listItem.append(thumb);
//   		listItem.append("(" + post.data.subreddit + ") ");
//   		listItem.append(link);

//   		$("#results").append(listItem);
//   	});  //end forEach
//   });  //end done

// };
