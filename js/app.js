var picArray, currentIndex, interval;

$(document).ready(function(){
	console.log('app.js is loaded, and it\'s using jquery');
	$('#submit-form').submit(function(e){
// ko muốn nó tự động refresh the page
	e.preventDefault();
	console.log('form was submitted!');

// javascript la value, con jquery la val().
	var searchTerm = $('#search-box').val();
	if(searchTerm){
		console.log('You type in', searchTerm);
		// this clears the textbox. khi mình search xong thì muốn cái box nó clear
		// cái từ khoá search đi.
		$('#search-box').val('');
		getData(searchTerm);
	}
	else{
		console.log('Please enter something');
	}
});
	$('#stop').click(function(){
		console.log('stop button was clicked');
		clearInterval(interval);
		$('#results').empty();
	})
});

//phần lấy data này là phải dùng Ajax, và dùng json
// link reddit json này là brandi đưa cho vì khó get nó lắm
function getData(searchTerm){
	$.ajax({
		url: 'http://www.reddit.com/search.json',
		method: 'GET',
		data: {
			q: searchTerm, // khi mình search thì trên url nó có ?q=keyword
			nsfw: 'no', // not safe for work
			limit:10 // giới hạn 10 hình thôi
		} // finish phan request
	}).done(function(response){ // gio bat dau lam phan response
		console.log('success', response.data);
		picArray = response.data.children.filter(function(post){
			return post.data.url === 'image';
		})
		// khi done rồi thì clear mọi data để search data mới
		picArray =response.data.children.map(function(post){//map tức là mình loop trên các phần tử array, rồi tuỳ vào việc mình 
			// muốn làm gì đó thì trả về 1 array mới mà ko ảnh hưởng gì tới original array
			// khi mình request thì nó trả mình về children, mình lấy các element trong children
			//ra và xử lí theo ý mình
			return post.data.url; // nó tạo 1 array mới và trả về link url của mấy cái hình này.

		}); //tạo 1 array rỗng để chức pictures, biến đã khai báo đầu file
		currentIndex = 0; // biến đã được khai báo đầu file
		console.log(picArray);

		interval = setInterval(switchPic, 2000); //cứ mỗi 2 giây nó sẽ switch hình một lần
	}).fail(function(err){
		console.log('erro', err);
	});
}

function switchPic(){
	console.log('switching picture!');
	// if we are at the end of the array, start at beginning again
	if(currentIndex >= picArray.length) {
		currentIndex = 0;
	}

	console.log(currentIndex, 'current image is', picArray[currentIndex]);

	// TO DO: Show the picture in the DOM
	var newImg = $('<img src="' + picArray[currentIndex] + '">');
	$('#result').empty().append(newImg);

	currentIndex++;
}