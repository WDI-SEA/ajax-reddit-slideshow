
let slideWidth = "688px";
let slideHeight = "416px";
let isStopped = false
let imgTransitionSpeed = 2000;
let slideInterval;
$(function() {
    $("#search-form").on("submit", search);
    $("#control-slide-btn").on("click",function(){
    	if(isStopped === false){
    		clearInterval(slideInterval);
    		$(this).text("Continue");
    		isStopped = true;
    	}else{
    		$(this).text("Pause");
    		displaySlides();
    	}
    })
    $("#exit-slide-btn").on("click",function(){
    	clearInterval(slideInterval);
    	resetPage();
    })
});
function search(event){
	event.preventDefault();
	$("#search-form").css("display","none");
	$("#logo-container").css("display","none");
	$("#loading-img").css("display","block");
	let userInput = $("#search-box").val()||"Bob Ross";
	$.get("https://www.reddit.com/search.json",{
		q:userInput,
		nsfw:"no",
		sort:"top",
		t:"all"
	}).done(function(r){
		handleResponse(r);
	});
}
function handleResponse(reponse){
	let x = reponse.data.children;
	for(let i =0;i<x.length;i++){
		try{
			let imgLink = x[i].data.preview.images[0].source.url;
			imgLink = imgLink.replace("amp;","");
			console.log(imgLink);
			createSlide(imgLink);
		}catch(e){
			console.warn("post had invalid link");
		}
	}
	displaySlides();
}
function createSlide(url){
	let li = $("<li>");
	let img = $("<img>");
	$(img).attr("src",url);
	$(img).css("float","left");
	$(img).css("width",slideWidth);
	$(img).css("height",slideHeight);
	$(li).css("width",slideWidth);
	$(li).css("height",slideHeight);
	$(li).append(img);
	$("#slides").append(li);
}
function displaySlides(){
	$("#slide-input-wrapper").css("display","block");
	$("#loading-img").css("display","none");
	slideInterval =  setInterval(function(){
		var totalLi = $("li").length;
		var offset = parseInt(slideWidth) * totalLi;
		var currentMargin = $("#slides").css("margin-left");
		currentMargin = currentMargin.replace("px","");
		currentMargin = parseFloat(currentMargin);
		if(Math.abs(currentMargin) >= offset){
			$("#slides").css("margin-left","0px");
		}else{
			$("#slides").animate({'margin-left': '-=' + slideWidth});
		}
	},imgTransitionSpeed);
}
function resetPage(){
	$("#slides").html("");
	$("#slide-input-wrapper").css("display","none");
	$("#search-form").css("display","block");
	$("#logo-container").css("display","block");
	$("#search-box").val("");
}