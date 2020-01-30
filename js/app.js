let arr = [];

let resetButtonEnable = function() {
    document.querySelector(".button").value = "Reset";
    document.querySelector(".inputBox").hidden = true;
    // should add event listener for resetting the page effectively
    document.querySelector(".button").addEventListener('click', resetButtonDisable);
    document.querySelector('.button').removeEventListener('click', fetchFun);
};

let resetButtonDisable = function() {
    document.querySelector(".inputBox").hidden = false;
    document.querySelector('.button').removeEventListener('click', resetButtonDisable);
    document.querySelector(".button").value = "Submit your wish";
    document.querySelector('.button').addEventListener('click', fetchFun);
};

// let displayFunction = function() {

// setTimeout(function() {




//     console.log("displayFunction running")
//     // want to place img in the imgField
//     // document.querySelector('.imgField').appendChild(imgReddit);

//     for (i = 0; i < arr.length; i++) {
//         setTimeout(function() {
//             //empty
//             let imgField = document.querySelector('.imgField');
//             //these two directly below work but for some reason the arr[i] and arr[i + 1] is not working; seems to be NODE related
//             // imgField.removeChild(arr[0]);
//             // imgField.appendChild(arr[1]);
//             // let tempImg= document.createElement('img');
//             // tempImg = arr[i]
//             imgField.removeChild(imgField.childNodes[i]);
//             //insert one pic into
//             // tempImg2 = arr[i+1]
//             imgField.appendChild(imgField.childNodes[i + 1]);
//         }, 2000);
//     };
// }, 2000);
// }


// deetsINeed.forEach(function(oneResult) {
//     let listItem = document.createElement('li');
//     // create an li elem
//     let title = document.createElement('h3');
//     // create h3
//     title.textContent = oneResult.title;
//     // add the h3 title to li
//     listItem.appendChild(title);
//     // create an a tag
//     let link = document.createElement('a');
//     // set a tag href
//     link.href = "https://www.reddit.com/" + oneResult.url
//     link.textContent = 'See it on Reddit!'
//     // add the a tag with url to li
//     listItem.appendChild(link);
//     // append the li elem to parent
//     redditResultsDOM.appendChild(listItem);
    

let fetchFun = function() {
    arr = [];
    console.log("Testz");

    // document.querySelector('.button').addEventListener('click', function() {
        
    console.log("Testy");

    fetch(`https://www.reddit.com/search.json?q=${document.querySelector(".inputBox").value}`)
    .then(function(responseData) {
        //Where we do some stuff with the response data given to us by the request made to the url
        let jsonData = responseData.json();
        console.log("TestA")
        // console.log(jsonData)
        return jsonData;
    })
    .then(function(jsonRedditData) {
        let results = jsonRedditData.data.children;
        console.log("Here are the query results: ", results);
        let neededInfo = results.map(function(redditResult) {
            let oneResult = redditResult.data.url;
            console.log(oneResult);
            return oneResult;
            // return { title: String, url: String }
        });
        
        // get parent elem
        let redditResultsDOM = document.querySelector('#reddit-results');
        // iterate over my list
        neededInfo.forEach(function(oneResult) {
            // setTimeout(function(){

                    let imgReddit = document.createElement('img');
                    imgReddit.src = oneResult;
                    arr.push(imgReddit);
                    // create an li elem
                    // let title = document.querySelector('.imgField');
                    // create h3
                    // title.textContent = oneResult.title;
                    // add the h3 title to li





                    let listItem = document.createElement('li');
                    // create an li elem
                        // let title = document.createElement('h3');
                    // create h3
                        // title.textContent = oneResult.title;
                    // add the h3 title to li
                    listItem.appendChild(imgReddit);
                    // create an a tag
                    // append the li elem to parent
                    
                    let displayFunction = function() {

                        setTimeout(function() {
                        
                        
                        
                        
                            console.log("displayFunction running")
                            // want to place img in the imgField
                            // document.querySelector('.imgField').appendChild(imgReddit);
                        
                            // for (i = 0; i < arr.length; i++) {
                                setTimeout(function() {
                                    //empty
                                    let imgField = document.querySelector('.imgField');
                                    imgField.removeChild(imgField.childNodes[0]);
                                    imgField.appendChild(listItem);
                                // let imgField = document.querySelector('.imgField');
                                    //these two directly below work but for some reason the arr[i] and arr[i + 1] is not working; seems to be NODE related
                                    // imgField.removeChild(arr[0]);
                                    // imgField.appendChild(arr[1]);
                                    // let tempImg= document.createElement('img');
                                    // tempImg = arr[i]
                                // imgField.removeChild(imgField.childNodes[i]);
                                    //insert one pic into
                                    // tempImg2 = arr[i+1]
                                // imgField.appendChild(imgField.childNodes[i + 1]);
                                }, 2000);
                            // };
                        }, 4000);
                    }
                    
                    
                    
                    displayFunction();
                    
                    // want to place img in the imgField
                    // title.appendChild(imgReddit);
                    
                    // }, 2500);
                    // setTimeout(function() {
                        
                        //     document.querySelector("img").remove();
                        // }, 10);
                        
                        
                        
                        // create an a tag
                        // let link = document.createElement('a');
                        // set a tag href
                        // link.href = "https://www.reddit.com/" + oneResult.url
                        // link.textContent = 'See it on Reddit!'
                        // add the a tag with url to li
                        // imgReddit.appendChild(link);
                        // append the li elem to parent
                        // redditResultsDOM.appendChild(imgReddit);
                    });
                    console.log(arr);
                    // document.querySelector('.imgField').appendChild(arr[0]);


                            // call display function
                            // $('.imgField').slick({
                                //     infinite: true,
                                //     slidesToShow: 3,
                //     slidesToScroll: 3
        });   
        resetButtonEnable();
        
};



document.addEventListener('DOMContentLoaded', function() {
    
    console.log("TEST");

    let form = document.querySelector('.formMW');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let query = document.getElementById('text-box').value;
        console.log(query);
    })

    // log results of form
    console.log(form)
        
        console.log('Test log');
        
    document.querySelector('.button').addEventListener('click', fetchFun);
    
});







// neededInfo.forEach(function(oneResult) {
//     // setTimeout(function(){

//             let imgReddit = document.createElement('img');
//             imgReddit.src = oneResult;
//             // create an li elem
//             let title = document.querySelector('.imgField');
//             // create h3
//             // title.textContent = oneResult.title;
//             // add the h3 title to li
            
//             arr.push(imgReddit);
            
//         });