// Doesn't work with document.ready..
// $(document).ready(function(){
// });

function Page() {
	this.headerContainer = $(".header-wrapper");
	this.form = new Form();
}
Page.prototype = {

}

function Slideshow(imageURLs) {
	this.shlideshowContainer = $(".slide-show-wrapper");
	this.imageURLs = imageURLs;
}
Slideshow.prototype = {
	appendImage: function(parentEl, imageURL) {
		parentEl.append("<img>")

	},
	removeImage: function() {

	}

}

function Form() {
	//submit button
	this.submitButton = $(".submit-button");
	this.submitButton.click(function(event) {
		event.preventDefault();
		this.getImageURLsFromData(function(imageURLs) {
			var slideshow = new Slideshow(imageURLs);
		});
	}.bind(this));
}
Form.prototype = {
	_getSearchTerm: function(){
		return $(".form-input").val();
	},
	_getDataFromURL: function(url, searchTerm, callback) {
		$.get(url, {
			q: searchTerm + " nsfw:no"
		}).done(function(info) {
			var posts = info.data.children;
			callback(posts);
		});
	},
	getImageURLsFromData: function(callback) {
		var imageURLs = [];
		var searchTerm = this._getSearchTerm();
		this._getDataFromURL("http://www.reddit.com/search.json", searchTerm, function(posts){
			posts.forEach(function(post) {
				if(post.data.preview) {
					imageURLs.push(post.data.preview.images[0].source.url);
				} 
			});
			callback(imageURLs);
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