var count = 0;
var FADE_SPEED = 1000;
var interval;
var urls = [];
$( document ).ready( function () {
    $('#img-page').hide();
    $('#stop').on('click',function(){
        urls = [];
        clearInterval(interval);
        $('#image').attr('src','http://my-smashing.smashingapps.netdna-cdn.com/wp-content/uploads/2014/02/loadingeffectweb_7.jpg');
        $('#img-page').fadeOut(FADE_SPEED,function(){
            $('#user-input').fadeIn(FADE_SPEED);
        });
    });
    $('#user-submit').on('click',function(){
        var value = $('#search-text').val();
        while(value.indexOf(' ') != -1) {
            value = value.replace(' ','+');
        }
        var url =  'https://www.reddit.com/search.json?q=' + value;
        
        console.log(url);
        $.ajax({'url':url}).done(function (resp) {
            var children = resp.data.children;
            for(var i = 0; i < children.length; i++){
                urls.push(children[i].data.thumbnail);
            }   
            urls = urls.filter(e => e != 'self' && e != 'default');
            $('#user-input').fadeOut(FADE_SPEED,function(){
                $('#img-page').fadeIn(FADE_SPEED,function(){
                    interval = setInterval(scroll, FADE_SPEED * 4);
                });
            });
        });
    });
});

function scroll(){
    console.log('scroll');
    $('#image').fadeOut(FADE_SPEED,function(){
        $('#image').attr('src',urls[count]);
        console.log('showing', urls[count]);
        count = (count + 1) % urls.length;
        console.log(count);
        $('#image').fadeIn(FADE_SPEED);
    });
}
