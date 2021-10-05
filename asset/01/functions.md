# Các loại Functions

---

![Các loại Functions](./image/001.png 'Các loại Functions')

### 1. Declare Function

```js
function add(a, b) {
  return a + b;
}
```

---

### 2. Expressions Function

```js
const luyThua = function (x, a) {
  return x ** a; // x^a
};

console.log(luyThua(2, 3)); // 8 = 2*2*2 = 2^3
```

---

### 3. Arrow Function

```js
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5
```
