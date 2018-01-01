$("#query") = query;

//so the form doesn't reload the page
function search(event) {
    event.preventDefault();
    var searchQuery = $("#query").val() || "babies";

    $.get("https://www.reddit.com/search.json")

}