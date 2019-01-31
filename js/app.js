var display = document.getElementById('display-box')
var input = document.getElementById('search-input')
var submit = document.getElementById('submit')
var reset = document.getElementById('reset')
var interval;




function submitButton(e) {
    e.preventDefault()
    let url = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    getResults(url)
}
submit.addEventListener('click', submitButton)


function getResults(url) {
    let filetypes = ['.jpg','.jpeg','.gif', '.png']
    console.log(input.value)
    fetch(url)
    .then(reply => {
        return reply.json()
    })
    // get all the urls
    .then(reply => {
        let urls = []
        reply.data.children.forEach(child => {
            urls.push(child.data.url)
        })
        console.log('urls:', urls)
        return urls
    // checking which ones are images
    }).then(urls => {
        return urls.filter(url => {
            let isImage = false;
            let i = 0;
            while (!isImage && i < filetypes.length) {
                if (url.includes(filetypes[i])) {
                    isImage = true;
                    if (url.includes('.gifv')) {
                        isImage = false;
                    }
                }
                i++
            }
            return isImage
            })
    }
    // makes imgs and assigns source
    ).then(urls => {
        console.log(urls.length)
        counter = 0;
        interval = setInterval(function(){
            if (counter < urls.length -1) {
                console.log("link", urls[counter])
                display.style.backgroundImage = 'url(' + urls[counter] + ')'
                counter++
            } else {
                display.style.backgroundImage = 'url(' + urls[counter] + ')'
                counter = 0;
            }
            
        }, 2000);

    })
}

reset.addEventListener('click', function(e) {
    e.preventDefault()
    window.clearInterval(interval)
    display.style.backgroundImage = ''
})