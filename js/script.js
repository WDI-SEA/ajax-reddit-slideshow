var images = [];
var count = 0;
var timer;

function end(){
  clearInterval(timer);
  $("#images").attr("src", "");
  $("#stop").hide();
  $("#search").show();
  count = 0;
  images = [];
}

function showTime(i){
  if(i<images.length){
    $("#images").attr("src", images[i]);
    count++;
    return;
  }else{
    end();
    return;
  }

}

$(function() {
  $("#search").on("submit", search);
});

function search(event) {
  event.preventDefault();
  console.log("search", $("#text").val());

  var userInput = $("#text").val();

	$.get('https://www.reddit.com/search.json', {
	    q: userInput,
	  }).done(function(response) {
      //push image urls to array
      for(var i=0; i < response.data.children.length; i++){
        images.push(response.data.children[i].data.preview.images[0].source.url)
      }
      console.log(response.data.children);
	});
  //setinterval for loop where it changes the src for the img tag
  timer = setInterval(function(){showTime(count)}, 7500);
  $("#search").hide();
  $("#stop").show();
};
