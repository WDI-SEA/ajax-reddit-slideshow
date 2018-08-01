
var cliLink = "http://www.reddit.com/search.json";
hideStopResetTitle();
var country;
var loader;
$(document).ready(function() {
	$("#get-pic").click(function(e){
		e.preventDefault();
		country = $("#text-input").val();
		console.log(country);
		if (country!==''){
			addLoader();
			$("#text-input").val(" ");
			$("#ctry").text(country);
			start(country);	
			showResetStopHideSearch();
		} else {
			$("#title").text("please enter a country name");
		}	
	});

	$("#reset").click(function(e){
		e.preventDefault();
		console.log(country)
		addLoader();
		start(country);

	});

	$("#stop").click(function(e){
		e.preventDefault();
		hideStopResetTitle();
		removeLoader();
	});


})

function start(country){
	// create a loading delay before requesting
	// query results and remove when data is returned
	console.log("start called!!")
	// Get images
	redditAjaxCall(country);
}


function showResetStopHideSearch(){
	//Hide stop and reset function when stopped
	// and remove search country.
	$("#reset").show();
	$("#stop").show()
	$("#search-div").hide();
	$("#title").show();
}

function hideStopResetTitle(){
	// Hide stop and reset when laoding and when new 
	// new search is needed
	$("#ctry").text(" ");
	$("#search-div").show();
	$("#reset").hide();
	$("#stop").hide();
	$("#title").hide();
}


function addLoader(){
	//Loading overlay
	loader = $(".loadingoverlay").length;
	if (loader===0){
		$('#result').LoadingOverlay('show');
	} 
}


function removeLoader(){
	//Remove loading overlay
	loader = $(".loadingoverlay").length;
	if (loader!==0) {
		// Stop loading
		$('#result').LoadingOverlay('hide');
	}
}


function hideImage(){
	$("img").hide();
	addLoader();
}

function showImage(){
	removeLoader();
	$("img").hide();
}

function redditAjaxCall(country) {
	// call reddir CLI to get images for the query 
	// and construct a slide show.
	$.ajax({
	  url: cliLink,
	  method: "GET",
	  data: {
	    q: "cat"//+country
	  }
	}).done(function(response){
	   console.log("response.data", response.data);
	   response.data.children.forEach(function(post){
	   		//console.log(post.data.title);
	   		hideImage();
	   		$("#title").text(post.data.title);
	    	var img = $('<img id="images">');
        	img.attr('src', post.data);
         	img.appendTo('#result');
         	showImage();
	  	});
	}).fail(function(err){
	  console.log("error", err);
	  $('#result').LoadingOverlay('hide');
	});
}


