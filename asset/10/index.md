# Promise liên tục

---

## 1. Nhắc lại tái sử dụng Promise

- Là việc gói Promise vào một trong function
- Có khả năng truyền vào tham số để sử dụng.
- Kết quả trả về là một đối tượng Promise có thể handle được trạng thái thực thi (resolve) hay từ chối xử lý (reject)

```js
const fs = require('fs');
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
```

- Hoặc xử lý phép cộng 2 số:

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

## 2. Sử dụng Promise liên tiếp nhau để xử lý Callback Hell

- Ta xem lại phép cộng Add đã viết ở các bài trước

```js
// Phép tính cộng
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      return resolve(a + b);
    }, 1000);
  });
};

// (4 + 5)
add(4, 5).then(
  (data) => console.log(data),
  (err) => console.log(err + '')
);
```

- Việc sử lý Promise liên tục cho phép tính `(4 + 5) + 6`

```js
// (4 + 5) + 6
add(4, 5).then(
  (data) =>
    add(data, 6).then(
      (data2) => console.log(data2),
      (err2) => console.log(err2 + '')
    ),
  (err) => console.log(err + '')
);
```

- Vì kết quả trả về của add(data,6) cũng là 1 đối tượng Promise nên ta có thể chuyển .then của câu lệnh này xuống ở dưới mà không làm thay đổi như sau:

![Promise liên tục](./images/001.png 'Promise liên tục')

```js
// (4 + 5) + 6
add(4, 5)
  .then(
    (data) => add(data, 6),
    (err) => console.log(err + '')
  )
  .then(
    (data2) => console.log(data2),
    (err2) => console.log(err2 + '')
  );
```

- Vấn đề xảy ra khi gặp lỗi reject thì câu lệnh trên vẫn bị trả về một đối tượng promise và thực hiện tiếp câu lệnh trả về kết quả undefined như sau:

```js
// (4 + 5) + 6
add(4, '5')
  .then(
    (data) => add(data, 6),
    (err) => console.log(err + '')
  )
  .then(
    (result) => console.log('Kết quả là: ', result),
    (err2) => console.log(err2 + '')
  );
```

![Promise liên tục](./images/002.png 'Promise liên tục')

- Để giải quyết vấn đề khi gặp lỗi dừng lại, ta bỏ các tham số .then(error) khi callback và sử dụng .catch khi xuất hiện lỗi. Sẽ viết lại như sau:

```js
// (4 + 5) + 6
add(4, '5')
  .then((data) => add(data, 6))
  .then((result) => console.log('Kết quả là: ', result))
  .catch((error) => console.log(error + ''));
```

![Promise catch Error](./images/003.png 'Promise catch Error')

- Bây giờ đoạn lệnh Promise liên tục đã gọn hơn rất nhiều và dễ nhìn, dễ handle được.

## 3. Áp dụng Promise liên tiếp nhau để xử lý tính diện tích hình thang

- Để tránh việc callback hell ở bài toán tính diện tích hình thang trước đó.

```js
// Phép Cộng
let add = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack(new Error('Tham so phai có kieu number.'));
    }
    return callBack(undefined, a + b);
  }, 1000);
};

// Phép Nhân
let multiply = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack(new Error('Tham so phai có kieu number.'));
    }
    return callBack(undefined, a * b);
  }, 1000);
};

// Phép Chia
let divide = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack(new Error('Tham so phai có kieu number.'));
    }
    if (b == 0) {
      return callBack(new Error('So bi chia phai khac 0.'));
    }
    return callBack(undefined, a / b);
  }, 1000);
};

// Tính Diện tích hình thang

let square = (a, b, c, cb) => {
  add(a, b, (err1, res1) => {
    if (err1) return cb(err1);
    multiply(res1, c, (err2, res2) => {
      if (err2) return cb(err2);
      divide(res2, 2, (err3, res3) => {
        if (err3) return cb(err3);
        return cb(undefined, res3);
      });
    });
  });
};

// Diện tích hình thang
square(2, 3, `2`, (err, res) => {
  if (err) {
    return console.log(err + '');
  }
  console.log('Dien tich: ' + res);
});
```

- Ta viết lại để làm phẳng sử dụng Promise liên tục và setTimeout để xử lý bất đồng bộ như sau:

```js
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      return resolve(a + b);
    }, 1000);
  });
};

let multiply = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      return resolve(a * b);
    }, 1000);
  });
};

let divide = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      if (b === 0) {
        return reject(new Error('Số chia phải khác 0.'));
      }
      return resolve(a / b);
    }, 1000);
  });
};

let square = (a, b, h) => {
  add(a, b)
    .then((res) => multiply(res, h))
    .then((res) => divide(res, 2))
    .then((res) => console.log('Diện tích hình thang: ' + res))
    .catch((err) => console.log(err + ''));
};

square(4, 6, 5);
```

Cụ thể là đoạn:

```js
// Tính Diện tích hình thang

let square = (a, b, c, cb) => {
  add(a, b, (err1, res1) => {
    if (err1) return cb(err1);
    multiply(res1, c, (err2, res2) => {
      if (err2) return cb(err2);
      divide(res2, 2, (err3, res3) => {
        if (err3) return cb(err3);
        return cb(undefined, res3);
      });
    });
  });
};

// Diện tích hình thang
square(2, 3, `2`, (err, res) => {
  if (err) {
    return console.log(err + '');
  }
  console.log('Dien tich: ' + res);
});
```

- Sẽ trở thành:

```js
let square = (a, b, h) => {
  add(a, b)
    .then((res) => multiply(res, h))
    .then((res) => divide(res, 2))
    .then((res) => console.log('Diện tích hình thang: ' + res))
    .catch((err) => console.log(err + ''));
};

square(4, 6, 5);
```

- Đôi khi sau khi tính ra được diện tích hình thang, ta không in ra kết quả mà có thể sử dụng kết quả đó để sử dụng cho mục đích nào đó khác, thì ta có thể viết lại đoạn xử lý trên thành.

```js
let square = (a, b, h) => {
  return add(a, b)
    .then((res) => multiply(res, h))
    .then((res) => divide(res, 2));
};

square(4, 5, 6)
  .then((res) => console.log('Diện tích hình thang: ' + res))
  .catch((err) => console.log(err + ''));
```

![Promise catch Error](./images/004.png 'Promise catch Error')

- Tham khảo câu lệnh ở [Tái sử dụng Promise](./pr2.js)

## 3.Tóm tắt

- Promise liên tục sẽ giúp cho việc gọi tái sử dụng nhiều Promise nhiều lần theo thứ tự.
- Promise liên tục vẫn đảm bảo việc handle được trạng thái kết quả trả về vì là một đối tượng handle(.then() và .catch())
- Promise liên tục giúp tránh callback hell và làm cho câu lệnh xử lý rõ ràng, ngắn gọn và dễ handle kiểm soát khi xảy ra lỗi hoặc cần viết lại hơn.

---
