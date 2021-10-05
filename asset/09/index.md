# Tái sử dụng Promise

---

## 1. Cấu trúc

```js
let aPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Không thể kết nối.'));
    // resolve('Thành công.');
  }, 1000);
});
aPromise.then(
  (msg) => console.log('Đã thực thi: ', msg),
  (err) => console.log(err + '')
);
```

## 2. Tái sử dụng

- Để tái sử dụng ta sẽ viết lại 1 function và return lại kết quả promise để truyền tham số vào.
- Ta viết lại câu lệnh tính toán phép cộng ở các bài trước như sau:

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

add(4, `5`).then(
  (res) => console.log(res),
  (err) => console.log(err + '')
);
```

- Xem câu lệnh [add](./add.js)

# 3. Bài tập

> Viết hàm readFile chuyển thành đối tượng Promise

- Cấu trúc readFile là:

```js
const fs = require('fs');
fs.readFile('../docs/test12.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return console.log(new Error('Kiểm tra lại đường dẫn!') + '');
  }
  return console.log(data);
});
```

- Ta viết lại thành Promise mô phỏng bất đồng bộ như sau:

```js
const fs = require('fs');

let prRead = (path) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          return reject(new Error('Kiểm tra lại đường dẫn!') + '');
        }
        return resolve(data);
      });
    }, 1000);
  });
};

prRead('../docs/test1.txt').then(
  (res) => console.log(res),
  (err) => console.log(err)const fs = require('fs');
let promiseRead = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(new Error('Kiểm tra lại đường dẫn!') + '');
      }
      return resolve(data);
    });
  });
};
promiseRead('../docs/test1.txt').then(
  (res) => console.log(res),
  (err) => console.log(err)
);
);
```

Vì fs.readFile đã là một câu lệnh bất đồng bộ rồi nên không cần sử dụng setTimeout, ta bỏ đi thành:

```js

```

---
