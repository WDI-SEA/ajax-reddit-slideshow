document.addEventListener('DOMContentLoaded', function() {

     console.log("Initiating fetch");
 
     let form = document.getElementById("click-start");
     form.addEventListener("click", function(e) {

        //grab what user entered 
        e.preventDefault();
         let query = document.getElementById("text-box").value;
         console.log(query);

        // hide h1, p , button and text box
        let b = document.getElementById("click-start");
            if (b.style.display === "none") { 
                b.style.display = "block";}
            else {
                b.style.display = "none";
             }
        let h = document.getElementById("title");
            if (h.style.display === "none") { 
                h.style.display = "block";}
            else {
                h.style.display = "none";
            }
        let d = document.getElementById("description");
            if (d.style.display === "none") { 
                d.style.display = "block";}
            else {
                d.style.display = "none";
            }
        let t = document.getElementById("text-box");
            if (t.style.display === "none") { 
                t.style.display = "block";}
            else {
                t.style.display = "none";
            }
        let s = document.getElementById("stop");
            if (s.style.display === "inline-block") { 
                s.style.display = "none";}
            else {
                s.style.display = "inline-block";
            }
        console.log("Lets hide!");

        // fetch images
        fetch(`https://www.reddit.com/search.json?q=${query}`)
                    .then(function(responseData) {

                        // where we do some stuff with the response data given by the request made to the url
                        let jsonData = responseData.json();
                        return jsonData;
                    })
                    .then(function(jsonRedditData){
                        console.log("Here is me data: ", jsonRedditData);

                        let results = jsonRedditData.data.children;
                        console.log("Here are my results ", results);
                        
                       
                        // if (results.data.post_hint === "image") {
                        let deetsINeed = results.map(function(redditResult){

                            //get the image (url) 
                            let oneResult = {
                                image: redditResult.data.url,
                            };
                            // return { title: String, url: String }
                            // return oneResult;
                            });
                            console.log(oneResult);
                                  
                        // };
                        //add them to a list on a dom
                        //get parent element
                        let redditResultDOM = document.getElementById("reddit-results");
                        //iterate over my list
                        deetsINeed.forEach(function(e){
                            //create image tag
                            let image = document.createElement("img");
                            // add href to img tag
                            image.src = `${e}`;
                            //add class to img tag
                            image.classList.add("image");
                            //append the image elem to parent
                            redditResultDOM.appendChild(image);
                        });
                        });

            });
    });

 
    
    //  let stop = document.getElementById("teach-me");
    //  stop.addEventListener("submit", function(e) {
    //      e.preventDefault();
    //      console.log("Stop!");
 
    //  });