$('document').ready(function(){





  var findPics = function(dataObj) {
    var filterResult = dataObj.data.children.filter(function(element) {
      if (element.data.hasOwnProperty('preview')){
        return true;
      }else{
        return false;
      }
    });

    console.log(filterResult);
    var urlArray = filterResult.map(function(element){
      return element.data.preview.images[0].source.url;
    });

    console.log(urlArray);
    var index = 0;
    intervalID = window.setInterval(function() {
    index++;
    if (index >= urlArray.length) {
        index = 0;
    }
    console.log(urlArray[index]);   // set new news item into the ticker
    $('#results').html('<img src="' + urlArray[index] + '"></img>');
}, 5000);
  };




  // var intervalElementSelector = setInterval(function(arr) {
  //     index++;
  //     if (index >= arr.length) {
  //         index = 0;
  //     }
  //     console.log(arr[index]);
  // }), 5000);

  $("#textForSearch").keyup(function(event){
    if(event.keyCode == 13){
        $("#buttonForSearch").click();
    }
  });

  $('#buttonForSearch').on('click', function(e) {
    e.preventDefault();

    var searchString = $('#textForSearch').val();

    $.get('https://www.reddit.com/search.json', {
    q: searchString

  }).done(function(data){
    console.log('success!');
    console.log(data);
    myData = data;
    findPics(myData);
    // return myData;
  }).fail(function(data){
    console.log("failed!");
    console.log(data);
  }).always(function(data){
    console.log('always');
    console.log(data);
    myData = data;
  });

    // var temp = $('#textForSearch').val();
    // console.log(temp);
    $('h1').hide();
    $('form').hide();

  });



  $('#buttonForStopSearch').on('click', function(e) {
    e.preventDefault();
    // stop the animation with .clearInterval();
    window.clearInterval(intervalID);
    $('h1').show();
    $('form').show();
    $('#results').html('');
  });


})
