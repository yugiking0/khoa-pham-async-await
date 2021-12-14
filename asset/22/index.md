# Async function trả về promise

---

## 1. Việc sử dụng CallBack Function

```js
var dienTichHinhThang = async (a, b, c, callBack) => {
  try {
    var ab = await add(a, b);
    var ah = await multiply(ab, c);
    var result = await divide(ah, 2);
    return callBack(undefined, result);
  } catch (err) {
    return callBack(err);
  }
};

dienTichHinhThang(2, 3, 4, (err, res) => {
  if (err) {
    return console.log(err + '');
  }
  console.log('Dien tich hinh thang: ', res);
});
```

Dùng `callback Function` giúp cho:

- Handle được kết quả trả về.
- Việc dùng `Callback Function` giúp xử lý tùy biến kết quả trả về như:

  - Log kết quả ra màn hình.
  - Xử lý tiếp, lưu vào Database
  - Gửi về cho người dùng
  - ...

  Hạn chế ở đây là kết quả trả về có thể chỉ được xử lý trong một khối lệnh `dienTichHinhThang`, nên tái sử dụng gán cho biến khác sẽ khó khăn.

Vậy ngoài cách dùng `callback Function` ta có thể sử dụng trả về `Promise`. Ngoài ra, việc dùng trả kết quả về là một `Promise` còn giúp tái sử dụng kết quả, dùng cho những xử lý khác hoặc dùng tiếp ở các xử lý Async/Await function khác.

## 2. Async function trả về promise

- Ta điều chỉnh dòng code trên lại thành như sau:

```js
var tinhDienTich = async (a, b, c) => {
  try {
    var ab = await add(a, b);
    var ah = await multiply(ab, c);
    var result = await divide(ah, 2);
    return Promise.resolve(result); // Return Promise
  } catch (err) {
    return Promise.reject(err); // Return Promise
  }
};

// Tái sử dụng Kết quả là Promise trong xử lý Async khác
async function xuLy(a, b, c) {
  var dt = await tinhDienTich(a, b, c)
    .then((res) => res)
    .catch((err) => console.log(err + ''));
  if (dt !== undefined) {
    console.log(dt);
  }
}

xuLy(4, 5, '6');
// Error: Tham so truyen vao phai kieu Number - PHEPNHAN

xuLy(4, 5, 6);
// 27
```

---
