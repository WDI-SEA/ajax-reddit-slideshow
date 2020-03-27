
const REDDIT_API = 'https://www.reddit.com/search.json?nsfw=no&q='
const INTERVAL_DELAY = 1000
const intervalTime = 3000
let currentImages = []
let currentIndex = 0
let interval = 0

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
        currentImages = results
        startSlideshow()
        currentImages.forEach( () => {
            displayCurrent()
             currentIndex++
         })
        interval = setInterval(imageloop, 3000)
    })
    .catch((err) => {
        console.log("uh oh ", err)
    })
}

const startSlideshow = () => {
    document.getElementById("container").style.visibility = 'hidden'
    document.getElementById("slideshow").style.visibility = 'visible'
}

const displayCurrent = () => {
    document.getElementById('results').innerHTML = ''
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    if (currentIndex > 0) {
        document.getElementById('results').append(img)
        console.log("here is image")
    } else {
         img.classList.add('active')
         console.log("here is first image")
        document.getElementById('results').append(img)
    }

}
const imageloop = () => {
    currentIndex += 1
    if (currentIndex >= currentImages.length) {
        currentIndex = 0
    }
    displayCurrent()
}

document.getElementById('stopBtn').addEventListener('click', function(){
    document.getElementById("container").style.visibility = "visible"
    document.getElementById("slideshow").style.visibility = 'hidden'
    currentImages = []
    currentIndex = 0
    $('img').remove()
    clearInterval(interval)
})

document.getElementById('searchBtn').addEventListener('click', helperLog)