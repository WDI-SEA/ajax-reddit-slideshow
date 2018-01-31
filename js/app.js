var myInterval = null;

function searchReddit(e) {
    e.preventDefault();
    $("#picViewer").attr("src", "");
    $("header").toggle("fade", 500);
    search = document.forms["searchBox"].elements["search"].value;
    $.get('https://www.reddit.com/search.json', {
        q: search,
        nsfw: "no"
    }).done(function(data) {
        extractImages(data);
        $("#picViewer").toggle("fade", 500);
        $("#stop").toggle("fade", 500);
    });
}

function extractImages(results) {
    var posts = results.data.children;
    var urls = [];
    // console.log(posts);
    posts.forEach(function(post){
        if(post.data.url.endsWith(".jpg") ||
        post.data.url.endsWith(".png") ||
        post.data.url.endsWith(".gif")) {
            urls.push(post.data.url);
        } else if (post.data.url.endsWith(".gifv")) {
            urls.push(post.data.url.slice(0, -1));
        } else if (post.data.media !== null && post.data.media.oembed) {
            urls.push(post.data.media.oembed.thumbnail_url);
        } else if (post.data.preview.images[0].source.url) {
            urls.push(post.data.preview.images[0].source.url);
        } else if (post.data.thumbnail) {
            urls.push(post.data.thumbnail);
        }
    });
    showSlides(urls);
}

function showSlides(urls) {
    var i = 23;
    $("#picViewer").attr("src", urls[i]);
    i++;
    myInterval = setInterval(function() {
        if(i < urls.length) {
            $("#picViewer").attr("src", urls[i]);
            i++;
        } else {
            stopShow();
        }
    }, 3000);
}

function stopShow() {
    $("#picViewer").toggle("fade", 1000);
    $("#stop").toggle("fade", 1000);
    $("h1").text("Watch a different Reddit search?");
    $("h2").text("");
    $("input[name='search']").val("");
    $("header").toggle("fade", 1000);
    document.forms["searchBox"].elements["search"].focus();
    clearInterval(myInterval);
}

$(document).ready(function() {
    $("#stop").click(stopShow);
    document.forms["searchBox"].addEventListener("submit", searchReddit);
    document.forms["searchBox"].elements["search"].focus();
});