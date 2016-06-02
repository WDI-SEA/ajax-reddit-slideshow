var picArray = [];
var count = 0;


$(document).ready(function(){

  $('#textInput').focus();

	$('#formId').on('submit', function(e){

		e.preventDefault();



    word = $('#textInput').val();

    $.get('http://api.giphy.com/v1/gifs/search', {

      q: word,

      api_key: 'dc6zaTOxFJmzC'

    }).done(function(data){

      var array = data.data;

      for(i=0;i<array.length;i++){

        var pic = array[i].images.original.url;

        picArray.push(pic);

       

      }

    }).fail(function(data){

    }).always(function(data){

    });

    $('#textInput').val('');

    $('#title').hide();
    $('#textDiv').hide();
    $('#buttonId').hide();
    $('#stop').show();


	});

  $('#stop').on('click', function(e){

    e.preventDefault();

    location.reload();

    // clearInterval(setI);

    // $('#title').show();
    // $('#textDiv').show();
    // $('#buttonId').show();
    // $('#image').attr('src', "");
    // $('#stop').hide();

  });


});

var setI = setInterval(function(){ 

      if(picArray.length === count){

        count = 0;

      }
      $('#image').attr('src', picArray[count]);

      count++;

    }, 2000);


// function slideShow(array){
//   for(i=0;i<array.length;i++){

//     $('#picShow').html('<img src=' + array[i] + '>');

//   }
//   array.pop();
// }


