
let form = document.getElementById("input-form");
/*form.addEventListener("submit", function(e)){
	e.preventDefault();
	console.log(e);
}
*/

//slideshow code citation: https://css-tricks.com/snippets/jquery/simple-auto-playing-slideshow/
function runInterval(){

	$(".image-container > div:gt(0)").hide();
	let domImageContainer = document.querySelector(".image-container");
	domImageContainer.classList.remove("do-not-show");
	setInterval(function(){
		$(".image-container > div:first")
		.fadeOut(2000)
		.next()
		.fadeIn(2000)
		.end()
		.appendTo(".image-container");
	}, 3000);
}

let queryFinished = false;

document.addEventListener("DOMContentLoaded", function(){
	//console.log("here");
	let form = document.getElementById("input-form");
	let query = "https://www.reddit.com/search.json?q="
	form.addEventListener("submit", function(e){
		form.classList.add("do-not-show");
		e.preventDefault();
		let fullQuery = query + document.getElementById("text-box").value;
		//console.log(fullQuery);
		fetch(fullQuery)
		.then(function(responseData) {
			let jsonData = responseData.json();
			return jsonData;
		})
		.then(function(jsonRedditData){
			let results = jsonRedditData.data.children;
			let specResults = [];
			for(redditResults of results){
				//console.log(redditResults);
				let postHint = redditResults.data.post_hint;
				if(postHint === "image"){
					//console.log("Not an image");
					let imgResult = redditResults.data.url;
					//console.log(imgResult);
					specResults.push(imgResult);
				}
			}
			/*
			let specResults = results.map(function(redditResults) {
				let postHint = redditResults.data.post_hint;
				if(postHint === "image"){
					//console.log("Not an image");
					let imgResult = redditResults.data.url;
					//console.log(imgResult);
					return imgResult;
				}	
			})
			*/
			console.log(specResults);
			return specResults;
		})
		.then(function(resultData) {
			let domImageContainer = document.querySelector(".image-container");
			for(let i = 0; i < resultData.length; i++){
				let newDiv = document.createElement("div");
				let newImg = document.createElement("img");
				newImg.src = resultData[i];
				newDiv.appendChild(newImg);
				domImageContainer.appendChild(newDiv);
			}
			queryFinished = true;
			domImageContainer.classList.add("do-not-show");
			//runInterval();
		});
		setTimeout(function(){
			if(queryFinished) {
				let domStop = document.getElementById("stop");
				domStop.classList.remove("do-not-show");
				runInterval();
			}
			//runInterval();
		}, 2000);




		/*
		.then(function(resultData) {
			setInteveral(function(){
				$(".image-container > div:first")
				.fadeOut(1000)
				.next()
				.fadeIn(1000)
				.end()
				.appendTo(".image-container");
			}, 2000);
			setInteveral();
			return resultData;
			*/
	})
	let domStop = document.getElementById("stop");
	domStop.addEventListener("click", function(){
		$(".image-container").empty();
		let form = document.getElementById("input-form");
		form.classList.remove("do-not-show");
		domStop.classList.add("do-not-show");
			
	});

	//fetch()

});