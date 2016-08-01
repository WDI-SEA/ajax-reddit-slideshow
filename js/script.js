var searchWord = $('#searchTerm');
var button = $('#btn');


button.on('click' ,function(){
  if(!searchWord){
    //jQuery function to inform user to enter text
  }else{
  console.log(searchWord.val());
}
});
