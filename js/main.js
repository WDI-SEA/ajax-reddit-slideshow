// Doesn't work with document.ready..
// $(document).ready(function(){
// });

function Page() {
	this.headerContainer = $(".header-wrapper");
	this.form = new Form();
}
Page.prototype = {

}

function Slideshow() {

}
Slideshow.prototype = {

}

function Form() {
	// //form input
	// this.searchTerm = "";
	//submit button
	this.submitButton = $(".submit-button");
	this.submitButton.click(function(event) {
		event.preventDefault();
		this.getImagesFromData();
	}.bind(this));
	//data
	this.images = [];
}
Form.prototype = {
	submitSearchTerm: function(){
		this.searchTerm = $(".form-input").val();
		return this.searchTerm;
	},
	getDataFromURL: function(url) {
		this.searchTerm = this.submitSearchTerm();
		$.get(url, {
			q: this.searchTerm
		}).done(function(info) {
			console.log(info.data.children)
			this.postArray = info.data.children;
			return this.postArray;
		});
	},
	getImagesFromData: function() {
		this.postArray = this.getDataFromURL("http://www.reddit.com/search.json");
		console.log(this.postArray);
		this.postArray.forEach(function(post){
			if (post.data.preview) {
				this.images.push(post.data.preview.images[0].source.url);
			}
		});
	}
}

var page = new Page();

// $.get("http://www.reddit.com/search.json", {
// 			q: "kittens"
// 		}).done(function(info) {
// 			console.log(info.data.children[1].data.preview.images[0].source.url);
// 			// var imageSouce = info.children.data.preview.images.source.url
// 			// console.log(imagesSource);
// 		});