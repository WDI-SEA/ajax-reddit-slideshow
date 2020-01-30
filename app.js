document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("form").addEventListener("submit", function(event){

    

event.preventDefault();

let param = document.querySelector("input[type='text']").value;
let requestURL = 'http://www.reddit.com/search.json?q=${param}';

document.getElementById("search").style.display = "none";
document.getElementById("click-stop").style.display = "block";
document.getElementById("search").innerText = param;

fetch(requestURL)
    .then(function(responseData) {
        return responseData.json();
    })
    .then(function(jsonData){
        var images = jsonData.data.children.filter((item) => item.data.thumbnail !="self").map(function(item){
            return item.data.thumbnail
        })

        let count = images.length;

        var interval = setInterval(function(){

            document.querySelector("button").addEventListener("click", function() {
                clearInterval(interval);
            });


            if (count === 1) {
                
                document.querySelector("textbox").style.display = "none";
                clearInterval(interval);
            }
            count--;
            document.querySelector("slideshow").setAttribute("src", images[count]);

        },500);
    })

    })
})

//document.addEventListener('DOMContentLoaded', function() {
//
//    console.log('Initiate Fetch');
//    let form = document.getElementById('search');
//    form.addEventListener('submit', function(e){
//        e.preventDefault()
//        let query = document.getElementById('text-box').value;
//        console.log(query);
//        fetch ('https://www.reddit.com/search.json?q='+query)
//        .then(function(responseData) {
//            //this is where we do some stuff with the response data give to us by request mode to url
//            let jsonData = responseData.json();
//            return jsonData;
//        })
//        .then(function(jsonRedditData){
//           // console.log("got the data here chief: " + jsonRedditData);
//            
//       var images = jsonData.data.children.filter((item) => item.data.thumbnail != "self").map(function(item){
//           return item.data.thumbnail; 
//       })
//       console.log(images);
//  })
//
//        .catch(function(error) {
//            console.log("YOU DONE FUCKED UP A-A-RON")
//        })
//});
//});
//
//
//    let results = jsonRedditData.data.children;
//         //   console.log("here are my results", results);
//
//           var i;
//           for (i = 0; i <= results.length; i++){
//               if (results[i].data.post_hint === "image"){
//                   console.log(results[i].data.preview.images[0].source);
//               }
//           }
//           return oneResult;
//        });
//

            
 //           // get parent elem
 //           let redditResultDOM = document.getElementById(
 //           //iteraTe over list
 //           reddit.forEach(function(oneResult){
//
 //           
 //           //create an li elem
 //           let listItem = document.createElement('div');
 //           //create h3
 //           let title = document.createElement('img');
 //           title.textContent = oneResult.title;
 //           //add the h3 title to li'
 //           listItem.appendChild(title);
 //           //create a tag
 //           let link = document.createElement('a');
 //           //set a tag href
 //           link.href = 'http://www.reddit.com' + oneResult.url;
 //           link.textContent = 'See it on Reddit'
 //           //add the a tag with url to li
 //           listItem.appendChild(link);
 //           //appent li to parent
 //           redditResultDOM.appendChild(listItem);
 //           })
 //       );
 //    
    

    

//    console.log("Totes made fetch happen)"