var mainForm = $(".mainForm");
var resetButton = $("#resetButton");
var stopButton = $("#stopButton");
var imgArr = [];
var imgCounter = 0;


var updateImage = function() {
	console.log('change pic');
	if (imgCounter < imgArr.length) {
		imgCounter++;
	} else {
		imgCounter = 1;
	}
	$('img').attr('src', imgArr[imgCounter]);
};

//START UPON PAGE LOAD
$(document).ready(function() {
	
	$(document).keypress(function(e) {
   		if(e.which == 13) {
        	getFunction();
        	return false;
    	}
	});

	var getFunction = function() {
		var searchString = document.forms["searchForm"].elements["searchBox"].value;

		$.get("https://www.reddit.com/search.json", {
			q: searchString
		}).done(function(data) {
			var results = data.data.children;
			console.log(data);
			results.forEach(function(item) {
	        	if (item.data.thumbnail !== 'default') {
	        		imgArr.push(item.data.thumbnail);
	       		};
      		});
      		myInterval = setInterval(updateImage, 2000);
      		$('img').css('display', 'block');
      		$('img').attr('src', imgArr[0]);
		}); //done function end tag

		mainForm.css("display","none");
		resetButton.css("display", "block");
		stopButton.css("display", "block");

	}

	$("#searchButton").on("click", getFunction); 

	resetButton.on("click", function () {
		$("#results").css("display","none").html('');
		mainForm.css("display","block");
		resetButton.css("display","none");
		stopButton.css("display", "none");
		$('#searchBox').val(null);
		clearInterval('myInterval');
	}); //reset button end tag

}); //doc start end tag