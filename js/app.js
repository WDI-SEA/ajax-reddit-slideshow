
const RADIUS = 400;
// const COUNTER_LIMIT = 10;
var spot = [];
var wheelTotal =0;
var offset =0;

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
         let dest = "#wheel"+i;
         // console.log(dest);
         //$(dest).offset({top: spot[i].y, left: spot[i].x });
         var j=i+offset;
         if (j>wheelTotal-1) {
            j=i+offset-wheelTotal;
         }

         $(dest).animate({
            top:spot[j].y+"px",
            left:spot[j].x+"px"
         },500,"swing");
         $(dest+" img").animate({
            width: 200*spot[j].size,
            height: 200*spot[j].size
         },500,"swing");
      }

      offset++;
      if (offset > wheelTotal) {
         offset=0;
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
         if (counter>imgList.length) {
            counter=0;
            imgList = [];
         }
      }
      //wheelCounter++;

      //animate
      animateWheel();
   }

   // function getQuery(word) {
   //    $.getJSON("https://www.reddit.com/search.json", {
   //      q: word,
   //      limit:10
   //    }).done( function(data) {
   //       console.log(data);
   //
   //       imgList = [];
   //       var redditList = data.data.children;
   //
   //       for(var i=0; i<redditList.length; i++) {
   //          if (redditList[i].data.preview && redditList[i].data.preview.images) {
   //             imgList.push(redditList[i].data.preview.images[0].source.url);
   //          }
   //       }
   //       console.log("imglist ",imgList);
   //       turnWheel();
   //
   //       //addSearchResult(data.data.children);
   //    });
   // }

   function getQuery(word) {
      $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+word+"&lang=en-us&format=json&jsoncallback=?").done( function(data) {
         console.log(data);

         imgList = [];

         for(var i=0; i<data.items.length; i++) {
            if (data.items[i] && i<wheelTotal) {
               imgList.push(data.items[i].media.m);
            }
         }
         // console.log("imglist ",imgList);
         turnWheel();

         //addSearchResult(data.data.children);
      });
   }

   function init() {
      $("#redditForm").submit( function(e) {
         e.preventDefault();

         getQuery($("#redditInput").val());
         $("#redditForm label input").val("");
      });

      setInterval(turnWheel, 2000);

      wheelTotal = $(".wheel-img").length;

      let x=0, y=0;
      let x0=$("#redditForm").offset().left+100, y0= $("#redditForm").offset().top-200;
      let thetaInc = 2*Math.PI/wheelTotal;
      let theta =0;
      let sz=1.0;

      for (var i=0; i<wheelTotal; i++) {
         x = x0 + RADIUS*Math.cos(theta-Math.PI/2);
         y = y0 - RADIUS*Math.sin(theta-Math.PI/2);
         if (y0<y) {
            sz=y0/y;
         }
         console.log(sz);
         spot.push({
            x: x,
            y: y,
            size: sz
         });
         theta = theta+thetaInc;

         $("#wheel"+i).offset({top: spot[i].y+"px", left: spot[i].x+"px" });
      }
      console.log(spot);
   }


   init();
//});
