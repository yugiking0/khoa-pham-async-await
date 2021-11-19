# Promise status và Promise value

---

- [1. Mô tả](#1-mô-tả)
- [2. Chuẩn bị](#2-chuẩn-bị)
- [3. Tìm hiểu cách hoạt động](#3-tìm-hiểu-cách-hoạt-động)
- [4. Tóm tắt](#4-tóm-tắt)

## 1. Mô tả

- Ở các bài trước ta đã nghiên cứu cách tạo một đối tượng Promise mô phỏng bất đồng bộ, và việc tái sử dụng Đối tượng Promise liên tục trên NodeJS thực thi tại Server.
- Ở bài này ta sẽ dựng một Server NodeJS, và chuyển việc mô phỏng được thực thi trên client ở trang web để tìm hiểu thêm về cách hoạt động Promise liên tục này.

- Việc thực hiện tại client trang web sẽ chia thành 2 giai đoạn:
  - Xử lý chuyển yêu cầu từ client đến Server.
  - Nhận kết quả từ server về client.
- Các trạng thái này sẽ liên quan đến Promise status và Promise value.

## 2. Chuẩn bị

- Bước 1: Server NodeJS, ta có file `server.js`.
- Bước 2: Trang `home.ejs` đơn giản (trong thư mục **`views`**) mô phỏng Promise để nghiên cứu cách hoạt động, ở đây ta sẽ sử dụng luôn function add phép cộng đối tượng Promise mô phỏng bất đồng bộ ở bài trước để sử dụng.

![Cấu trúc](./images/server.png 'Cấu trúc')

![Chuẩn bị](./images/001.png 'Chuẩn bị')

```js
// File server.js
let express = require('express');
let app = express();
app.listen(3000);
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});
```

- Xem [server.js](./server.js)

```html
<!-- home.ejs -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Lập trình Nodejs: Xử lý bất đồng bộ trong Javascript</title>
    <style>
      body {
        height: 100vh;
        background: linear-gradient(to top left, #28b487, #7dd56f);
      }
      h1 {
        text-align: center;
        color: white;
      }
    </style>
    <script type="text/javascript">
      let add = (a, b) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (typeof a != 'number' || typeof b != 'number') {
              return reject(
                new Error('Tham số truyền vào phải là kiểu number!')
              );
            }
            resolve(a + b);
          }, 2000);
        });
      };
    </script>
    <!-- <script src="./script.js"></script> -->
  </head>
  <body>
    <h1>Lập trình Nodejs: Xử lý bất đồng bộ trong Javascript</h1>
    <h2>Promise status và Promise value</h2>
  </body>
</html>
```

- Xem [home.ejs](./views/home.ejs)
- Xem [script.js](./views/script.js) **_(`Không tách được file script.js ra được`)_**, phải để chung script trong file `home.ejs`, ta sẽ thao tác trên

```html
<script type="text/javascript">
  ...
</script>
```

để tìm hiểu về cách hoạt động promise trên client.

```js
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      resolve(a + b);
    }, 1000);
  });
};

add(4, 5).then(
  (res) => console.log(res),
  (err) => console.log(err + '')
);
```

- Bước 3: Ta chạy Terminal file `server.js` lên.

![Terminal run server.js](./images/002.png 'Terminal run server.js')

- Bước 4: Xem trang web client tại địa chỉ là `localhost:3000`

![Trình duyệt](./images/003.png 'Trình duyệt')

## 3. Tìm hiểu cách hoạt động

![promises](./images/promises.png 'promises')

- Sau khi chạy Node server ta kiểm tra ở Devtool trình duyệt thấy:

![Trình duyệt](./images/004.png 'Trình duyệt')

### 3.1 Thao tác 1:

- Ta viết lại xử lý tạo 1 biến a và hiển thị log giá trị a ra.

```js
let a = add(4, 5);
console.log(a);
```

- Ta thấy hiển thị:

![Promise pending](./images/005.png 'Promise Pending')
![Promise pending](./images/006.png 'Promise Pending')

- Để ý ở đây thấy:

  - `Promise {<pending>}` : Đang ở trạng thái Pending
  - `[[Prototype]]: Promise` : Nguyên mẫu là Promise
  - `[[PromiseState]]: "fulfilled"`:
  - `[[PromiseResult]]: 9`: Kết quả trả về là 9, của `Add(4,5)`

- Khi xem kiểm tra các trình duyệt thì mỗi trình duyệt có cách thể hiện khác nhau.

![Chrome](./images/chrome.png 'Chrome')
![Edge](./images/edge.png 'Edge')
![Fire Fox](./images/fire-fox.png 'Fire Fox')

- Ở lần log 1 trạng thái pending đang xử lý. (`<state>: "pending"`), chưa có giá trị => (`<value>: undefined`)
- Lần log 2 trạng thái hoàn thành (`<state>: "fulfilled"`). có giá trị là 9 (`<value>: 9`)
- Khi xem chi tiết ra thì sẽ thể hiện đều ở trạng thái hoàn thành (`<state>: "fulfilled"`) và giá trị là 9 (`<value>: 9`).

### 3.2 Thao tác 2:

- Ta sửa lại tham số truyền vào kiểu text thay vì kiểu số để kiểm tra kết quả.

```js
// Log lần 1
let a = add(4, '5');
console.log(a);
// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 2.1](./images/xuly02-1.png 'Xử lý 2.1')
![Xử lý 2.2](./images/xuly02-2.png 'Xử lý 2.2')

- Lần log 1 trạng thái Pending và chưa có kết quả trả về.
- Cảnh báo lỗi Error
- Lần log 2 trạng thái rejected (`<state>: "rejected"`), giá trị trả về là Error(`<reason>: Error: Tham số truyền vào phải là kiểu number!`)

### 3.3 Thao tác 3:

- Bổ sung thêm .then để xử lý kết quả thực thi hoặc báo lỗi.

```js
// Log lần 1
let a = add(4, 5).then(
  (result) => console.log(result),
  (err) => console.log(err + '')
);
console.log(a);
// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 3.1](./images/xuly03-1.png 'Xử lý 3.1')

- Lần log 1 : Trạng thái xử lý pending
- Sau đó thể hiện kết quả ở câu lệnh `console.log(a);` là 9.
- Lần log 2: Trạng thái xử lý `fulfilled`, nhưng value vẫn là _**undefined**_ (`<value>: undefined`)
- Nguyên nhân do result xử lý resolve trả về là console.log('a') không xác định nên sẽ không có giá trị.
- Và lần console.log của a không hiểu giá trị trả về nên thể hiện undefined.
- Để làm rõ hơn giá trị trả về lần log 2, ta điều chỉnh lại:

```js
// Log lần 1
let a = add(4, 5).then(
  (result) => 'Kết quả: ' + result,
  (err) => console.log(err + '')
);
console.log(a);
// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 3.2](./images/xuly03-2.png 'Xử lý 3.2')

- Lúc này lần log 2 đã thể hiện giá trị Value là `<value>: "Kết quả: 9"`; như vậy lần log 2 sẽ căn cứ vào giá trị trả về của .then resolve trả về mà không phải dựa trên kết quả của add(4,5) là 9.

- Ta thay đổi lại tham số truyền vào kiểu text để xuất hiện lỗi và thay đổi reject để tìm hiểu giá trị log lần 2.

```js
// Log lần 1
let a = add(4, '5').then(
  (result) => 'Kết quả: ' + result,
  (err) => 'Lỗi: ' + err + ''
);
console.log(a);
// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 3.3](./images/xuly03-3.png 'Xử lý 3.3')

- Khi này giá trị trả về của lần Log 2 là `<value>: "Lỗi: Error: Tham số truyền vào phải là kiểu number!"`, mặc dù ở xử lý add(4,'5') đã xuất hiện lỗi, nhưng vẫn lấy giá trị trả về lỗi này gán cho giá trị a.
- Như vậy giá trị a được trả về sẽ căn cứ việc có thực hiện hay bị lỗi, và giá trị trả về sẽ được gán cho a; ngoài ra ta sẽ thấy trạng thái mặc dù xuất hiện lỗi ở Log 1 nhưng ở lần Log 2 vẫn thể hiện `<state>: "fulfilled"` hoàn thành xử lý gán cho a.

- Câu lệnh .then trả về kết quả là handle function trả về resolve hoặc reject.
- Câu lệnh .then sẽ có 2 giai đoạn trả về là :
  - Trạng thái Pending
  - Trả về một đối tượng Promise trong trạng thái fulfilled cho dù việc xử lý có vào handle kết quả result hoặc bị lỗi error; giá trị sẽ là giá trị của handle được return ra (resolve hay reject error)
- Mặc dù khi xử lý gặp lỗi reject error (`add(4,'5')`) rơi vào `(err) => 'Lỗi: ' + err + ''`, nhưng trạng thái trả về vẫn là _**fulfilled**_ bởi vì khi xảy ra lỗi thì ta có function xử lý lỗi, và sau khi xử lý lỗi thì sẽ báo việc xử lý lỗi đã được hoàn thành là _**fulfilled**_
- Nếu ta bỏ đoạn xử lý khi xuất hiện lỗi thì sẽ thấy trạng thái Log lần 2 sẽ báo reject chưa được xử lý như sau:

```js
// Log lần 1
let a = add(4, '5');
console.log(a);
// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 3.4](./images/xuly03-4.png 'Xử lý 3.4')

- Trạng thái `<state>: "rejected"` bị từ chối chưa được xử lý lỗi.
- Nếu có xử lý .then thì:

![Xử lý 3.3](./images/xuly03-3.png 'Xử lý 3.3')

### 3.4 Thao tác 4:

- Sau khi tìm hiểu ở câu lệnh .then sẽ trả về đối tượng Promise nên ta có thể bổ sung thêm 1 câu lệnh .then tiếp theo nữa.

```js
// Log lần 1
let a = add(4, '5')
  .then(
    (result) => 'Kết quả: ' + result,
    (err) => 'Lỗi: ' + err + ''
  )
  .then(() => console.log('Thành công rồi!'));

console.log(a);

// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 4.1](./images/xuly04-1.png 'Xử lý 4.1')

- Như vậy sau khi thêm .then thứ 2 vẫn có hiệu lực, và kết quả của .then 2 này sẽ ảnh hưởng đến a và làm cho Log lần 2 value trở thành undefined.
- Như vậy ta có thể áp dụng Promise liên tục ở đây để thực hiện nhiều Promise trả về kết quả.
- Ta thử điều chỉnh câu lệnh lại như sau, return kết quả resolve và thêm tham số ở .then thứ 2.

```js
// Log lần 1
// Log lần 1
let a = add(4, 5)
  .then(
    (result) => {
      console.log('.then thứ nhất: ' + result);
      return 'Kết quả: ' + result;
    },
    (err) => 'Lỗi: ' + err + ''
  )
  .then((b) => console.log('Thành công rồi!' + b));

console.log(a);

// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 4.2](./images/xuly04-2.png 'Xử lý 4.2')

- Như vậy tham số b của .then thứ 2 sẽ là kết quả return ở resolve của .then thứ 1, việc value undefined là do .then thứ 2 trả về console.log làm cho giá trị a không xác định.

- Ta điều chỉnh xuất hiện lỗi để nhảy vào reject của .then thứ 1 để kiểm tra kết quả như sau:

```js
// Log lần 1
let a = add(4, '5')
  .then(
    (result) => {
      console.log('.then thứ nhất: ' + result);
      return 'Kết quả: ' + result;
    },
    (err) => {
      console.log(err + '');
      return 'Bị lỗi.';
    }
  )
  .then((b) => console.log('Thành công rồi!' + b));

console.log(a);

// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 4.3](./images/xuly04-3.png 'Xử lý 4.3')

- Ta đã thấy được thứ tự câu lệnh .then liên tiếp trong một Promise và sự thừa hưởng giá trị return trả về có thể được sử dụng tiếp bằng tham số truyền vào câu lệnh .then kế tiếp, dù cho .then đầu tiên có resolve hay reject thì return handle sẽ được sử dụng làm tham số của câu lệnh .then thứ 2.

- Ta điều chỉnh lại ở .then 2 ta trả return về giá trị để gán cho a thì kết quả hiển thị log lần 2 sẽ là:

```js
// Log lần 1
let a = add(4, '5')
  .then(
    (result) => {
      console.log('.then thứ nhất: ' + result);
      return 'Kết quả: ' + result;
    },
    (err) => {
      console.log(err + '');
      return 'Bị lỗi.';
    }
  )
  .then((b) => 'Then thứ 2 - ' + b);

console.log(a);

// Log lần 2 sau 2500ms
setTimeout(() => {
  console.log(a);
}, 2500);
```

![Xử lý 4.4](./images/xuly04-4.png 'Xử lý 4.4')

- Lúc này ta thấy a đã được gán giá trị do câu lệnh .then thứ 2 được return trả về.

## 4. Tóm tắt

- Khi xử lý Promise ở client sẽ có 2 trường hợp trả về:
  - Trạng thái Pending: Đang bắt đầu xử lý.
  - Sau đó nếu có xử lý .then, với trường hợp này sẽ trả về một đối tượng Promise.
- Đối tượng Promise trả về khi xử lý .then sẽ có:
  - Trạng thái trả về là Fulfilled(Dù có resolve hoặc reject)
  - Giá trị sẽ dựa trên handle function được return ra(Dù cho resolve trả về kết quả result hoặc bị từ chối reject báo lỗi Error), kết quả return từ handle function(result=>result, error=>error).
  - Sau khi có được giá trị trả về từ handle return ở .then trước đó, thì sẽ được tái sử dụng làm tham số truyền vào ở .then tiếp theo.
- Có thể tận dụng tính liên tục của Promise này để xử lý khi gọi Promise như việc tính diện tích hình thang đã học ở các bài trước đó và làm phẳng được xử lý callback hell.

---
