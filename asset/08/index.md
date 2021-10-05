# Promise Basic

---

## 1. Promise

- Ta xem câu lệnh tạo 1 promise đơn giản như sau:

```js
let aPromise = new Promise(() => {
  console.log('Hello!');
});
```

![Promise](./images/001.png 'Promise')

- Ngay khi khai báo đã có thể load chạy được câu lệnh hiển thị được "Hello!"

- Trong câu lệnh Promise có 2 tham số resolve và reject chỉ trạng thái, giúp quản lý trạng thái của Promise

```js
let aPromise = new Promise((resolve, reject) => {
  console.log('Hello!');
});
```

## 2. Handle trạng thái

- Trở lại ví dụ tính tổng của 2 số a + b, `promise` ở đây là lời hứa sẽ thực hiện phép tính này.
  - Khi không có lỗi sẽ dùng trạng thái resolve tính.
  - Khi xuất hiện lỗi sẽ từ chối và trả về lỗi bằng trạng thái reject.

```js
let aPromise = new Promise((resolve, reject) => {
  resolve(); // Nếu không xuất hiện lỗi.
  reject(); // Nếu xuất hiện lỗi xảy ra sẽ cảnh báo và từ chối xử lý.
});
```

- Nếu trong 1 câu lệnh cùng xuất hiện resolve và reject thì cái nào được đứng trước sẽ được thực hiện và bỏ qua phần còn lại.
- Khi trạng thái thành công sẽ được gọi lại bằng câu lệnh .then()

```js
let aPromise = new Promise((resolve, reject) => {
  resolve('Thành công.');
});
aPromise.then(() => console.log('Đã thực thi.'));
```

- Kết quả trả về sẽ được gọi lại bằng tham số như sau:

```js
let aPromise = new Promise((resolve, reject) => {
  resolve('Thành công.');
});
aPromise.then((msg) => console.log('Đã thực thi: ', msg));
```

![Promise resolve](./images/002.png 'Promise resolve')

- Khi gọi reject thì sẽ thao tác là:

```js
let aPromise = new Promise((resolve, reject) => {
  // resolve('Thành công.');
  reject('Thất bại.');
});

aPromise.then(
  (msg) => console.log('Đã thực thi: ', msg),
  (err) => console.log('Đã thực thi: ', err + '')
);
```

![Promise reject](./images/004.png 'Promise reject')

- .then() sẽ có 2 tham số tương ứng với resolve và reject
- Để handle kiểm soát được lỗi khi reject thì ta nên truyền vào 1 Error được viết như sau:

```js
let aPromise = new Promise((resolve, reject) => {
  // resolve('Thành công.');
  reject(new Error('Không thể kết nối.'));
});
aPromise.then(
  (msg) => console.log('Đã thực thi: ', msg),
  (err) => console.log(err + '')
);
```

![Promise Error](./images/005.png 'Promise Error')

## 3. Mô phỏng xử lý bất đồng bộ

- Ta có thể viết lại đối tượng `Promise` để chuyển thành bất động bộ bằng cách sử dụng `setTimeout` như sau:

```js
let aPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Không thể kết nối.'));
    // resolve('Thành công.');
  }, 2000);
});
aPromise.then(
  (msg) => console.log('Đã thực thi: ', msg),
  (err) => console.log(err + '')
);
```

## 4. Tóm tắt

- Tạo mới đối tượng promise
- Handle kiểm soát trạng thái thành công hoặc từ chối.(resolve và reject)
- Chuyển mô phỏng thành xử lý bất đồng bộ.

---
