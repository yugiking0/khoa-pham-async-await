# 6 cách “trị” Callback hell trong javascript

## I. Callback Hell

## 1. Callback Hell là gì ?

Chắc hẳn những bạn nào quen lập trình Nodejs hay Javascript rồi thì khái niệm Callback không còn xa lạ nữa. Nhưng với người mới như mình thì Callback hell trong javascript luôn là một ám ảnh. Vậy Callback hell là gì? Nó có hay xảy ra khi làm việc với Nodejs không?

Mình phải thừa nhận một điều là mình quyết định học Nodejs chẳng qua bị sếp ép mà thôi. Với xuất phát điểm từ lập trình Java, cho đến lập trình Android nên tư duy xử lý bất đồng bộ của Javascript thực sự làm mình bối rối.

Như mọi người cũng biết, việc xử lý các tác vụ trong Javascript là bất đồng bộ. Tức là các tác vụ sẽ được Javascript đẩy hết một event loop.

Tác vụ nào hoàn thành thì sẽ được bắn sự kiện để thông báo và trả kết quả. Do đó các tác vụ sẽ không được thực hiện theo đúng trình tự như chúng ta nhìn trong code.

Từ đó, chúng ta sử dụng Callback để có thể điều khiển việc thực hiện các tác vụ theo đúng trình tự mong muốn.

Tuy nhiên, nếu lạm dụng Callback mà không được thiết kế cẩn thận sẽ làm cho code của bạn trở lên khó đọc, khó bảo trì.

## 2. Callback Hell trong javascript là gì?

Chắc hẳn bạn đang rất muốn biết bản chất `Callback Hell` trong javascript là gì đúng không?

Thực ra Callback hell trong javascript chỉ là bạn thực hiện quá nhiều Callback lồng nhau. Đại khái, Callback hell sẽ có hình dạng như bên dưới.

```js
getData(function(a){
    getMoreData(a, function(b){
        getMoreData(b, function(c){
            getMoreData(c, function(d){
                getMoreData(d, function(e){
                    ...
                });
            });
        });
    });
});
```

![Callback Hell](./images/hell01.png 'Callback Hell 1')
![Callback Hell](./images/hell02.png 'Callback Hell 2')

![Callback Hell](./images/hell04.png 'Callback Hell 4')
![Callback Hell](./images/hell05.png 'Callback Hell 5')

Nhìn qua đoạn code bạn có thấy khiếp không?

Những người mới bắt đầu học Nodejs thường rất dễ bị lỗi này. Đơn giản vì các bạn chưa có một tư duy thiết kế chuẩn cho kiểu hệ thống hướng sự kiện.

Bài viết này, mình sẽ chia sẻ 5 cách để các bạn hạn chế bị Callback hell trong javascript mà dễ thực hiện nhất.

## II. Các cách xử lý callback hell trong javascript dễ nhất

### 1. Thiết kế ứng dụng theo dạng module

Cũng giống với các ngôn ngữ lập trình khác, một trong những cách để hạn chế sự phức tạp của code là module hóa.

Bất cứ khi nào bạn viết code, đừng cắm cổ vào viết ngay mà hãy dành một chút thời gian để suy nghĩ xem mình viết như này đã tốt nhất chưa.

Bạn đang viết một đoạn code và đoạn code này xuất hiện ở rất nhiều nơi? Hay các phần của đoạn code đó lại đang có vẻ tái sử dụng được… Lúc này bạn hãy mạnh dạn nghĩ tới module hóa nó.

Bạn nên nhớ rằng, Nodejs được như ngày hôm nay là do được xây dựng trên hàng trăm ngàn modules khác nhau. Nodejs sẽ không là gì cả nếu không có các module. Nên việc bạn module mã nguồn của mình là đi đúng hướng với triết lý của Nodejs đấy.

Ví dụ cách viết một module. Bạn tạo một module tên là Test.

```js
//node_modules/test/index.js
module.exports = {
  hello: function (name) {
    console.log('Hello, ' + name);
  },
  bye: function (name) {
    console.log('Goodbye, ' + name);
  },
};
```

Sau đó gọi ở ứng dụng như sau:

```js
var greeter = require('test');
greeter.hello('Monkey');
greeter.bye('Steven');
```

### 2. Nên đặt tên cho callback trong javascript

Bạn hay bắt gặp cách viết callback là các hàm anonymous function. Tức là các hàm không có tên.

Ví dụ một đoạn code sử dụng callback là anonymous function. Và có đến 2 callback lồng nhau.

```js
var fs = require('fs');
var myFile = '/tmp/test';
fs.readFile(myFile, 'utf8', function (err, txt) {
  if (err) return console.log(err);
  txt = txt + '\nAppended something!';
  fs.writeFile(myFile, txt, function (err) {
    if (err) return console.log(err);
    console.log('Appended text!');
  });
});
```

Nhìn vào đoạn code này sẽ khiến bạn mất vài giây để xem callback thực hiện điều gì và được gọi từ đâu.

Để khắc phục điều này, đơn giản bạn thêm một thao tác nhỏ là đặt tên cho callback. Nó sẽ giúp bạn dễ đọc code hơn, đặc biệt khi các callback lồng nhau nhiều hơn.

```js
var fs = require('fs');
var myFile = '/tmp/test';
fs.readFile(myFile, 'utf8', function appendText(err, txt) {
  if (err) return console.log(err);
  txt = txt + '\nAppended something!';
  fs.writeFile(myFile, txt, function notifyUser(err) {
    if (err) return console.log(err);
    console.log('Appended text!');
  });
});
```

Lúc này, bạn chỉ cần lướt qua là biết callback đầu tiên thực hiện việc nối các text lại với nhau. Còn callback thứ 2 là để thông báo cho người người dùng. Việc này giúp bạn tránh được callback hell trong javascript dễ dàng đúng không?

### 3. Định nghĩa hàm trước khi gọi để tránh callback hell trong javascript

Vẫn với ví dụ ở trên, việc bạn đặt tên đã giúp cho code dễ đọc hơn rất nhiều. Nhưng nó vẫn còn khá cồng kềnh.

Bạn thực hiện thêm một bước nữa, đó là tách riêng và định nghĩa các callback riêng ra. Hãy cứ tách hàm khi có thể!

```js
var fs = require('fs');
function notifyUser(err) {
  if (err) return console.log(err);
  console.log('Appended text!');
}
function appendText(err, txt) {
  if (err) return console.log(err);
  txt = txt + '\nAppended something!';
  fs.writeFile(myFile, txt, notifyUser);
}
var myFile = '/tmp/test';
fs.readFile(myFile, 'utf8', appendText);
```

Bạn thế code trên đẹp trai hơn chưa? 🙂

Mặc dù cách viết code đã giải quyết được phần nào vấn đề. Nhưng nó vẫn chưa phải là giải pháp tốt nhất. Nếu bạn đọc lại code mà không nhớ chính xác hàm đó làm gì, bạn sẽ phải trace lại code, mà thường thì code của hàm đó lại trôi tuột ở đâu đó. Rất mất thời gian.

Chúng ta còn có giải pháp tốt hơn, ngay phía bên dưới thôi!

### 4. Sử dụng module Async.js

Đúng với tên gọi của nó, module Async.js sẽ giúp bạn xử lý các hàm bất độ theo cách đồng bộ.

Module này có rất nhiều methods để bạn chọn như series, parallel, waterfall … Vì vậy, bạn nên dành chút thời gian để đọc tài liệu hướng dẫn của tác giả trước khi quyết định chọn method nào.

Async.js thực sự là một thư viện tốt, nhưng nếu lạm dụng quá thì cũng không tốt. Bạn nên nhớ Nodejs là nền tảng được thiết kế cho hệ thống xử lý bất đồng bộ, với ưu điểm xử lý realtime. Nên nếu dự án toàn sử dụng Async.js để xử lý các tác vụ theo kiểu đồng bộ tuần tự là tự đập bỏ điểm mạnh của Nodejs.

Đây là đoạn code sử dụng Async.js cho ví dụ trên:

```js
var fs = require('fs');
var async = require('async');
var myFile = '/tmp/test';
async.waterfall(
  [
    function (callback) {
      fs.readFile(myFile, 'utf8', callback);
    },
    function (txt, callback) {
      txt = txt + '\nAppended something!';
      fs.writeFile(myFile, txt, callback);
    },
  ],
  function (err, result) {
    if (err) return console.log(err);
    console.log('Appended text!');
  }
);
```

Nhìn cũng khá tường minh và dễ hiểu phải không?

### 5. Sử dụng Promises

Mặc dù khái niệm Promies hơi khó hiểu chút khi mới tiếp cận. Nhưng theo mình thì đây là một khái niệm quan trọng mà bạn nên cố hiểu khi học Javascript/Nodejs.

Promises giúp làm giảm số dòng code đáng kể, nó còn giúp mã dễ đọc, dễ bảo trì hơn nhiều.

Quay lại ví dụ ban đầu, nếu sử dụng Promises sẽ như sau:

```js
var Promise = require('bluebird');
var fs = require('fs');
Promise.promisifyAll(fs);
var myFile = '/tmp/test';
fs.readFileAsync(myFile, 'utf8')
  .then(function (txt) {
    txt = txt + '\nAppended something!';
    fs.writeFile(myFile, txt);
  })
  .then(function () {
    console.log('Appended text!');
  })
  .catch(function (err) {
    console.log(err);
  });
```

Nói về Promises thì còn nhiều điều để nói lắm. Ở bài viết này mình sẽ không trình bày sâu về nó(mặc dù rất thích nói về Promises). Hẹn các bạn ở bài viết sau nhé!

### 6. Async/Await nhằm giảm khả năng xảy ra callback hell trong javascript

Kể từ phiên bản ES7, Javascript có một khái niệm mới là Async/Await. Khi sử dụng hàm async, code của bạn sẽ trông giống như đồng bộ như thực chất là bất đồng bộ. Thế mới hay!

Ví dụ đoạn code sau:

```js
async function getUser(id) {
  if (id) {
    return await db.user.byId(id);
  } else {
    throw 'Invalid ID!';
  }
}
try {
  let user = await getUser(123);
} catch (err) {
  console.error(err);
}
```

Ở đoạn code trên, hàm db.user.byId(id) sẽ trả về một Promises, và lẽ ra khi hàm này được sử dụng thì kết quả sẽ trả về trong hàm .then().

Tuy nhiên, với từ khóa await, bạn sẽ lấy trực tiếp kết quả trả về.

> Lưu ý: await chỉ được sử dụng với hàm được khái báo với từ khóa async.

# III. Tạm kết

Như vậy, qua bài viết này bạn đã biết callback hell trong javascript là gì rồi đúng không? Khi viết code thì những sai sót phổ biến như callback hell trong javascript là khó tránh khỏi. Tuy nhiên, hãy hạn chế nó càng nhiều càng tốt.

Chỉ cần bạn cố gắng viết code chậm lại chút, suy nghĩ một chút trước khi viết code. Javascript là một ngôn n gữ “dễ dãi”, đây cũng vừa là ưu điểm và nhược điểm của Javascript.

**_`Hãy là người viết code thông thái!`_**
