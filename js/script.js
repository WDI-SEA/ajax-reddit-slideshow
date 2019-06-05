// import { brotliDecompressSync } from "zlib";
var stopButton;
var button;
var typedInput;
var disc;
var title;
var par;
var url = 'https://www.reddit.com/search.json?q=20';
var imageIndex = 0;
var handle = null;
var leftPic;

document.addEventListener('DOMContentLoaded', function () {
    button = document.getElementsByTagName('button')[0];
    typedInput = document.getElementsByTagName('input')[0];
    disc = document.getElementsByTagName('div')[0];
    title = document.getElementsByTagName('h1')[0];
    stopButton = document.getElementById('stop');
    par= document.getElementsByClassName('par')[0];
    leftPic= document.getElementById('show');
    //add Event listner to the butoon





    button.addEventListener('click', function (e) {


        if (typedInput.value !== '') {
            //grab the text from the
            var text = typedInput.value;
            var fechArgument = url + text + '+nsfw:no';
            typedInput.value = '';
            typedInput.style.backgroundColor = 'white';
            typedInput.classList.add('hidden');
            disc.classList.add('hidden');
            title.classList.add('hidden');
            typedInput.classList.remove('visible');
            disc.classList.remove('visible');
            title.classList.remove('visible');
            par.textContent = '';
            fetch(fechArgument)
                .then(function (responseData) {
                    return responseData.json();

                })
                .then(function (jsonData) {
                    // var posts = jsonData.data.children[1].data.thumbnail;
                    var newThumbs = jsonData.data.children.map(function (thumb) {
                        return thumb.data.thumbnail
                    });
                    show.src = newThumbs[0];
                    handle = setInterval(function () {
                        imageIndex++;
                        show.src = newThumbs[imageIndex];
                    }, 1000);

                    // for (i = 0; i < posts.length; i++) {
                    //     var thumbnail = posts[i].data.thumbnail;
                    //     console.log(thumbnail);
                    //     // var image = document.createElement('img');
                    //     // image.src = thumbnail;
                    //     // var appending = document.getElementsByClassName('pics');
                    //     // // appending.appendChild(image);
                    //     // console.log(image);
                    // }
                    // //  console.log(jsonData);
                });
        } else {

            typedInput.style.backgroundColor = 'rgb(216, 5, 23)';
            par.textContent = "Pleas type what you want to see";
            par.style.color = 'red';
        }

    });
    stopButton.addEventListener('click', function (e) {
        typedInput.classList.add('visible');
        disc.classList.add('visible');
        title.classList.add('visible');
        typedInput.classList.remove('hidden');
        disc.classList.remove('hidden');
        title.classList.remove('hidden');
        leftPic.classList.add('hidden');
        clearInterval(handle);
    });

});


// .then(function (json) {
//     var posts = jsonData.data.children;
//     for (i = 0; i < posts.length; i++) {
//         var thumbnail = posts[i].data.thumbnail;
//         console.log(thumbnail);
//         var image = document.createElement(‘img’);
//         image.src = thumbnail;
//         document.getElementById(‘slideshow’).appendChild(image);
//         console.log(image);
//     }
// });
// })


