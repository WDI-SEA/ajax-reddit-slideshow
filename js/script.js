var timeOut;

$(document).ready(function() {
	$(".user-input").on("submit", function(e) {
		e.preventDefault();
		var timer = true;
		var userInput = $("input[type=text]").val();
		$.get("https://www.reddit.com/search.json", {
			q: userInput + "+nsfw:no"
		}).done(function(returnData) {
			var newArray = returnData.data.children.filter(function(item) {
				return item.data.thumbnail.includes("http");
			});
			var i = 0;
			var slideShow = function () {
				$(".image-destination").fadeIn(900);
    			$(".image-destination").attr("src", newArray[i].data.thumbnail)
    			$(".image-destination").fadeOut(900);
    			if (i < newArray.length) {
    				i++;
    			} else {
    				i = 0;
    			}
    			timeOut = setTimeout(slideShow, 1800);
			};
			slideShow();
			$("button").show();
		});
		$("input[type=text]").blur();
		$(".page-info").slideUp(500);
	});
	$("button").on("click", function() {
		$(".reset").hide();
		$(".page-info").slideDown(500);
		clearTimeout(timeOut);
	});
});