console.log("loaded!")
const REDDIT_API = 'https://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 1000
const intervalTime = 3000
let currentImages = []
let currentIndex = 0

const helperLog = (e) => {
    e.preventDefault()
    let userQuery = document.getElementById('query').value
    console.log(REDDIT_API + userQuery)
    submit(userQuery)
}

const submit = (userQuery) => {
    fetch(REDDIT_API + userQuery)
    .then((response) => {
        console.log("response received")
        return response.json()
    })
    .then((jsonData) =>{
        console.log("sucess", jsonData.data.children)
        let results = jsonData.data.children.filter((item) => {
            return item.data.post_hint == "image"
        }).map((item) => {
            return {
                title: item.data.title,
                url: item.data.url,
                subreddit: item.data.subreddit,
                upvotes: item.data.ups,
                downvotes: item.data.downs,
                gold: item.data.gilded > 0
            }
        })
        // console.log(results)
        currentImages = results
        // console.log("here are the results", currentImages[currentIndex].url)
        startSlideshow()
        currentImages.forEach( () => {
            displayCurrent()
             currentIndex++
         })
         //slideshow loop lives here now
         //loop where after 3 secs removes the class active from
         console.log("here is the current image:", currentImages)
        //  setInterval(imageloop, 1000)
         imageloop()
    })
    .catch((err) => {
        console.log("uh oh ", err)
    })
}

const startSlideshow = () => {
    // console.log("start")
    //hide search bar
    document.getElementById("container").style.visibility = 'hidden'
    //Show the slideshow div
    document.getElementById("slideshow").style.visibility = 'visible'
    //display the first image
    
    //kick off the interval
}

const displayCurrent = () => {
    //empty previous images
    //create an image tag
    // console.log("current image ", currentImages[currentIndex].url)
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    if (currentIndex > 0) {
        // img.style.display = "none"
        document.getElementById('results').append(img)
    } else {
        img.classList.add('active')
        document.getElementById('results').append(img)
    }

// console.log("current index is ", currentIndex)
}
const imageloop = () => {
$('#results img:gt(0)').hide();
setInterval(function () {
    let current = $('#results img:visible');
    let next = current.next().length ? current.next() : $('#results img:eq(0)');
    current.fadeOut(3000)
    next.fadeIn(3000);
}, 6000)
}

document.getElementById('stopBtn').addEventListener('click', function(){
    document.getElementById("container").style.visibility = "visible"
    document.getElementById("slideshow").style.visibility = 'hidden'
    currentImages = []
    currentIndex = 0
    $('img').remove()
})

document.getElementById('searchBtn').addEventListener('click', helperLog)