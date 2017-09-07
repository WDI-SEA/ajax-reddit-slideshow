var getInput = $("#userInput");
var getClick = $("#userClick");
var selectDiv = $("div");
var imageHolder = [];

$("getClick").on("click", search()); //define search() as the function that performs the search...

function search(event) {
	console.log("search for ", getInput);

	//run the .get business
	$.get("https://www.reddit.com/search.json", {
		q: getInput //use the super short version , this is the ajax part
	}).done(function(response) { //** I understand the use of .done as the promise but what is "response"?
		console.log(response);
		//out the search API function stuff here
		//I guess there's no need to write this as a function... it's just one thing
		var results = response.data.children; //unclear here on "response"
		var i = 0;
		while (i<25) {
			if (results[i].data.hasOwnProperty("preview")) { //check for preview property, should eval to true
				var result = results[i].data.thumbnail;
				//imageHolder[i] = "<img src='" + result + "'>";
				imageHolder[i]; //just keep track of length/which gets saved in imageHolder
				selectDiv.append("<img id='" + i + "' src='" + result + "'>"); //give the id as i...
				i++;
			} else {
				console.log("no match"); //if there was no preview
				i++;
			}
		}
	}).fail(function() {
		console.log("something failed");
	});
}

//put the sliedshow effects on the pix
setInterval(slideImg(), 3000);

function slideImg() {
	for (i=0; i<imageHolder.length; i++) {
		//find a way to traverse the div imgs by adding 1 to the ids
		//change the zindex up one every time
	}
}



//so I have the div with all the images inside them... 
//maybe I can write a function to display one of them at a time
//by giving them all the same position initially and then
//making the z-values of one of them change over time... 




