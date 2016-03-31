$(document).ready(function() {

	$("#Go_Button").on('click', search).done;
	var imageArray = [];

	function search(event) {
  event.preventDefault();
 	var userQuery = $('#query').val() || input.attr("placeholder");
 	// console.log("searching for:", userQuery);

 	$.get('https://www.reddit.com/search.json', {
    q: userQuery
  	}).done(function(response) {
    console.log(response);

		function filterByID(obj) {
  		if (!obj.data.preview) {
    	return false;
 			 } else {
    	return true;
  		}
			}

		var raw_results = response.data.children;
		var results = raw_results.filter(filterByID);
		for (i=0; i< results.length; i++) {
    	var result= results[i].data.preview.images[0].source.url;
	    addSearchResult(result);
	    console.log(result);
    }
 		})
 		//trying to do a hide function after the search function finsihes
 		// .done(function(){
 		// 	$('#form').hide()
 		// 	$("#Go_Button").on ('click', (function(){
   //  		$("p").toggle();
			// 	});
 		// };
	};
	
	//trying to alternate images
	// var nIntervId;
 
 // 	function changeImage() {
 //  nIntervId = setInterval(flashImage, 3000);
 //  }

	// function flashImage() {
 //  var oElem = document.getElementById("images");
 //      oElem.src = oElem.src == "result" ? "result" : "result";
 //    }
});



 var image = $('#query').val();
function addSearchResult(result) {
  var pictures = ('<img src="' + result + '">')
	$('#images').append(pictures);

}

//trying to add another click function to hide elements
// $(".button").click(function(){
// 	$('h1').css.hide();
 		// $("#h1").hide();
   //  $('#p').hide();
   //  $('#Go_Button').hide();
   //  $('#query').hide();

// $("#show").click(function(){
//     $("p").show();
// });


//trying to find a way to alternate images using interval:
//  var nIntervId;
 
//  function changeImage() {
//   nIntervId = setInterval(flashImage, 3000);
//   }

// function flashImage() {
//       var oElem = document.getElementById("images");
//       oElem.src = oElem.src == "result" ? "result" : "result";
//     }