
var handle = null;
var textBox;
var imgElement;

document.addEventListener("DOMContentLoaded", function() {
    textBox = document.getElementById("searchterm");
    imgElement = document.querySelector("img");

    document.getElementById("stop").addEventListener("click", function() {
        clearInterval(handle);
    })

    document.getElementsByTagName("button")[0].addEventListener("click", function(e) {
       var searchTerm = textBox.value;  //value is what they type
        var url = `http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`;
        //console.log(url);
        fetch(url)
            .then(function(data) {
                return data.json();//this turns data into an object
            })
            .then(function(json) {
                //console.log(json.data.children[0].data.url);
                var images = [];
                var imageCounter = 0;
                json.data.children.forEach(function(item) {
                    console.log(item.data.url);
                    images.push(item.data.url);
                })
                images = images.filter(function(image) {
                    if (image.includes("jpeg") || image.includes("jpg") || image.includes("png")) {
                        return true;
                    } else {
                        return false;
                    }
                })
                handle = setInterval(function() {
                    imgElement.src = images[imageCounter];
                    imageCounter++;
                    if (imageCounter === images.length) {
                        imageCounter = 0;
                    }
                    
              }, 3000);
            })


    })
})




/*
--------------------
var search = document.getElementById("submit");
var subjectInput = document.getElementById("subject")
search.addEventListener("click", function() {

})


fetch("https://www.reddit.com/search.json?q=nsfw:no")
    .then(function(data) {
        return data.json();
    })
   // find urls and put them into an array
   .then(function(objects) {
        
        var children = objects.data.children
        
        urls = []
        for (var i=0; i<=24; i++) {
            var url = children[i].data.url;
            urls.push(url);
            console.log(urls);
        }
    })
    //     //find image tags in url
    .then(function() {
        urls.filter(images)
    })
        
        // children.forEach( function(url) {
            
        //     console.log(url.);

        // })
        
        

    //    objects.data.children.url
    //    console.log(objects); // object data
    //    console.log(objects.data); //object
    //    console.log(objects.data.children);// array with 25things in it
    //    console.log(objects.data.children[0]);// object 100 keys in it, the one i want is url
    //    console.log(objects.data.children[0].data.url; // url i want

       

   // sift through tags to see which has the search input subject
   // return images and have them appear onto the page
   */