$(document).ready(function(){

//var reddit = require("./data.json");
var redditData = [];
var userSearch = '';
var filteredData = [];
var counter = 0;

$.get('https://www.reddit.com/search.json?q=cats+nsfw:no').done(function(data) {
    redditData = data;
    
    redditData.data.children.filter(function(child){
    	
    	if (child.data.preview) {
    		filteredData.push(child.data.preview.images[0].source.url);
    	}
    	
    	//filterData = child.data.preview.images[0].url;
    	//console.log(filterData);

    });
    console.log(filteredData);

    setInterval(function() {

      $('#container')
        .html('')
        .append('<img src='+filteredData[counter]+'>');
    

      counter++;
       if (counter > filteredData.length) {
         counter = 0;
       }
      //counter = counter % filteredData.length;
    }, 1000);

  });

});