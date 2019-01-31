console.log("locked and loaded")

var searchTerm = '';
var filteredUrls = []; 
var slideShow;



document.getElementsByTagName('button')[0].addEventListener('click', function(e) {
    clearInterval(slideShow);
    searchTerm =  document.getElementById("searchBox").value; 
    search(); 
    
    console.log(searchTerm);
})

function search(){
    fetch("http://www.reddit.com/search.json?q=" + searchTerm + "+nsfw:no")
    .then(function(data) {
        return data.json();
    })
    .then(function(json) {
        // console.log('big motherfucker', json)
        var imageUrls = [];
        var counter = 1;
            //  json.data.children.forEach(function(child){
            // //  console.log(child.data.url)
             json.data.children.forEach(function(child){
             imageUrls.push(child.data.url)
             filteredUrls = imageUrls.filter(function(element){
                 return element.includes(".jpg") || element.includes(".png")
             })

 console.log('filteredURLs: ', filteredUrls); 
            //  })
            document.getElementById("userImage").style.backgroundImage = 'url('+ filteredUrls[0] +')'; 

            slideShow = setInterval(function() {
                document.getElementById("userImage").style.backgroundImage = 'url('+ filteredUrls[counter] +')'; 
                if (counter < filteredUrls.length- 1 ){
                    counter++ 
                } else {
                    counter= 0
                }
              }, 1000);
            })  





            // instantiate a counter at 0 outside of interval
            // instantiate a variable to hold the DOM element for div
            // setInterval for 4000ms 
            // inside this interval, we're gonna wanna 
            // change the DOM element's background-image CSS rule 
            // to 'url(' + imageUrls[counter] + ')'
            // and then if counter < (imageUrls.length-1) {  counter++ } else { counter = 0 }
            // document.getElementById("userImage").style.backgroundImage = imageUrls[0]; 
            //  console.log(imageUrls)
            })  
    }

