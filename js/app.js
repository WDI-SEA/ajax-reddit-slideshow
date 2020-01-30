document.addEventListener('DOMContentLoaded', function() {
    // 1
     console.log("Initiating fetch");
 
     let form = document.getElementById("click-start");
     form.addEventListener("click", function(e) {
         e.preventDefault();
         let query = document.getElementById("text-box").value;
         console.log(query);
 
     });
 
});