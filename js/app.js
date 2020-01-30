let arr = [];

let resetButtonEnable = function() {
    document.querySelector(".button").value = "Reset";
    document.querySelector(".inputBox").hidden = true;
    document.querySelector("h2").hidden = true;
    document.querySelector('img').src = "";
    document.querySelector("img").hidden = false;
    // add event listener for resetting the page effectively
    document.querySelector(".button").addEventListener('click', resetButtonDisable);
    document.querySelector('.button').removeEventListener('click', fetchFun);
};

let resetButtonDisable = function() {
    document.querySelector(".inputBox").hidden = false;
    document.querySelector("h2").hidden = false;
    document.querySelector("img").hidden = true;
    document.querySelector('.button').removeEventListener('click', resetButtonDisable);
    document.querySelector(".button").value = "Submit your wish";
    document.querySelector('.button').addEventListener('click', fetchFun);
};

let displayFunction = function() {

    setTimeout(function() {

        console.log("displayFunction running")
        // want to change src of the img in the HTML file with the urls I stored in arr[]
        
        let i = 0;
        document.querySelector('img').src = arr[i];
            
        setInterval(function() {
            i++;
            // if more time, would troubleshoot which images don't appear and why and skip over them when displaying
            // tried to do that with a quick solution to help with some of them by saying if the url does not start with H, to skip over it
                // by doing i++; Would ideally like to loop through the array rather than have a set of if statements in a row
            if (i > arr.length) {
                i = 0;
            }
            if (i[0] != "h") {
                i++
            }
            if (i[0] != "h") {
                i++
            }
            if (i[0] != "h") {
                i++
            }
            if (i[0] != "h") {
                i++
            }
            document.querySelector('img').src = arr[i];
            console.log(arr[i]);
            console.log("running setInterval function")
        // changing this number will change how fast the pictures change
        }, 2000);
    }, 1500);
}

let fetchFun = function() {
    arr = [];
    console.log("Testz");

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
        });
        
        // iterate over my list
        neededInfo.forEach(function(oneResult) {

            arr.push(oneResult);            
            
        });
        
        // run displayFunction()
        displayFunction();
        console.log(arr);

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