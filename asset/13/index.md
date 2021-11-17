# Phương thức all và race

---

Để xử lý nhiều Promise liên tục bất đồng bộ ta sử dụng Phương thức:

- Promise.all
- Promise.race
  Ở các bài trước ta đã có các xử lý Promise bất đồng bộ phép: Cộng, Nhân và Chia sẽ xử dụng để tính diện tích hình thang như sau:

```js
// Phép tính cộng
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(
          new Error('Tham số truyền vào phải là kiểu number! PHEP CONG')
        );
      }
      return resolve(a + b);
    }, 1000);
  });
};

// Phép tính nhân
let multiply = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(
          new Error('Tham số truyền vào phải là kiểu number! PHEP NHAN')
        );
      }
      return resolve(a * b);
    }, 1000);
  });
};

// Phép tính chia
let divide = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(
          new Error('Tham số truyền vào phải là kiểu number! PHEP CHIA')
        );
      }
      if (b === 0) {
        return reject(new Error('Số chia phải khác 0.'));
      }
      return resolve(a / b);
    }, 1000);
  });
};
```

- Ta sẽ áp dụng các phép tính này trong câu lệnh xử lý theo Phương thức `Promise.all` và `Promise.race`.

## 1. Promise.all

### 1.1 Syntax - Cú pháp sử dụng

- Sẽ được truyền vào input là một mảng các Promise, kết quả nhận được Resolve sẽ là một mảng kết quả Promise cần được handle.
  > Promise.all([aPromise01,aPromise02,aPromise03,...])
  > .then(result[output01,output02,output03,...])
  > .catch(...)`

### 1.2 Sử dụng xử lý nhiều Promise

- Ta truyền vào một mảng các Promise như sau:

```js
var dienTich = Promise.all([add(4, 5), multiply(2, 3), divide(6, 2)]);

console.log(dienTich);
// Promise { <pending> }
```

- Dòng lệnh log được in ra thể hiện kết quả là một Promise và đang ở trạng thái Pending -> Ta cần xử lý handle kết quả trả về.

```js
var dienTich = Promise.all([add(4, 5), multiply(2, 3), divide(6, 2)])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log('Loi: ', err + ''));

// Ket qua:  [ 9, 6, 3 ]
```

- Nếu thay đổi vị trí các Promise

```js
var dienTich = Promise.all([multiply(2, 3), divide(6, 2), add(4, 5)])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log('Loi: ', err + ''));
console.log('Lan 1: ', dienTich);

// Ket qua:  [ 6, 3, 9 ]
```

- Kết quả được trả về mảng theo thứ tự các Promise được truyền vào.
- Nếu xuất hiện lỗi với Promise truyền vào.

```js
var dienTich = Promise.all([add(4, '5'), multiply(2, 3), divide(6, 2)])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log('Loi: ', err + ''));
console.log('Lan 1: ', dienTich);

// Loi:  Error: Tham số truyền vào phải là kiểu number! PHEP CONG
```

```js
var dienTich = Promise.all([add(4, 5), multiply(2, 3), divide(6, '2')])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log('Loi: ', err + ''));
console.log('Lan 1: ', dienTich);

// Loi:  Error: Tham số truyền vào phải là kiểu number! PHEP CHIA
```

```js
var dienTich = Promise.all([add('4', 5), multiply(2, 3), divide(6, '2')])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log('Loi: ', err + ''));
console.log('Lan 1: ', dienTich);

// Loi:  Error: Tham số truyền vào phải là kiểu number! PHEP CONG
```

- Khi xuất hiện lỗi thì handle bắt lỗi sẽ trả về Promise đầu tiên phát hiện bị lỗi.

### 1.3 Tóm tắt

- Promise.all sẽ được truyền vào tham số là một mảng các Promise
- Kết quả sẽ được trả về là một Promise và cần được handle kết quả và bắt lỗi.
- Nếu tất cả các Promise đều được Resolve thì sẽ trả về là một mảng bao gồm các kết quả theo thứ tự mảng các Promise được truyền vào.
- Nếu trong các Promise truyền vào lỗi bị Reject, thì Promise.all sẽ bị Reject lỗi.
- Khi Promise.all bị Reject sẽ là handle kết quả của Promise đầu tiên xuất hiện lỗi trong mảng.

## 2. Promise.race

### 2.1 Syntax - Cú pháp sử dụng

- Sẽ được truyền vào input là một mảng các Promise.
  > Promise.race([aPromise01,aPromise02,aPromise03,...])
  > .then(...)
  > .catch(...)`
- Cấu trúc gần tương tự như Promise.all

### 1.2 Sử dụng xử lý nhiều Promise

```js
var aResult = Promise.race([add(4, 5), multiply(2, 3), divide(6, 2)]);

console.log(aResult);
// Promise { <pending> }
```

- Ta truyền vào một mảng các Promise như sau, khi xuất hiện lỗi ở Promise add đầu tiên.

```js
var aResult = Promise.race([add('4', 5), multiply(2, 3), divide(6, '2')])
  .then((res) => console.log(res))
  .catch((err) => console.log(err + ''));

// Error: Tham số truyền vào phải là kiểu number! PHEP CONG
```

- Nếu xuất hiện lỗi ở Promise không phải đầu tiên mà là thứ 2.

```js
var aResult = Promise.race([add(4, 5), multiply(2, '3'), divide(6, 2)])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log(err + ''));

// Ket qua:  9
```

- Nếu xuất hiện lỗi ở Promise không phải đầu tiên mà là thứ 3.

```js
var aResult = Promise.race([add(4, 5), multiply(2, 3), divide(6, '2')])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log(err + ''));

// Ket qua:  9
```

- Nếu tất cả các Promise đều được Resolve

```js
var aResult = Promise.race([add(4, 5), multiply(2, 3), divide(6, 2)])
  .then((res) => console.log('Ket qua: ', res))
  .catch((err) => console.log(err + ''));

// Ket qua:  9
```

### 2.3 Kết luận

- `Promise.race` sẽ được truyền vào là mảng các `Promise`
- Kết quả sẽ được trả về là một `Promise` và cần được `handle` kết quả và bắt lỗi.
- Với `Promise.race` chỉ quan tâm đến `Promise` đầu tiên trong mảng, kết quả trả về của `Promise` này sẽ được sử dụng cho `Promise.race`, không cần quan tâm đến kết quả của các `Promise` còn lại có `Resolve` hay bị `Reject` hay không.

---
