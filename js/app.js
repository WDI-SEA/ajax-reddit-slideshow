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
            //clearInterval(interval);
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
                return responseData.json();
            })
            .then(function(jsonData) {
                 //loop thru nested return array of items
                var images = jsonData.data.children.filter((item) => item.data.url[length - 1] != "g").map(function(item) {
                    return item.data.url;
                })

                let count = images.length;

                // iterate through array of images; stop onve none left
                var interval = setInterval(function() {

                    // iteration loop
                    if (count === 1) {
                        document.getElementById("title").innerText = "No more images!";
                        document.querySelector("#image").display = "none";
                        clearInterval(interval);
                    }
                    count--;
                    document.querySelector("#image").setAttribute("src", images[count]);
                }, 500);

            });
        });
});
