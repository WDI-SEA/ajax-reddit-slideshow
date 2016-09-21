// Doesn't work with document.ready..
// $(document).ready(function(){
// });

function Page() {
	this.headerContainer = $(".header-wrapper");
	this.form = new Form(this);
	this.stopButton = $(".clear-slideshow");
	this.stopButton.click(function() {
		this._showHeader(this.headerContainer);
		this._hideStopButton(this.stopButton);
		console.log(this.form.slideshow);
		this.form.slideshow._stopCyclingThroughImages();
		this.form.slideshow.imageURLs = "";
	}.bind(this));
}
Page.prototype = {
	_hideHeader: function(header) {
		header.css("visibility", "hidden");
	},
	_showHeader: function(header) {
		header.css("visibility", "visible");
	},
	_showStopButton: function(button) {
		button.css("visibility", "visible");
	},
	_hideStopButton: function(button) {
		button.css("visibility", "hidden");
	}
}

function Slideshow(imageURLs) {
	this.slideshowWrapper = $(".slideshow-wrapper");
	this.slideshowImageEl = $("body");
	this.imageURLs = imageURLs;
	this.imageIndex = 0;
	this.timer = null;
	this._cycleThroughImages();

}
Slideshow.prototype = {
	_appendImage: function(imageEl, imageURL) {
		imageEl.css("background-image", "url(" + imageURL + ")");
	},
	_removeImage: function(imageEl) {
		imageEl.css("background-image", "url(" + ")");
	},
	_cycleThroughImages: function() {
		this.slideshowWrapper.css("visibility", "visible");
		this.timer = setInterval(function() {
			this._appendImage(this.slideshowImageEl, this.imageURLs[this.imageIndex]);
			this.imageIndex++;
			// use modulo for going in circles!
			this.imageIndex = this.imageIndex % this.imageURLs.length;
		}.bind(this), 3000);
	},
	_stopCyclingThroughImages: function() {
		clearTimeout(this.timer);
		this._removeImage(this.slideshowImageEl);
	}
}

function Form(page) {
	//submit button
	this.submitButton = $(".submit-button");
	this.slideshow = null;
	this.submitButton.click(function(event) {
		event.preventDefault();
		this._getImageURLsFromData(function(imageURLs) {
			this.slideshow = new Slideshow(imageURLs);
		}.bind(this));
		page._hideHeader(page.headerContainer);
		page._showStopButton(page.stopButton);
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