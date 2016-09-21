// Doesn't work with document.ready..
// $(document).ready(function(){
// });

function Page() {
	this.headerContainer = $(".header-wrapper");
	this.form = new Form();
}
Page.prototype = {
	_hideHeader: function(header) {
		header.style.css("visibility: hidden")
	},
	_showHeader: function(header) {
		header.style.css("visibility: visible")
	}
}

function Slideshow(imageURLs) {
	this.slideshowWrapper = $(".slideshow-wrapper");
	this.slideshowImageEl = $(".slideshow-image");
	this.imageURLs = imageURLs;
	this.imageIndex = 0;
	this._cycleThroughImages();
}
Slideshow.prototype = {
	_appendImage: function(parentEl, imageURL) {
		parentEl.append("<img src='" + imageURL + "'/>");
	},
	_removeImage: function(parentEl) {
		parentEl.empty();
	},
	_cycleThroughImages: function() {
		this.slideshowWrapper.css("visibility= 'visible'")
		setInterval(function() {
			this._removeImage(this.slideshowImageEl);
			this._appendImage(this.slideshowImageEl, this.imageURLs[this.imageIndex]);
			this.imageIndex++;
			// use modulo for going in circles!
			this.imageIndex = this.imageIndex % this.imageURLs.length;
		}.bind(this), 3000);
	}
}

function Form() {
	//submit button
	this.submitButton = $(".submit-button");
	this.submitButton.click(function(event) {
		event.preventDefault();
		this._getImageURLsFromData(function(imageURLs) {
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
	_getImageURLsFromData: function(callback) {
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