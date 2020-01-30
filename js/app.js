let page = document.getElementById('reddit-results'); 
let oneResult;
let jimmy = [];
document.addEventListener('DOMContentLoaded', function() {
    // 1
    
    
    
    console.log('initiating fetch');
    let form = document.getElementById('yo');
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        let query = document.getElementById('text-box').value;
        console.log(query);
        fetch(`http://www.reddit.com/search.json?q=${query}`)
        .then(function (responseData) { 
            let jsonData = responseData.json();
            return jsonData
        })
            .then(function(jsonRedditData) {
                let results = jsonRedditData.data.children;
                var i;
                for (i = 0; i <= results.length; i++) {
                    if (results[i].data.post_hint === 'image') {
                        console.log(results[i].data.preview.images[0].source);
                        jimmy = results[i].data.preview.images[0].source;
                    }
                }
                
                
                
                
                
                });

                //console.log("here are my results", results);

                /*let deetsINeed = results.map(function(redditResult) {
                    let oneResult = 
                        
                    //return oneResult;
                    console.log('yoyo');
                });
                let redditResultsDom = document.getElementById('reddit-results');
                // iterate over my list
                deetsINeed.forEach(function(oneResult) {

                    // create an li element
                    let listItem
                })
                
            });*/
            let redditResultsDOM = document.getElementById('reddit-results');
            let mage = document.createElement('img');
            mage.src = jimmy;
            mage.textContent = 'bloooo';
            h1.appenChild(mage);
        });
page.src = jimmy[0];
});