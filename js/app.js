document.addEventListener("DOMContentLoaded", function() {
    //1
    console.log("Initiating fetch....");

    let slideSHow;
    // search for stuff once the submit button is clicked
    document.getElementById("teach-me").addEventListener("submit", function(e) {
        e.preventDefault();
        //get the search string
        let query = document.getElementById("text-box").value;
        //console.log(query);

        let h1 = document.getElementById("title");
        if (h1.style.display === "none") {
            h1.style.display = "block";
        } else {
            h1.style.display = "none";
        }

        // look for the word to be searched
        fetch(`http://www.reddit.com/search.json?q=${query}`)
            .then(function(respondData) {
                // where we do some stuff with the response data given to us by request made to the url
                let jsonData = respondData.json();
                return jsonData;
            })
            .then(function(jsonRedditData) {
                // 3
                let results = jsonRedditData.data.children;
                //console.log("Here are my results: ", results);

                //filter out the images
                let image = results.filter(function(res) {
                    return res.data.post_hint === "image";
                });

                // map the images to a url
                let images = image.map(function(redditResult) {
                    console.log(redditResult);
                    return redditResult.data.url;
                });
                console.log(images);

                let div = document.getElementById("redit-results");

                //setInterval(function() {
                // iterate over my list images and display them
                images.forEach(function(image) { // for each image in Images[]
                    // create an li element
                    //let li = document.createElement("li");
                    var img = document.createElement("img"); // create an img element
                    img.src = image;
                    img.height = "200";
                    img.width = "200";
                    div.appendChild(img);
                    //ul.appendChild(li);
                });
                // }, 2000)


            });
    });
});