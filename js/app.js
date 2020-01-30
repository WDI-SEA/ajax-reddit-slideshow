document.addEventListener('DOMContentLoaded', function() {

    console.log('Initiating fetch ');
    
   let form = document.getElementById('searchbox');
   form.addEventListener('submit', function(e){
       e.preventDefault()
        let stuff = document.getElementById('text-box').value

        let b = document.getElementById("click-start");
            if (b.style.display === "none") {
                b.style.display = "block";}
            else {
                b.style.display = "none";
            }
        let h = document.getElementById("intro");
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
        let s = document.getElementById("click-stop");
            if (s.style.display === "inline-block") {
                s.style.display = "none";}
            else {
                s.style.display = "inline-block";
            }
   

        fetch('https://www.reddit.com/search.json?q=' + stuff)
        .then(function(responseData) {
            let jsonData = responseData.json();
            return jsonData;
        })
        .then(function(jsonRedditData){
            console.log(jsonRedditData)
            let results = jsonRedditData.data.children;
            var i;
            for (i = 0; i <= results.length; i++ ){
                if (results[i].data.post_hint === "image"){

                        
                    console.log(results[i].data.preview.images[0].source);
                }
        
            }
            console.log("here is results", results);

            

        })   
    })
});

