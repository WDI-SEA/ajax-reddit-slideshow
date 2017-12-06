
const RADIUS = 200;
// const COUNTER_LIMIT = 10;
var wheelTotal =0;

//$(function() {

   var imgList = [];
   var imgWheel = [];
   var counter = 0;
   var wheelCounter =0;

   function incWheelCounter() {
      wheelCounter++;
      if (wheelCounter > wheelTotal) {
         wheelCounter =0;
      }
      return "#wheel"+wheelCounter+" img";
   }

   function animateWheel() {
      for (var i=0; i<wheelTotal; i++) {

      }
   }

   function setImageWheel(url) {
      console.log(url);
      if (!url) {
         return 0;
      }
      var dest = incWheelCounter();
      //imgWheel[counter] = url;
      $(dest).attr("src",url).attr("width","200px").attr("height","200px");
   }

   //-- add a new image form imgList into wheel
   function turnWheel() {

      if(imgList.length>0) {
         setImageWheel(imgList[counter]);
         counter++;
      }
      //wheelCounter++;

      //animate
      animateWheel();
   }

   function getQuery(word) {
      $.get("https://www.reddit.com/search.json", {
        q: word,
        nsfw: "no",
        limit:10
      }).done( function(data) {
         console.log(data);

         imgList = [];

         for(var i=0; i<data.data.children.length; i++) {
            if (data.data.children[i].data.preview && data.data.children[i].data.preview.images) {
               imgList.push(data.data.children[i].data.preview.images[0].source.url);
            }
         }

         turnWheel();

         //addSearchResult(data.data.children);
      });
   }

   function init() {
      $("#redditForm").submit( function(e) {
         e.preventDefault();
         getQuery($("#redditForm").val());
         $("#redditForm label input").val("");
      });

      setInterval(turnWheel, 500);

      wheelTotal = $(".wheel-img").length;
   }


   init();
//});
