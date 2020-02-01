document.addEventListener("DOMContentLoaded", function() {
    console.log("Working...");
    let form = document.querySelector("form");
    let button = document.querySelector("button");
    let redditResultsDOM = document.getElementById("reddit-results");
    button.addEventListener("click", function(e) {
        e.preventDefault();
        //hide button
        button.style.display = "none";
        //show form
        form.style.display = "block";
        //turn off slick
        $("#reddit-results").slick("unslick"); 
        //hide slideshow
        redditResultsDOM.innerHTML = "";

    })
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        //make reset button visible
        button.style.display = "inline";
        //hide form
        form.style.display = "none";
        let query = document.getElementById("text-box").value;
        console.log(query);
        fetch(`https://www.reddit.com/search.json?q=${query}+nsfw:no`)
            .then(function(responseData) {
                let jsonData = responseData.json();
                console.log(jsonData);
                return jsonData;
            })
            .then(function(jsonRedditData) {
                let results = jsonRedditData.data.children;
                let details = results.map(function(redditResult) {
                    let result = {
                        pic: redditResult.data.url,
                        url: redditResult.data.permalink
                    }
                    console.log(result.pic);
                    return result;
                });
                details.forEach(function(result) {
                    if (result.pic[result.pic.length-1]=="g") {
                        let pic = document.createElement("img");
                        pic.setAttribute("src", result.pic);
                        redditResultsDOM.appendChild(pic);
                    }
                })
                $('#reddit-results').slick({
                    fade: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    centerMode: true,
                    centerPadding: '60px',
                    responsive: [
                      {
                        breakpoint: 768,
                        settings: {
                          arrows: false,
                          centerMode: true,
                          centerPadding: '40px',
                          slidesToShow: 1
                        }
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          arrows: false,
                          centerMode: true,
                          centerPadding: '40px',
                          slidesToShow: 1
                        }
                      }
                    ]
                    //todo: align center, repeat images, fix reset
                });
            })
    })
});