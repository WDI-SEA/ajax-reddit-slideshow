$( document ).ready(function() {

$.get('https://www.reddit.com/search.json', {
  q: 'kittens'
}).done(function(data) {
  console.log(data);
});



  var newSearch = $('input').val();

//Highlight input field on click
  $("input").focus(function(){
    $(this).addClass("outlineClick");
  });
  //Clear input field on click
  $("input").focus(function() {
    if ($(this).val() == "Add an Item") {
      $(this).val('');
    }
  });
  //Reset dummy input if focus is lost
$("input").blur(function() {
  if ($(this).val()=="") {
    $(this).val("Add an Item");
  }
});




});
