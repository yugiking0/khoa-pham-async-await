# Phương thức resolve và reject

---

## I. Thực hiện ở Server

### 1. Promise Resolve

#### 1.1 Gọi trực tiếp Promise Resolve

- Ta dùng phương thức resolve với giá trị là 4, và thực hiện tại server

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

let aPromise = Promise.resolve(4);
console.log(aPromise);
// Promise { 4 }
```

- Kết quả trả về tương tự như khi gọi Promise với then khi return có 2 tham số được trả về.

```js
let a = add(0, 4).then((rs) => rs);
```

#### 1.2 Gọi Promise Resolve trả về 1 Promise

- Ta dùng phương thức Promise.Resolve trả về một Promise để kiểm tra sự kiện

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

let aPromise = Promise.resolve(add(4, 5));
console.log(aPromise);
// Promise { <pending> }
```

- Kết quả trả về là trạng thái `Pending`, vì là trạng thái `Pending` nên ta có thể xử lý trạng thái trả về `.then` hoặc `.catch` để handle xử lý.

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

let aPromise = Promise.resolve(add(4, 5));

// console.log(aPromise); // Promise { <pending> }
aPromise.then((res) => console.log(res));
// 9 : Trả về hiển thị kết quả của add(4,5)
```

#### Tóm tắt

- Như vậy đối với phương thức Resolve thì:
  - Có thể truyền vào một giá trị, và sẽ trả về giá trị tương tự xử lý .then của Promise
  - Truyền vào một Promise, thì sẽ trả về một Promise ở trạng thái pending, và có thể xử lý tiếp bằng phương thức .then hoặc .catch tiếp tục như một Promise.

---

### 2. Promise Reject

- Ta gọi trực tiếp giá trị Promise.Reject và kiểm tra kết quả sẽ trả về là một Promise.

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

let rPromise = Promise.reject('Bị lỗi');
console.log(rPromise);
//Promise { <rejected> 'Bị lỗi' }
// (node:9016) UnhandledPromiseRejectionWarning: Bị lỗi
```

- Do kết quả trả về là một `Promise` bị `rejected`, nên ta có thể handle xử lý `.catch` hoặc `.error` để hứng lấy kết quả trả về từ `Promise` này.

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

// handle bằng .catch khi error
let rPromise = Promise.reject('Bị lỗi');
rPromise.catch((er) => console.log(er + ''));
console.log(rPromise);
// Promise { <rejected> 'Bị lỗi' }
// Bị lỗi

// handle bằng .then khi error
let rPromise = Promise.reject('Bị lỗi');
rPromise.then(
  (res) => console.log(res),
  (er) => console.log(er + '')
);
console.log(rPromise);
// Promise { <rejected> 'Bị lỗi' }
// Bị lỗi
```

- Như vậy, một Promise ở trạng thái rejected thì cần phải handle lỗi của nó bằng `.then(res,error)` hoặc `.catch(error)`

---

## II. Thực hiện ở Client

### 1. Promise Resolve

- Ta dựng 1 server từ EJS như sau:
  - Một file server.js
  - Một file views/home.ejs

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

```html
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
  </head>
  <body>
    <h1>Lập trình Nodejs: Xử lý bất đồng bộ trong Javascript</h1>
    <h2>Phương thức resolve và reject</h2>
  </body>
</html>
```

- Ở đây xử lý ta sẽ tập trung vào đoạn `<script type="text/javascript">...</script>`

#### 1.1 Gọi trực tiếp Promise Resolve truyền vào giá trị

- Ta gọi phương thức Promise.Resolve trả về một kết quả

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

let aPromise = Promise.resolve(4);
console.log(aPromise);
// Promise { 4 }
```

![Resolve](./images/001.png 'Resolve')

- Kết quả trả về là Promise đã được xử lý và có giá trị là 4.

#### 1.2 Truyền vào Promise Resolve là Promise

- Truyền vào phương thức Promise.Resolve là một Promise

```js
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      resolve(a + b);
    }, 2000);
  });
};

let aPromise = Promise.resolve(add(4, 5));
console.log(aPromise);
```

![Resolve](./images/002.png 'Resolve')

- Kết quả trả về là một Promise đang ở trạng thái pending, để handle giá trị ta có thể xử lý .then để hứng kết quả ở đây như một Promise.

![Resolve](./images/003.png 'Resolve')

- Khi gọi trả về một Promise, ta có thể xử lý tiếp ,then để handle kết quả.

### 2. Promise Reject

#### 2.1 Promise Reject một giá trị truyền vào

- Ta truyền vào phương thức Promise.Reject một giá trị bị lỗi.

```js
let rPromise = Promise.reject('Bị lỗi.');
console.log(rPromise);
```

![Reject](./images/004.png 'Reject')

- Do hiện tại đang trả về một Promise ở trạng thái rejected, nên ta có thể handle xử lý .catch để bắt lỗi xử lý ở đây như sau:

```js
let rPromise = Promise.reject('Bị lỗi.');
rPromise.catch((err) => console.log(err));
console.log(rPromise);
```

![Reject](./images/005.png 'Reject')

### 2.2 Promise Reject một Promise

- Ta thử truyền vào Reject một Promise để kiểm tra sự kiện

```js
let rPromise = Promise.reject(add(4, '5'));
rPromise
  .then(
    (res) => res,
    (err) => console.log(err)
  )
  .catch((err) => console.log(err));

console.log(rPromise);
```

![Reject](./images/006.png 'Reject')

- Khi thay đổi vị trí bắt lỗi vẫn chưa bắt lỗi được trạng thái pending của Promise được truyền vào.
  ![Reject](./images/007.png 'Reject')
- Để hiểu rõ hơn cách xử lý, ta xem ở bài tiếp theo về `Phương thức all và race` để có thể kiểm soát handle nhiều Promise cùng lúc xử lý bất đồng bộ.

---
