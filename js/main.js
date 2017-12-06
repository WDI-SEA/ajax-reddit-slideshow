$(function() {

  var btnSubmit = $('#submit-btn');
  var body = $('body');
  /*Post Constructor*/
  var Post = function(title, url, imageLink) {
    this.title = title,
      this.url = url,
      this.imageLink = imageLink
  }
  /*
      gets the raw data via AJAX
      @param Str data
   */
  function getData(searchQuerry) {
    console.log('search query', searchQuerry);
    searchQuerry = searchQuerry || 'cats';

    $.get('http://www.reddit.com/search.json', {
      q: searchQuerry,
      limit: 10, 
      // nsfw: false
    }).done(function(ret) {
      renderResult(parseData(ret));
    })
  }
  /*Takes in the an array of Post objects*/
  function renderResult(obj) {
    // console.log(obj);
  }

  function parseData(ret) {
    console.log(ret);
    let postsArr = []
    for (let i = 0; i < ret.data.children.length; i += 1) {
      let largeImageposition = ret.data.children[1].data.preview.images[0].resolutions.length - 1;
      let title = ret.data.children[i].data.title;
      let url = ret.data.children[i].data.url;
      let imageLink = ret.data.children[1].data.preview.images[0].resolutions[largeImageposition].url;
      postsArr.push(new Post(title, url, imageLink));
    }
    return postsArr;
  }

  // TODO: hide form until carosel is stopped.
  // add a link to the related image post
  // 

  function init() {
    btnSubmit.on('click', (e) => {
      e.preventDefault();
      getData($('#user-input').val());
    });

  }
  init();


  $('a#pause').on('click', function () {
    body.vegas('pause');
});

$('a#play').on('click', function () {
    body.vegas('play');
});


  body.vegas({
    shuffle: true,
    loop: true,
    autoplay: true,
    timer: false,
    cover: true,


    play: function(index, slideSettings) {
      console.log('play');
      //hide the form 
    },
    end: function (index, slideSettings){
        console.log('end');
        //clear the images 
        //bring back the form
    },
    pause: function (index, slideSettings){
        console.log('pause');
        //enlare the post title
    }, 
    slides: [
      { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Hazy_Crazy_Sunrise.jpg/1200px-Hazy_Crazy_Sunrise.jpg" },
      { src: "https://static.pexels.com/photos/67832/sunrise-sky-blue-sunlight-67832.jpeg" }

    ]
  });


}());
