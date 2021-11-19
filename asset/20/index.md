# Tìm hiểu Async – Await bất đồng bộ

---

## 1. Thực hiện bất đồng bộ Promise

- Xét ví dụ chạy đoạn lệnh bất đồng bộ sau:

```js
function aLog(time, str) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(str);
    }, time);
  });
}

function basicLog() {
  aLog(200, 'Dòng 1').then((res) => console.log('Basic: ', res));
  console.log('Basic');
  aLog(100, 'Dòng 2').then((res) => console.log('Basic: ', res));
}

basicLog();
// Basic
// Basic:  Dòng 2
// Basic:  Dòng 1
```

- Xem file [Basic Function](./basic.js)

  - Dòng `console.log('Basic')` được in ra đầu tiên.
  - Dòng `Dòng 2` được in ra tiếp theo do thời gian chờ là 100ms.
  - Dòng `Dòng 1` được in ra cuối cùng do thời gian chờ là 200ms > 100ms so với `Dòng 2`.

- Khi chạy xử lý bằng `Async/Await` bằng code sau:

```js
function aLog(time, str) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(str);
    }, time);
  });
}

async function asynLog() {
  await aLog(200, 'Dòng 1').then((res) => console.log('Async: ', res));
  console.log('Async');
  await aLog(100, 'Dòng 2').then((res) => console.log('Async: ', res));
}

asynLog();
// Async:  Dòng 1
// Async
// Async:  Dòng 2
```

- Xem file [Async Function](./async.js)

  - Dòng `Dòng 1` được in ra đầu tiên.
  - Dòng lệnh `Async` được in tiếp theo.
  - Cuối cùng là dòng `Dòng 2` được in ra; mặc dù đang xử lý Bất đồng bộ và thời gian chờ là 100ms < 200ms của `Dòng 1`.

## 2. Nhận xét xử lý Async/Await

- Việc dùng `Async/Await` làm cho các câu lệnh Bất đồng bộ chạy theo thứ tự.

---
