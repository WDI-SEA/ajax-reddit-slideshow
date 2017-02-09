var query;

$('#searchbtn').on('click', function(){
  query = $('#input').val();
  console.log($('#pic'))
  startSearch();
});

function startSearch(){
  $.get('https://www.reddit.com/r/pics/search.json', {
    q: query,
    sort: 'new',
    restrict_sr: 'on'
  }).done(function(data){
      handleData(data.data.children);
  }).fail(function(error){
    console.log('err');
  });
}



function handleData(data){
  console.log(data)
  var dataArr = [];
  for(var i=0; i < data.length; i++){
      dataArr[i] = data[i].data.url;
  }
  var filtered = dataArr;
  displayData(filtered);
}

function displayData(images){
  for(var i=0; i < images.length; i++){
      $('#pic').append("<img class='pictures' src='" + images[i] + "'></img>")
  }
  makeSlides();
}
function makeSlides(){
  $(function(){
    $("#pic").slidesjs({
      width: 600,
      height: 400,
      pagination: {
      active: false,
        // [boolean] Create pagination items.
        // You cannot use your own pagination. Sorry.
      effect: "slide"
        // [string] Can be either "slide" or "fade".
      },
      play: {
      active: true,
      effect: "slide",
      interval: 2000,
      auto: true,
      swap: true,
      pauseOnHover: false,
      restartDelay: 2500
    }
    });
  });
}
