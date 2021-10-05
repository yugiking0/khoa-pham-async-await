# Callback

---

## 1. Ví dụ: `Tính diện tích hình thang`

- Ví dụ tính diện tích hình thang
  > Diện tích = ([Đáy lớn] + [Đáy nhỏ]) \* [Chiều cao] / 2

```js
var square = (a, b, h) => ((a + b) * h) / 2;
console.log('Dien tich: ', square(2, 3, 2));
```

## 2. Mô phỏng bất đồng bộ

- Mô phỏng xử lý bất đồng bộ liên tiếp tính diện tích hình thang, ta sẽ chuyển câu lệnh trên thành nhiều phép tính khác nhau: cộng, nhân, chia ...
- Một function bất đồng bộ sẽ cần 1 xử lý callback kết quả trả về, ở đây ta sử dụng setTimeout để xử lý chỗ này để chuyển bất đồng bộ sẽ tốn thời gian và sẽ xử lý sau các câu lệnh đồng bộ.

- Ta viết lại như sau:

```js
let add = (a, b, callBack) => {
  setTimeout(() => {
    let error, result;
    if ((typeof a != 'number') | (typeof b != 'number')) {
      error = 'Kiểm tra giá trị nhập vào!';
      return callBack(error, result);
    }
    result = a + b;
    return callBack(error, result);
  }, 1000);
};

add(2, `3`, (err, res) => {
  if (err) {
    return console.log('Loi: ' + err);
  }
  console.log('Ket qua: ' + res);
});
```

- Có thể viết ngắn gọn lại loại bỏ các biến error, result để thành:

```js
let add = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack('Kiểm tra giá trị nhập vào!');
    }
    return callBack(undefined, a + b);
  }, 1000);
};

add(2, `3`, (err, res) => {
  if (err) {
    return console.log('Loi: ' + err);
  }
  console.log('Ket qua: ' + res);
});
```

- Để thể hiện rõ ràng hơn khi gặp lỗi sẽ cảnh báo, ta viết lại thành:

```js
let add = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack(new Error('Tham so phai có kieu number.'));
    }
    return callBack(undefined, a + b);
  }, 1000);
};

add(2, `3`, (err, res) => {
  if (err) {
    return console.log('Loi: ' + err);
  }
  console.log('Ket qua: ' + res);
});
```

- Thực hiện tương tự cho các phép nhân và phép chia như sau:

```js
// var square = (a, b, h) => ((a + b) * h) / 2;
// console.log('Dien tich: ', square(2, 3, 2));

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
square(2, 3, 3, (err, res) => {
  if (err) {
    return console.log('Loi: ' + err);
  }
  console.log('Dien tich: ' + res);
});
```

- Xem câu lệnh [Diện tích hình thang](./callback.js)

---
