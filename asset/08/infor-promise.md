# Lý thuyết và cách hoạt động của Promise

---

---

## 1. Ví dụ:

> Ta xét ví dụ: In ra màn hình dãy số tăng dần sau mỗi giây(Không sử dụng chức năng **setInterval**)

```js
function logCount(ms) {
  setTimeout(function () {
    console.log(1);
    setTimeout(function () {
      console.log(2);
      setTimeout(function () {
        console.log(3);
        setTimeout(function () {
          console.log(4);
          setTimeout(function () {
            console.log(5);
            setTimeout(function () {
              console.log(6);
              setTimeout(function () {
                console.log(7);
                setTimeout(function () {
                  console.log(8);
                }, ms);
              }, ms);
            }, ms);
          }, ms);
        }, ms);
      }, ms);
    }, ms);
  }, ms);
}

logCount(1000);
```

- Nếu dãy số càng tăng thì việc viết lồng các xử lý này càng nhiều.
- Vậy Promise xử lý bài toán này thế nào để không còn bị tình trạng Callback Hell?

## 2. Cấu trúc lệnh

- **Promise** được xuất hiện ở phiên bản ES6 ở bảng ECMAScript-06 (2015).
- Khởi tạo một đối tượng Promise mới:

```js
var pr = new Promise( // Object Constructor
  //Executor: Thực hiện xử lý nào đó.
  function (resolve, reject) {
    //Logic
    // - Thành công: resolve()
    // - Thất bại: reject()
  }
);

//prettier-ignore
pr
  .then()
  .catch()
  .finally();
```

## 3. Các trạng thái trả về của Promise

- Ví dụ như xử lý lũy thừa 2 một số có kiểm tra giá trị nhập vào phải là kiểu số mới xử lý.
- Ta sẽ xem xét các trường hợp khi nào câu lệnh trả về xử lý ở .then(), .catch(), và finally()

### 3.1 Xử lý Logic vào Resolve()

- Khi **inputValue** là kiểu Number

```js
var pr = new Promise(function (resolve, reject) {
  console.log("Begin!");
  var inputValue = 3; // Đúng là kiểu Number
  if (typeof inputValue !== "number") {
    console.log("Thất bại");
    reject("Lỗi");
  } else {
    console.log("Thành công");
    resolve(inputValue ** 2);
  }
});

//prettier-ignore
pr
.then(rs=>console.log("Result: ",rs))
.catch(err=>console.log("Error2: ",err))
.finally(dt=>console.log("Done: ",dt));

// Thành công
// Result:  9
// Done:  undefined
```

- Khi xử lý logic chạy vào Resolve:
  - Câu lệnh sẽ vào .then()
  - Chạy tiếp ở .finally()
  - Giá trị trong resolve(`output`) sẽ làm giá trị đầu ra ở .then(`rs`)
  - Giá trị đối số ở .then(`dt`) không xác định giá trị: `dt` là `undefined`

### 3.2 Xử lý Logic vào Reject()

- Khi **inputValue** là không phải kiểu Number

```js
var pr = new Promise(function (resolve, reject) {
  var inputValue = "3";
  if (typeof inputValue !== "number") {
    console.log("Thất bại");
    reject("Lỗi");
  } else {
    console.log("Thành công");
    resolve(inputValue ** 2);
  }
});

//prettier-ignore
pr
.then(rs=>console.log("Result: ",rs))
.catch(err=>console.log("Error2: ",err))
.finally(dt=>console.log("Done: ",dt))

// Thất bại
// Error2:  Lỗi
// Done:  undefined
```

- Khi xử lý logic chạy vào Reject:

  - Câu lệnh sẽ vào .catch()
  - Chạy tiếp ở .finally()
  - Giá trị trong reject(`error`) sẽ làm giá trị đầu ra ở `err` của .catch(`err`)
  - Giá trị đối số ở .then(`dt`) không xác định giá trị: `dt` là `undefined`

- Ta thay đổi 1 tý ở xử lý .then như sau:

```js
var pr = new Promise(function (resolve, reject) {
  var inputValue = "3";
  if (typeof inputValue !== "number") {
    console.log("Thất bại");
    reject("Lỗi");
  } else {
    console.log("Thành công");
    resolve(inputValue ** 2);
  }
});

//prettier-ignore
pr
.then(
      result=>console.log("Result: ",result) //result
    , err=>console.log("Error1: ",err) //error
  )
.catch(err=>console.log("Error2: ",err))
.finally(dt=>console.log("Done: ",dt))

// Thất bại
// Error1:  Lỗi
// Done:  undefined
```

- Khi xử lý logic chạy vào Reject:
  - Câu lệnh thay vì sẽ vào .catch(ERROR2) thì sẽ vào .then(rs,ERROR1)
  - Chạy tiếp ở .finally()
  - Giá trị trong reject(`error`) sẽ làm giá trị đầu ra ở `err` của .then(`err`)
  - Giá trị đối số ở .then(`dt`) không xác định giá trị: `dt` là `undefined

### 3.3 Tóm tắt

- `Promise` được dùng như khởi tạo 1 đối tượng nguyên mẫu - `Object Constructor` bằng từ khóa `New`
- Promise sẽ có 2 đối số là Resolve và Reject được truyền vào xử lý Logic:
  - Khi xử lý đúng / thành công sẽ gọi xử lý `Resolve()`
  - Khi lỗi xuất hiện sẽ gọi hàm `Reject()`
- Khi sử dụng đối tượng Promise sẽ có 3 phương thức xử lý handle(bắt lỗi):

  - 1. Khi thực hiện Resolve thì xử lý tiếp theo sẽ chạy ở .then()
  - 2. Khi xảy ra lỗi từ chối Reject thì xử lý sẽ được bắt lỗi ở .catch()
  - 3. Xử lý .finally() sẽ thực hiện khi Resolve() hoặc Reject() được thực hiện.
  - Kết quả `output` từ xử lý Resolve(`output`) sẽ là đối số đầu ra ở .then(`result`)
  - Kết quả `output` từ xử lý Reject(`output`) sẽ là đối số đầu ra ở .catch(`error`)
  - Nếu xảy ra từ chối Reject(`output`) và có xử lý tại .then(result,`error`) thì xử lý sẽ ưu tiên xử lý ở .then mà không xử lý tại bắt lỗi .catch() mà chỉ xử lý ở .then(result,`error`)

```js
var pr = new Promise( // Object Constructor
  //Executor: Thực hiện xử lý nào đó.
  function (resolve, reject) {
    //Logic
    // - Thành công: resolve()
    // - Thất bại: reject()
    reject(dtError);
  }
);

//prettier-ignore
pr
.then(
  result => result,
  dtError => Executor(dtError) // Kết quả dtError từ reject(dtError);
)
.catch()
.finally();
```

- Ta kiểm tra ở ví dụ sau:

```js
var promise = new Promise(function (resolve, reject) {
  reject("Từ chối!");
});

promise
  .then(
    (rs) => rs,
    (error) => console.log("Error: ", error)
  )
  .catch((error) => console.log("Catch: ", error));

// Error:  Từ chối!
```
