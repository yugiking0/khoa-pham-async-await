# Promise.all

---

## 1. Nội dung

- Hướng dẫn dùng Promise.all để xử lý song song nhiều tác vụ
- Thực hiện việc Promise nhiều câu lệnh trở nên ngắn gọn và dể kiểm soát hơn.

## 2. Ví dụ

- Ở bài trước việc đọc nhiều file thực hiện Promise sẽ là:

```js
//todo: Promise basic
var fs = require('fs');

let readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

//! Đọc lần lượt từng file
readFilePromise('../docs/test1.txt')
  .then((test1) => {
    console.log(test1);
    return readFilePromise('../docs/test2.txt');
  })
  .then((test2) => {
    console.log(test2);
    return readFilePromise('../docs/test3.txt');
  })
  .then((test3) => console.log(test3))
  .catch((err) => console.log(err + ''));
```

- Ta có thể viết ngắn gọn lại thành

```js
let onDone = (data) => console.log(data);
let onError = (error) => console.log(error + '');

// Viết ngắn gọn lại
var fs = require('fs');

let readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

readFilePromise('../docs/test1.txt')
  .then(onDone)
  .then(() => readFilePromise('../docs/test2.txt'))
  .then(onDone)
  .then(() => readFilePromise('../docs/test3.txt'))
  .then(onDone)
  .catch(onError);
```

- Xem [readFile Promise](./promise.js)

## 3. Promise all

- Giúp rút gọn câu lệnh xử lý lại, khi thực hiện cùng 1 lúc nhiều Promise
- Tham số truyền vào là 1 mảng các promise (arrPromise[])
  - Nếu tất cả resolve thì sẽ trả về 1 mảng .then(arrValues[])
  - Nếu một trong các xử lý bị reject xuất hiện lỗi thì có thể dùng .catch để bắt lỗi.
- Ta viết lại bài trên thành:

```js
var fs = require('fs');
let readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

Promise.all([
  readFilePromise('../docs/test1.txt'),
  readFilePromise('../docs/test2.txt'),
  readFilePromise('../docs/test3.txt'),
])
  .then((arr) => console.log(arr))
  .catch((err) => console.log(err + ''));
```

![Promise all](./images/001.png 'Promise all')

- Khi xảy ra lỗi thì:

![Promise all Error](./images/002.png 'Promise all Error')

## 4. Bài tập

```
/**
 * Sử dụng Promise.all + axios để tải về 3 đường link sau cùng lúc và hiển thị ra kết quả:
 * https://jsonplaceholder.typicode.com/todos/1
 * https://jsonplaceholder.typicode.com/todos/2
 * https://jsonplaceholder.typicode.com/todos/3
 */
```

- Xem [Cách làm cũ trước đó](./baitap-older.js)

- Ta xử lý bài tập trên như sau:

```js
const axios = require('axios');

let axiosPromise = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .get(path)
      .then((response) => resolve(response.data))
      .catch((error) => reject('Lỗi link: ' + error.config.url));
  });
};

let newArr = Promise.all([
  axiosPromise('https://jsonplaceholder.typicode.com/todos/1'),
  axiosPromise('https://jsonplaceholder.typicode.com/todos/2'),
  axiosPromise('https://jsonplaceholder.typicode.com/todos/3'),
])
  .then((arr) => arr)
  .catch((error) => error);

console.log(newArr); // <pending>

setTimeout(() => {
  console.log(newArr);
}, 2000);
```

![Promise all Axios](./images/004.png 'Promise all Axios')

- Khi xảy ra lỗi vì sai link:

```js
let newArr = Promise.all([
  axiosPromise('https://jsonplaceholder.typicode.com/todos/1'),
  axiosPromise('https://jsonplaceholder.typicode.com/todos/222222'),
  axiosPromise('https://jsonplaceholder.typicode.com/todos/3'),
])
  .then((arr) => arr)
  .catch((error) => error);

console.log(newArr); // <pending>

setTimeout(() => {
  console.log(newArr);
}, 2000);
```

![Promise all Axios Error](./images/005.png 'Promise all Axios Error')

- Xem [Giải bài tập](./baitap.js)

---
