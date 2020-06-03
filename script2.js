console.log("loaded!")
const REDDIT_API = 'https://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 2000
let intervalTime = 3000
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
         
    })
    .catch((err) => {
        console.log("uh oh ", err)
    })
}

const startSlideshow = () => {
    // console.log("start")
    //hide search bar
    document.getElementById("container").style.display = "none"
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

$('#next').on('click', function() {
    let nowImage = $('.active')
    let nextImage = nowImage.next()

    if(nextImage.length){
        nowImage.removeClass('active').css('z-index', -10)
        nextImage.addClass('active').css('z-index', 10)
    }
})

$('#prev').on('click', function() {
    let nowImage = $('.active')
    let prevImage = nowImage.prev()

    if(prevImage.length){
        nowImage.removeClass('active').css('z-index', -10)
        prevImage.addClass('active').css('z-index', 10)
    }
})

document.getElementById('searchBtn').addEventListener('click', helperLog)