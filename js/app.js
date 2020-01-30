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
    });
 
    
     let stop = document.getElementById("teach-me");
     stop.addEventListener("submit", function(e) {
         e.preventDefault();
         console.log("Stop!");
 
     });


    
    //  document.getElementById("click-start").addEventListener("click", function(e) {




    //  });

});