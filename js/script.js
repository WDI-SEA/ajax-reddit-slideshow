$(document).ready(function() {
$("#searchform").on("submit", search);

$("#clear").hide();

var switchScreen = $("#submit").click(function(){
	$("#clear").toggle();
	$("#container").toggle();
});

function search(e){
	e.preventDefault();
	var input = $("#textbox").val();
$.get('https://www.reddit.com/search.json', {
  q: input
}).done(function(response) {
  searchResult(response.data.children);
});

	$("#clear").click(function(){
	$("#pics").empty();
	$("#clear").toggle();
	$("#container").toggle();
});
}

var searchResult = function (results){
	for(var i = 0; i < results.length; i++){
		var image = document.createElement("img");
		image.src = results[i].data.thumbnail;
		$("#pics").append(image).addClass("draggable");
	}
}
});

function movingPictures() {
var $span = $("#pics");
	$span.fadeOut(1000, function() {
    var maxLeft = $(window).width() - $span.width();
    var maxTop = $(window).height() - $span.height();
    var leftPos = Math.floor(Math.random() * (maxLeft + 1))
    var topPos = Math.floor(Math.random() * (maxTop + 1))

    $span.css({ left: leftPos, top: topPos }).fadeIn(1000);
});
};
movingPictures();
setInterval(movingPictures, 6000);



$(function() {
$(".draggable").draggable();
$("#droppable").droppable({
  drop: function(event, ui) {
console.log("dropped!");
  }
});
});
