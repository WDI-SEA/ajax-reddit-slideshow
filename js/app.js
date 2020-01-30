function toggleFunc() {
    var x = document.getElementById("reddit-result");
    var y = document.getElementById("get-input");
    var z = document.getElementById("title");
    if (x.style.display === "block" && y.style.display === "none" && z.style.visibility === "hidden") {
      x.style.display = "none";
      y.style.display = "block";
      z.style.visibility = "visible"
    } else {
      x.style.display = "block";
      y.style.display = "none";
      z.style.visibility = "hidden";
    }
}

let picArr = [];
let stop = false;
document.addEventListener("DOMContentLoaded", function() {

    
    let form2 = document.getElementById("click-start");
    form2.addEventListener("click", function(e) {
        e.preventDefault();
        if (document.getElementById("click-start").textContent === "Click for your images!!") {
            document.getElementById("click-start").textContent = "stop";
            // make outer loop end
            //stop = true;
            //use clearinterval to clear interval
            //??????????

        } else if (document.getElementById("click-start").textContent === "stop") {
            document.getElementById("click-start").textContent = "Click for your images!!";
            //stop = false;
            
        }
    })
    
    let form = document.getElementById("click-start");
    form.addEventListener("click", function(e) {
        e.preventDefault();
        let query = document.getElementById("text-box").value;
        console.log(query);
        //document.getElementById("title").style.color =  "rgb(141, 69, 99)";
        //Need to hide title!!!


        fetch(`https://www.reddit.com/search.json?q=${query}`)
            .then(function(responseData) {
                //Where we do some stuff with the response data given to us by request made to the url
                let jsonData = responseData.json();
                return jsonData;
            })
            .then(function(jsonRedditData) {
                let results = jsonRedditData.data.children;
                console.log("Here is me data: ", results);

                let deetsINeed = results.map(function(redditResult) {
                    // Get the title
                    // Get the url
                    let oneResult = {
                        //title: redditResult.data.title,
                        url: redditResult.data.url,
                    }
                    // return { title: string, url: string }
                    return oneResult;
                });
                //Add them to a list on me dom
            // Get parent element
            let redditResultsDOM = document.getElementById("reddit-result");
            
            
            // Iterate over me list
            deetsINeed.forEach(function(oneResult) {

            //Dont neet to create items, only add the original half of the link into the image tag + the perma link
            //Need to figure out how to display them only one at a time (loop through all permalinks)
                //create an array of img urls that I can loop through with (Use filter and map)
            //Need to add a delay to looping through them (Use setInterval)
            //need to ficure out how to make it stop and restart

            //grab info and put in array
                
            //let beginning = `https://www.reddit.com/search.json?q=${query}`;
            //let complete = beginning + oneResult.url;
                
            picArr.push(oneResult.url);

            })          
        })
        //while (stop === "false") {
            setInterval(function() {        
                for (let i = 0; i < picArr.length; i++) {
                    let pics = document.getElementById("image");
                    pics.setAttribute("src", picArr[i]);
                }
            }, 5000);

       // }
    });
});
