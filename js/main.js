$(function() {

  var btnSubmit = $('#submit-btn');
  var body = $('body');
  /*Post Constructor*/
  var Post = function(title, url, imageLink) {
    this.title = title,
    this.url = url,
    this.imageLink = imageLink
  }
  var that = this;
  /*
      gets the raw data via AJAX
      @param Str data
   */
  function getData(searchQuerry) {
    console.log('search query', searchQuerry);
    searchQuerry = searchQuerry || 'cats';

    $.get('http://www.reddit.com/search.json', {
      q: searchQuerry,
      limit: 5,
      type:'img'
    }).done(function(ret) {
      renderResult(parseData(ret));
    })
  }
  /*Takes in the an array of Post objects*/
  function renderResult(arr) {
    console.log('render', arr[0]);
    initCarosel(arr);
  
  }

  function parseData(ret) {
    console.log(ret);
    let postsArr = []
    for (let i = 0; i < ret.data.children.length; i += 1) {
      let title, url, imgLink;

      // console.log(ret.hasOwnProperty('data.children[i].data.preview.images["0"].source.url'));
      // if(typeof(ret.data.children[i].data.preview.images["0"].source.url) !== "undefined"){}

      title = ret.data.children[i].data.title;
      url = ret.data.children[i].data.url;
      imgLink = ret.data.children[i].data.preview.images[0].source.url;
      postsArr.push(new Post(title, url, imgLink));


      console.log('imgLink ', ret.data.children[i].data.preview.images["0"].source.url);
    }
    console.log('parse', postsArr[0]);
    return postsArr;
  }

  function init() {
    btnSubmit.on('click', (e) => {
      e.preventDefault();
      getData($('#user-input').val());

    });

  }

function randomGenerator(){
    return Math.floor((Math.random() * 5) + 1);
}

  function initCarosel(arr) {
    console.log('carosel', arr[0]);
    body.vegas({
      shuffle: true,
      loop: true,
      autoplay: true,
      timer: false,
      cover: true,

    play: function(index, slideSettings) {
        console.log(index);
        $('.hide').hide();
        //hide the form 
      },
      end: function(index, slideSettings) {
        console.log('end');
        arr = [];
        //clear the images 
        //bring back the form
      },
      pause: function(index, slideSettings) {
        console.log('pause');
        //enlare the post title
      },
        walk: function(index, slideSettings) {
            console.log('index',index);
            console.log(arr[index].title)
            $('#link-title').text(arr[index].title);
            // $('#post-link').attr(arr[index].title);


        },
      slides: [
        { src: arr[0].imageLink },
        { src: arr[1].imageLink },
        { src: arr[2].imageLink },
        { src: arr[3].imageLink },
        { src: arr[4].imageLink }
      ]
      // slides: [
      //   { src: 'https://i.redditmedia.com/a29lk6XbfdGy3xvOLqcsxkw_IdsQkAKaXKuzTFmRXUM.jpg?s=9316532dab2a7f86e8d4d32b9fb4820a' },
      //   // {src: arr[0].imageLink}
      // ]
    });
  }


  init();


  $('a#pause').on('click', function() {
    body.vegas('pause');
    $('#input-form').show();
  });

  $('a#play').on('click', function() {
    body.vegas('play');

  });

  $('a#stop').on('click', function() {
    body.vegas('destroy');
    $('#input-form').show();


  });

}());
