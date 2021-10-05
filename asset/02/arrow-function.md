# Ôn tập Arrow Function

---

## 1. Cấu trúc

```js
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5
```

## 2. Cách chuyển Declare Function sang Arrow Function

- Bỏ chữ `Function` thay bằng dấu mũi tên suy ra `=>`.
- Nếu chỉ có 1 dòng xử lý thì có thể bỏ luôn dấu ngoặc nhọn `{}`.

```js
// Print console element of array
var mang = [3, 4, 5, 7, 1];

// Declare Function
mang.forEach(function (e) {
  console.log(e);
});

// Arrow Function
mang.forEach((e) => console.log(e));
```

- Nếu trả về kết quả `return result` thì bỏ luôn chữ `return`.

```js
var arr = [3, 4, 5, 7, 1];

// Declare Function
let newArr = arr.map(function (e) {
  return e * 2;
});

// Arrow Function
let newArr2 = arr.map((e) => e * 2);
console.log(newArr2);
```

````js
// Declare Function
function add(a, b) {
  return a + b;
}
// Arrow Function
let add2 = (a, b) => a + b;
console.log(add2(2, 3));

```js


````
