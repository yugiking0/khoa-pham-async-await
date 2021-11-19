# Làm quen với Async – Await

---

- [1. Async](#1-async)
- [2. Await](#2-await)
- [3. Các ví dụ về sự khác nhau giữa Hàm thường và Hàm Async Await](#3-các-ví-dụ-về-sự-khác-nhau-giữa-hàm-thường-và-hàm-async-await)

## 1. Async

- Dùng để định nghĩa một Hàm `Async Function`

```js
async function aLog() {
  console.log('Hello World !!!');
}
aLog();

//> babel-node index.js
//Hello World !!!
```

- Viết ngắn lại kiểu `Arrow Function`, sã thành:

```js
let aLog = async () => console.log('Hello World !!!');
aLog();
```

## 2. Await

- Từ khóa `await` chỉ được tồn tại trong Hàm `Async Function`
- Nghĩa là Function bao từ khóa `Await` phải là một `Async Function`
- Syntax: `await + aPromise` : Theo sau `await` phải là một `Promise`.
- Khi `Async Function` thực hiện đến dòng lệnh có từ khóa `await aPromise` sẽ dừng lại vị trí await (không chạy các dòng lệnh tiếp theo ở dưới ), và chờ đợi`aPromise` đó thực hiện xong trả về kết quả; sau đó mới chạy các dòng lệnh tiếp theo.

## 3. Các ví dụ về sự khác nhau giữa Hàm thường và Hàm Async Await

### **Ví dụ 1:**

```js
function helloLog() {
  return Promise.resolve('Hello World');
}

// Basic Function
function basicLog() {
  let str = helloLog().then((res) => res);
  console.log('Basic: ', str);
}

// Async Function
async function syncLog() {
  let str = await helloLog().then((res) => res);
  console.log('Async Await: ', str);
}

syncLog();
basicLog();

// Basic:  Promise { <pending> }
// Async Await:  Hello World
```

- `basicLog()` chạy sau `syncLog()`, nhưng hiển thị Log trước thể hiện xử lý `Bất đồng bộ`.
- Giá trị biến `str` của `Basic Function` khi log ra vẫn chưa có giá trị (`Promise { <pending> }`) và vẫn đang ở trạng thái `Pending`.
- Giá trị biến `str` của `Async Function` khi log ra đã thể hiện được giá trị ('9'), nghĩa là sau khi `await helloLog()` chạy xong, mới chạy tiếp câu lệnh `console.log('Async Await: ', str);`

### **Ví dụ 2:**

```js
function add(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        return reject(new Error('Tham số phải là kiểu số!'));
      }
      return resolve(a + b);
    }, 1000);
  });
}

let phepCong = () => {
  console.log('Basic');
  let result = add(4, 5)
    .then((res) => res)
    .catch((err) => err);

  console.log('Basic: ', result);
};

let syncPhepCong = async () => {
  console.log('Async Await');
  let result = await add(4, 5)
    .then((res) => res)
    .catch((err) => err);

  console.log('Async Await: ', result);
};
phepCong();
syncPhepCong();

// Basic
// Basic:  Promise { <pending> }
// Async Await
// Async Await:  9
```

- Với `Function thường` thì `Result` vẫn chưa được gán giá trị(`Promise { <pending> }`)thì vẫn chạy tiếp tục câu lệnh `console.log( result);`.
- Với `Async Function` thì được dừng tại `await add(4, 5)`, sau khi `Result` nhận giá trị(`9`) thì mới chạy câu lệnh `console.log( result);`

---
