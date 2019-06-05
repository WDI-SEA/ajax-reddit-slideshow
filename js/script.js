//* variable field
var buttonWord = 'STOP';
var displayControl = 'none';
var inputWord;
var inputWordUrlArray;
var slideimgIntervalHandler;



//* element field
var startbtnEl = document.getElementById('start');
var introdivEl = document.getElementById('intro');
var stopbtnEL = document.getElementById('stop');
var userinputWordEl = document.getElementById('userinputword');
var slideimgEl = document.getElementById('slideimg');


//* event listeners
startbtnEl.addEventListener('click', function(){
    inputWord = userinputWordEl.value; 
    // console.log(inputWord);
    userinputWordEl.value = '';
    let url = 'http://www.reddit.com/search.json?q=' + inputWord + '+nsfw:no';
    fetch(url)
        .then(function(responseData) {
            console.log('get data');
            return responseData.json();
        })
        .then(function(jsonData) {  
            inputWordUrlArray = jsonData.data.children.map(function(element) {
                return element.data.thumbnail;
            });
        });
    removeIntro();
    let i = 0;
    slideimgIntervalHandler = setInterval(function() {
        if (i === inputWordUrlArray.length) {
            i = 0;
        } else {
            slideimgEl.src = inputWordUrlArray[i];
            i++;
        }

    }, 2000);
});

stopbtnEL.addEventListener('click', function(){
    showIntro();
    clearInterval(slideimgIntervalHandler);
    slideimgEl.src='';
});






//* functions
function showIntro() {
    introdivEl.style.display = 'block';
    startbtnEl.style.display = 'inline';
    stopbtnEL.style.display = 'none';
}

function removeIntro() {
    introdivEl.style.display = 'none';
    startbtnEl.style.display = 'none';
    stopbtnEL.style.display = 'inline';
}




