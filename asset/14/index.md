# node co

---

- [1. Xử lý đọc 3 file theo thứ tự bất đồng bộ bằng Promise](#1-xử-lý-đọc-3-file-theo-thứ-tự-bất-đồng-bộ-bằng-promise)
- [2. Sử dụng Node Co xử lý nhiều Promise theo thứ tự đồng bộ](#2-sử-dụng-node-co-xử-lý-nhiều-promise-theo-thứ-tự-đồng-bộ)
- [3. Sử dụng Node Co như một hàm truyền tham số vào.](#3-sử-dụng-node-co-như-một-hàm-truyền-tham-số-vào)
- [4. Tổng kết](#4-tổng-kết)
- [5. Bài tập](#5-bài-tập)

---

## 1. Xử lý đọc 3 file theo thứ tự bất đồng bộ bằng Promise

- Ở bài trước ta đã học đọc 3 file bằng Promise + fs.readFile liên tục như sau:

```js
const fs = require('fs');

let readPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(new Error(error));
      return resolve(data);
    });
  });
};

readPromise('./song1.txt').then(
  (data) => console.log(data),
  (err) => console.log(err)
);

readPromise('./song2.txt').then(
  (data) => console.log(data),
  (err) => console.log(err)
);

readPromise('./song3.txt').then(
  (data) => console.log(data),
  (err) => console.log(err)
);
```

- Hay đọc liên tục kiểu:

```js
const fs = require('fs');

let readPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(new Error(error));
      return resolve(data);
    });
  });
};

readPromise('./song1.txt')
  .then((data1) => {
    console.log(data1);
    return readPromise('./song2.txt');
  })
  .then((data2) => {
    console.log(data2);
    return readPromise('./song3.txt');
  })
  .then((data3) => {
    console.log(data3);
    return readPromise('./song3.txt');
  })
  .catch((err) => console.log(err));
```

- Hoặc sử dụng Promise.all như sau:

```js
const fs = require('fs');

let readPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(err);
      return resolve(data);
    });
  });
};

Promise.all([
  readPromise('./song1.txt'),
  readPromise('./song2.txt'),
  readPromise('./song3.txt'),
])
  .then((arr) => readEach(arr)) // .then((arr) => console.log(arr))
  .catch((err) => console.log(err + ''));

let readEach = (arr) => {
  arr.forEach((item) => {
    console.log(item);
  });
};
```

## 2. Sử dụng Node Co xử lý nhiều Promise theo thứ tự đồng bộ

- Sử dụng Node co để đọc theo thứ tự các file đồng bộ trong xử lý bất đồng bộ.
- Có thể xử lý như sau:

  - B1: cần cài đặt thư viện Node co ở bên ngoài
    > **npm install co**
  - B2: Cấu trúc của Node `co Module` như sau:

    ```js
    const co = require('co');

    var fn = co(function *(){(val) {
      return yield Promise.resolve(val);
    });

    // prettier-ignore
    fn(true).then(function (val) {

    });
    ```

    - Trong đó:
      - `co(function*())` : Phải có dấu \* ở đây được gọi là **`Generator Function`**.
      - keyword `yield` : Từ khóa `yield` có khả năng gọi **`Promise`**.

  - B3: Ta viết lại như sau:

```js
const fs = require('fs');
const co = require('co');

let readPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

co(function* () {
  return yield readPromise('./song1.txt');
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err + ''));
```

- Hoặc ta viết liên tục xử lý nhiều Promise trong khối Block lệnh `Co` như sau:

```js
co(function* () {
  var song1 = yield readPromise('./song1.txt');
  var song2 = yield readPromise('./song2.txt');
  var song3 = yield readPromise('./song3.txt');
  console.log(song1, song2, song3);
});
```

- Hoặc

```js
var arr = co(function* () {
  var song1 = yield readPromise('./song2.txt');
  var song2 = yield readPromise('./song1.txt');
  var song3 = yield readPromise('./song3.txt');
  return [song1, song2, song3];
})
  .then((data) => data)
  .catch((err) => console.log(err + ''));

setTimeout(() => {
  console.log(arr);
}, 2000);
```

- Không truyền tham số vào xử lý được chỗ này, muốn xử lý tham số truyền vào phải dùng qua `co.wrap`.

```js
// Không truyền tham số vào đây được.
var str = 'Hello!';

co(function* (str) {
  console.log(str); // undefined : Không hiểu
  var files = ['./song1.txt'];
  var values = yield files.map((item) => {
    return readPromise(item);
  });
  return values;
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err + ''));
```

## 3. Sử dụng Node Co như một hàm truyền tham số vào.

- Ta có thể xử lý `yield` là 1 mảng như sau:

```js
co(function* () {
  var values = yield [
    readPromise('./song2.txt'),
    readPromise('./song1.txt'),
    readPromise('./song3.txt'),
  ];
  return values;
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err + ''));
```

```js
var arr = co(function* () {
  var values = yield [
    readPromise('./song2.txt'),
    readPromise('./song1.txt'),
    readPromise('./song3.txt'),
  ];
  return values;
})
  .then((data) => data)
  .catch((err) => err + '');

setTimeout(() => {
  console.log(arr);
}, 1000);
```

- Sử dụng `Node co` như một hàm và có khả năng truyền tham số vào để dùng như sau:

```js
readFiles(['./song1.txt', './song2.txt', './song3.txt'])
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

- Ta viết lại như sau:

```js
var files = ['./song1.txt', './song2.txt', './song3.txt'];

let readFiles =
  //[strings] => yield Promise
  co.wrap(function* (arrFiles) {
    var values = yield arrFiles.map((file) => {
      return readPromise(file);
    });
    return values;
  });

readFiles(files)
  .then((data) => console.log(data[0]))
  .catch((err) => console.log(err));
```

- Không viết kiểu này được:

```js
function readFiles(path) {
  var values = co.wrap(function* (path) {
    return yield path.map((value) => {
      return readPromise(value);
    });
  });
  console.log(values);
}

readFiles(['./song1.txt', './song2.txt', './song3.txt']).then((data) =>
  console.log(data)
);
// TypeError: Cannot read property 'then' of undefined
```

- Hoặc viết kiểu này cũng lỗi:

```js
function readFiles(path) {
  co.wrap(function* (path) {
    var data = yield path.map((value) => {
      return readPromise(value);
    });
    return data;
  });
}

readFiles(['./song1.txt', './song2.txt', './song3.txt']).then((data) =>
  console.log(data)
);
```

## 4. Tổng kết

- Thư viện Node co được sử dụng để gọi nhiều câu lệnh Promise trong khối block theo thứ tự đồng bộ mặc dù cả cụm là xử lý bất đồng bộ.
- Đối tượng trả về sẽ là 1 Promise có thể callback .then() và .catch() để bắt lỗi.
- Node co có thể sử dụng theo 2 cách:

  - C1: Sử dụng như đối tượng Promise trả về.

    > co(fn\*).then( val => )

  - C2: Sử dụng như hàm function có thể truyền tham số vào để xử lý để trả về.
    > var fn = co.wrap(fn\*)

### 4.1 Cách 1 : co(fn\*).then( val => )

- Phải trả về một `a generator` có thể xử lý Callback Promise
- Cấu trúc

```js
co(function* () {
  return yield Promise.resolve(true);
}).then(
  function (val) {
    console.log(val);
  },
  function (err) {
    console.error(err.stack);
  }
);
```

- Ví dụ:

```js
const fs = require('fs');
const co = require('co');

let readPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

co(function* () {
  var values = yield [
    readPromise('./song2.txt'),
    readPromise('./song1.txt'),
    readPromise('./song3.txt'),
  ];
  return values;
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err + ''));
```

### 4.2 Cách 2 : var fn = co.wrap(fn\*)

- Theo đúng cấu trúc, là một hàm và trả về là một `Promise`
- Có thể truyền tham số vào hàm để xử lý.
- Cấu trúc:

```js
var fn = co.wrap(function* (val) {
  return yield Promise.resolve(val);
});

fn(true).then(function (val) {});
```

- Ví dụ:

```js
const fs = require('fs');
const co = require('co');

let readPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

var files = ['./song1.txt', './song2.txt', './song3.txt'];

let readFiles = co.wrap(function* (arrFiles) {
  var values = yield arrFiles.map((file) => {
    return readPromise(file);
  });
  return values;
});

readFiles(files)
  .then((data) => console.log(data[0]))
  .catch((err) => console.log(err));
```

## 5. Bài tập

```js
/**
 * Sử dụng node co + axios để tải về các đường link sau theo 2 cách:
 */
var urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/299',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];
```

- Xem [Giải 1](./baitap.js)
- Xem [Giải 2](./baitap2.js)

- Tham khảo:

```js
/**
 * Sử dụng node co + axios để tải về các đường url sau theo 2 cách:
 */

const axios = require('axios');
const co = require('co');

var urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];

// axiosPromise
let axiosPromise = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .get(path)
      .then((response) => resolve(response.data))
      .catch((error) => reject('Lỗi url: ' + error.config.url));
  });
};

//! Cách 1:
co(function* () {
  var value = yield urls.map((url) => {
    return axiosPromise(url);
  });
  return value;
})
  .then((data) => console.log('Cách 1: ', data))
  .catch((err) => console.log(err + ''));

//! Cách 2:
let axiosCO = co.wrap(function* (urls) {
  var result = yield urls.map((url) => {
    return axiosPromise(url);
  });
  return result;
});

axiosCO(urls)
  .then((data) => console.log('Cách 2: ', data))
  .catch((err) => console.log(err));
```

- Hoặc dùng nguyên gốc `axios` như vậy:

```js
/**
 * Sử dụng node co + axios để tải về các đường url sau theo 2 cách:
 */
var urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/222',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];

// Cách dùng axios
const axios = require('axios');
/*
axios
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => console.log(response))
  .catch((error) => console.log(error))
  .then(() => console.log('Thực hiện xong'));
*/

const co = require('co');

//! Cách 1:
co(function* () {
  var value = yield urls.map((url) => {
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => 'Error: ' + error.config.url);
  });
  return value;
})
  .then((data) => console.log('Cách 1: ', data))
  .catch((err) => console.log(err + ''));

//! Cách 2:

function requestAxiosPromise(path) {
  return new Promise(function (resolve, reject) {
    axios
      .get(path)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error.config.url);
      });
  });
}

co(function* () {
  return yield urls.map((link) => {
    return requestAxiosPromise(link);
  });
})
  .then((link) => console.log('Load: ', link))
  .catch((err) => console.log('Error: ', err));

//! Cách 3:

let axiosCO = co.wrap(function* (urls) {
  var result = yield urls.map((url) => {
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => 'Error: ' + error.config.url);
    return value;
  });
  return result;
});

axiosCO(urls)
  .then((data) => console.log('Cách 2: ', data))
  .catch((err) => console.log(err));
```

- Xem [Làm lúc trước](./baitap-older.js)

---
