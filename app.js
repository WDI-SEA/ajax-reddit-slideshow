document.addEventListener('DOMContentLoaded', function() {
    // 1
    
    
    
    console.log('initiating fetch');
    let form = document.getElementById('yo');
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        let query = document.getElementById('text-box').value;
        console.log(query);
    });

});