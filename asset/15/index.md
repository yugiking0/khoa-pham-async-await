# async await

---

- [1. Nhắc lại cách dùng Node CO](#1-nhắc-lại-cách-dùng-node-co)
- [2. Sử dụng Async Await](#2-sử-dụng-async-await)
- [3. Tìm hiểu Async Await](#3-tìm-hiểu-async-await)
- [4. bài tập](#4-bài-tập)

---

## 1. Nhắc lại cách dùng Node CO

- Ta sử dụng thư viện `Node co` để thực hiện một nhóm các câu lệnh `Promise`
- Có thể dùng bằng 2 cách làm hàm xử lý, hoặc viết lại một hàm mới và truyền biến vào.
- Xem ví dụ:

```js
const fs = require('fs');

let readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

readFile('../docs/song1.txt')
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//! Sử dụng Node co
const co = require('co');
var arrFiles = ['../docs/test1.txt', '../docs/test2.txt', '../docs/test3.txt'];

//Cách 1

var testList = co(function* () {
  // Sử dụng mảng arrFiles đã khai báo trước đó mà không truyền vào Function
  var values = yield arrFiles.map((item) => {
    return readFile(item);
  });
  return values;
})
  .then((res) => res)
  .catch((err) => console.log(err));

setTimeout(() => {
  console.log(testList);
}, 1000);

//Cách 2: Sử dụng như Function có tham số urls

let readFilesCo = co.wrap(function* (urls) {
  return yield urls.map((url) => {
    return readFile(url);
  });
});

var listSongs = readFilesCo(['../docs/song1.txt', '../docs/song2.txt'])
  .then((res) => res)
  .catch((err) => console.log(err));
console.log(listSongs);

setTimeout(() => {
  console.log(listSongs);
}, 1000);
```

- Xem chi tiết hơn ở [node co](../43/index.md)

## 2. Sử dụng Async Await

- `Async-await` là hàm chuẩn có sẵn trong thư viện `NodeJS` từ version 7, nên không cần cài đặt như `Node co`
- Cách dùng `Async-await` tương tự như `Node co`.
- Áp dụng thực hiện đọc file bất đồng bộ `Promise` thực hiện nhiều câu lệnh `Promise` như sau:

```js
const fs = require('fs');

let readFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

// Khai báo hàm Async
async function run() {
  var value1 = await readFile('../docs/test1.txt');
  var value2 = await readFile('../docs/test2.txt');
  var value3 = await readFile('../docs/test3.txt');
  return [value1, value2, value3];
}

// Thực thi
run()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

- Hoặc viết kiểu:

```js
const fs = require('fs');

let readFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

// Khai báo hàm Async
async function run(urls) {
  var values = await urls.map((url) => {
    return readFile(url);
  });
  return values;
}
var listSongs = ['../docs/test1.txt', '../docs/test2.txt', '../docs/test3.txt'];
// Thực thi
var Files = run(listSongs)
  .then((data) => data)
  .catch((err) => console.log(err));

setTimeout(() => {
  console.log('Data: ', Files);
}, 1000);
```

## 3. Tìm hiểu Async Await

- Cấu trúc:
  - Khai báo:
    > async function [Name-Function]{
    > await [promise]
    > }
  - Thực thi:
    > [Name-Function]

### 3.1 Khai báo đơn giản

- So sánh với hàm bình thường
- Xét ví dụ sau:

```js
// Function Basic
function logString(str) {
  return console.log('Basic: ', str);
}
// Async Function
async function aShowString(str) {
  return str;
}

logString('Begin');
aShowString('Begin Async').then((res) => console.log('Async: ', res));
logString('Hello');
logString('Xin chao');

aShowString('Hello').then((res) => console.log('Async: ', res));
aShowString('Xin chao').then((res) => console.log('Async: ', res));
logString('End');
aShowString('End Async').then((res) => console.log('Async: ', res));
```

![Console](./image/001.png 'Console')

- Xem ví dụ [Async Await](./syntax.js)
- Chuyển từ một giá trị từ một Function thường sang một Promise.

### 3.2 So sánh với Node co

- Ở đây có khác cách dùng `Node co` là :
  - Có thêm tiền tố `async` khi khai báo function khác với khai báo function `Node co`
    > co.wrap(function\* (urls)
  - Khi gọi một đối tượng Promise thì thay `yield` bằng `await`

```js
// Node co
co.wrap(function* (urls) {
  return yield urls.map((url) => {
    return readFile(url);
  });
});

// Async await
async function run(urls) {
  var values = await urls.map((url) => {
    return readFile(url);
  });
  return values;
}
```

## 4. bài tập

### 4.1 Bài 1

```js
var fs = require('fs');
var axios = require('axios');

fs.readFile('./data.json', { encoding: 'utf8' }, function (err, data) {
  console.log('Data loaded from disk', data);

  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(function (res) {
      console.log('Data downloaded from url', res.data);
    });
});

/**
 * Sử dụng async await kết hợp với Promise để viết lại đoạn code trên. Gợi ý: Viết lại 1 async function làm 2 việc trên và chạy thử
 */
```

- Giải bài tập [Bài 1](./bai1.js)

```js
var fs = require('fs');
var axios = require('axios');

/**
 * Sử dụng async await kết hợp với Promise để viết lại đoạn code trên. Gợi ý: Viết lại 1 async function làm 2 việc trên và chạy thử
 */

async function load(file, url) {
  // 1. Read file JSON
  var data1 = await new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, res) => {
      if (err) return reject(err);
      return resolve('Data loaded from disk: ' + res);
    });
  }).then(
    (data) => data,
    (err) => console.log(err + '')
  );
  console.log('Data loaded from disk', data1);

  // 2. Get data url
  var data2 = await new Promise((resolve, reject) => {
    return axios
      .get(url)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  }).then(
    (data) => data,
    (err) => console.log(err + '')
  );
  console.log('Data downloaded from url', data2);
}

load('./data.json', 'https://jsonplaceholder.typicode.com/todo2s/1').catch(
  (err) => console.log(err + '')
);
```

### 4.2 Bài 2

```js
const axios = require('axios');

// Giải thích điểm khác nhau giữa 1 và 2:
// 1.
async function fetchUrls(urls) {
  const results = [];
  for (const url of urls) {
    const res = await axios.get(url);
    results.push(res);
  }
  return results;
}

// 2.
async function fetchUrlsParallel(urls) {
  const results = await Promise.all(
    urls.map(function (url) {
      return axios.get(url);
    })
  );
  return results;
}

// Chạy thử 2 hàm trên với đầu vào dưới đây và so sánh tốc độ
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
];

fetchUrls(urls).then(() => console.log('Done'));
fetchUrlsParallel(urls).then(() => console.log('Done 2'));
```

- Giải bài tập [Bài 2](./bai2.js)

```js
const axios = require('axios');

// Giải thích điểm khác nhau giữa 1 và 2:
async function fetchUrls(urls) {
  const results = [];
  for (const url of urls) {
    const res = await axios.get(url);
    results.push(res);
  }
  return results;
}

// 2. Xử lý Promise ban đầu cho cả mảng xem việc thực thi có thành công hay không
async function fetchUrlsParallel(urls) {
  const results = await Promise.all(
    urls.map(function (url) {
      return axios.get(url);
    })
  );
  return results;
}

// Chạy thử 2 hàm trên với đầu vào dưới đây và so sánh tốc độ
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
];

fetchUrls(urls)
  .then(() => console.log('Done'))
  .catch((err) => console.log('Error1'));
fetchUrlsParallel(urls)
  .then(() => console.log('Done 2'))
  .catch((err) => console.log('Error2'));

//----------------------------
// Done 2
// Done
//----------------------------

/*
1. Giải thích điểm khác nhau giữa 1 và 2:
fetchUrls: 
    + Duyệt qua 1 mảng thực hiện chạy Promise từng phần tử lấy kết quả đẩy vào mảng mới, việc thực thi theo trình tự index của mảng để thực hiện => Đẩy dữ liệu push vào mảng mới.
fetchUrlsParallel:
    + Chỉ 1 lần Promise.all thực hiện 1 lúc nhiều câu lệnh với các phần tử của mảng, xem như 1 lần chờ xử lý bất đồng bộ.

2. Chạy thử 2 hàm trên với đầu vào dưới đây và so sánh tốc độ
 - Tốc độ fetchUrlsParallel nhanh hơn so với fetchUrls.
 - Vì Done2 chỉ chờ 1 lần Promise, còn Done1 phải chờ n lần phần tử bất đồng bộ xử lý.
*/
```

---
