$(document).ready(function() {

  // $.ajaxSetup({
  //   headers: {
  //     "Access-Control-Allow-Origin": true
  //   }
  // });
//create function to cycle through array of API data/img links and apply it to the #photo div
function slideshow(pics){
  pics.forEach(function (a){
    console.log(a);
    $('#photo').html('<img src="" />')
    $('#photo').html('<img src="' + a + '" />');
});
}

//clears the textfield when clicked on
  $('#input').click(function(event) {
    $('#input').val('');
  });

//creat click event for when click on submit
  $('#search').click(function(event){
    event.preventDefault();
    //gets input value
    var input = $('#input').val();
    //puts value in query
    $.get('https://www.reddit.com/r/pics/search.json', {
        q: input
      }).always(function(data){
        //hides the headers and submit button
        $('#hide').addClass('hide')
        var array = [];
        //take data.data.children and if has property of preview, and images, loop through each images and push the url to the array
        data.data.children.forEach(function(element){

            if(element.data.hasOwnProperty('preview') && element.data.preview.hasOwnProperty('images')){

              element.data.preview.images.forEach(function(e){

                array.push(e.source.url);
                var intervalID = window.setInterval(slideshow(array), 4000);
              });
            }

          // console.log(array);
          // return array;
        });
      });

    $('#input').val('');
  });

  $('#reset').click(function(event){
    $('#hide').removeClass('hide');
    $('#photo').html('');
  });

});
