# Cấu trúc và cách sử dụng Promise

---



  - [Mục tiêu:](#1-mục-tiêu)
  - [Promise](#2-promise)
  - [Cấu trúc Promises](#3-cấu-trúc-promises)
  - [Cách sử dụng Promise](#4-cách-sử-dụng-promise)
  - [Các thử nghiệm xử lý Promise](#5-các-thử-nghiệm-xử-lý-promise)
    - [1. Trạng thái **Pending**](#51-trạng-thái-pending)
    - [2. Trạng thái **fulfilled**](#52-trạng-thái-fulfilled)
    - [3. Trạng thái **Reject**](#53-trạng-thái-reject)
      - [Báo lỗi Uncaught (in promise) undefined](#531-báo-lỗi-uncaught-in-promise-undefined)
      - [Xử lý bắt lỗi](#532-xử-lý-bắt-lỗi)
  - [Xử lý dữ liệu Promises trả về](#6-xử-lý-dữ-liệu-promises-trả-về)
    - [Khi resolve()](#61-khi-resolve)
    - [Khi reject()](#62-khi-reject)
  - [Tóm tắt Promises](#7-tóm-tắt-promises)
  - [Trả lời khi được hỏi về Promise](#8-trả-lời-phỏng-vấn-nếu-được-hỏi-về-promise)


---
## 1. Mục tiêu:

- Promise là gì?
- Cách tạo một Promise đơn giản
- Cách sử dụng và hoạt động
- Các khái niệm và thuật ngữ liên quan
- Trả lời khi phỏng vấn khi được hỏi về Promise

## 2. Promise

- Trong `Promise` là một lời hứa xử lý một vấn đề nào đó.
- `Promise` là một đối tượng xử lý Bất đồng bộ
- `Promise` là một `Object Constructor` được cập nhật JavaScript từ phiên bản ECMAScript-06 (năm 2015)

## 3. Cấu trúc Promises

- Ta tạo đối tượng `new Promise` đơn giản từ một `Object Constructor` `Promise` có sẵn theo cấu trúc sau:

```js
var newPromise = new Promise(
  // Executor : Khối lệnh xử lý trước khi gán cho đối tượng newPromise
  function (resolve, reject) {
    //Logic: Xử lý Logic
    // 1. Thành công/Xử lý: resolve()
    // 2. Thất bại/Từ chối: reject()
  }
);
```

## 4. Cách sử dụng Promise

- Sau khi có được đối tượng Promise cần chạy gọi đối tượng Promise này và bắt các trạng thái của đối tượng theo các phương thức được trả về để xử lý Bất đồng bộ.

```js
newPromise.then().catch().finally();
```

- Các phương thức này đều nhận một callback là hàm function sẽ xử lý tương ứng các trạng thái trả về của đối tượng Promise.

```js
newPromise
  .then(function () {
    console.log("Successfully!");
  })
  .catch(function () {
    console.log("Failure!");
  })
  .finally(function () {
    console.log("Done!");
  });
```

- Các trạng thái liên quan đến xử lý Promise:
  - Nếu khối lệnh Executor xử lý Logic gọi resolve() - `thành công` thì callback sẽ thực thi khối lệnh ở phương thức .then()
  - Nếu khối lệnh Executor xử lý Logic gọi reject() - `từ chối` thì callback sẽ thực thi khối lệnh ở phương thức .catch() - `bắt lỗi/bẫy lỗi`, ở đây có thể thông báo message lỗi cho người dùng.
  - Nếu một trong hai hàm resolve() hoặc reject(), thì kế tiếp sẽ xử lý ở khối lệnh finally(), Ví dụ: có thể bắt đầu xử lý Promise bắt đầu chạy biểu tượng `Loading` xử lý, khi kết thúc Promise thì tắt biểu tượng `Loading` này đi.

## 5. Các thử nghiệm xử lý Promise

### 5.1 Trạng thái **Pending**
- Khi không gọi xử lý Resolve() và Reject() sẽ bị `Memory Leak`
- Và không có phương thức trả về sẽ ở trạng thái `Pending() `đang xử lý.

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // resolve()
  // reject()
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);
```

![Pending](./images/001.png 'Pending')
![Pending](./images/002.png 'Pending')

### 5.2 Trạng thái **fulfilled**

- Khi xử lý Resolve() , nhưng đối tượng không xử lý handle lỗi ở phương thức .then()


```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  resolve()
  // reject()
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  // .then(function () {
  //   console.log("Successfully!");
  // })
  .catch(function () {
    console.log("Failure!");
  })
  .finally(function () {
    console.log("Done!");
  });
```
![fulfilled](./images/002.png 'fulfilled')

- Khi xử lý Resolve() , đối tượng xử lý handle lỗi ở phương thức .then()

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  resolve()
  // reject()
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function () {
    console.log("Successfully!");
  })
  .catch(function () {
    console.log("Failure!");
  })
  .finally(function () {
    console.log("Done!");
  });
```

![fulfilled](./images/004.png 'fulfilled')


### 5.3 Trạng thái **Reject**
#### 5.3.1 Báo lỗi Uncaught (in promise) undefined
- Khi xử lý Reject() , nhưng đối tượng không xử lý handle lỗi ở phương thức .catch()


```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // resolve()
  reject()
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function () {
    console.log("Successfully!");
  })
  // .catch(function () {
  //   console.log("Failure!");
  // })
  .finally(function () {
    console.log("Done!");
  });
```

![Reject](./images/005.png 'Reject')
- Xuất hiện báo lỗi `Uncaught (in promise) undefined` nghĩa là chưa xử lý bắt lỗi Reject bị thiếu.
- Hoặc nếu không xử lý là hàm callback cũng sẽ báo lỗi:

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // resolve()
  reject();
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);
newPromise
  .then(console.log("Successfully!"))
  .catch(console.log("Failure!"))
  .finally(console.log("Done!"));
```
![Reject](./images/009.png 'Reject')
- Giống như chạy tất cả lệnh từ trên xuống dưới.

#### 5.3.2 Xử lý bắt lỗi
- Đối với xử lý Reject() khi xảy ra lỗi ta có thể bắt lỗi ở phương thức .catch như sau:

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // resolve()
  reject()
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function () {
    console.log("Successfully!");
  })
  .catch(function () {
    console.log("Failure!");
  })
  .finally(function () {
    console.log("Done!");
  });
```

![Reject](./images/006.png 'Reject')
- Đối với xử lý bắt lỗi từ Reject(), ngoài cách bắt lỗi nhờ phương thức khối lệnh .catch() ta có thể bắt lỗi ở khối lệnh .then như sau:


```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // resolve()
  reject()
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(
    function (resolve){
      console.log("Successfully!");
    }, 
    function (error){
      console.log("Error!") 
    } 
  )
  .catch(function () {
    console.log("Failure!");
  })
  .finally(function () {
    console.log("Done!");
  });
```
![Reject](./images/008.png 'Reject')

- Có thể viết gọn lại bằng Arrow Function như sau:

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // resolve()
  reject();
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(
    (resolve) => console.log("Successfully!"),
    (error) => console.log("Error!")
  )
  .catch(() => console.log("Failure!"))
  .finally(() => console.log("Done!"));
```

![Reject](./images/008.png 'Reject')

- Ta thấy là bắt lỗi sẽ không vào .catch() mà được ưu tiên xử lý ở .then(result, error)
- Nếu ở .catch() ta không truyền vào một hàm callback thì câu lệnh sẽ được nhảy thực thi ở .catch() sau đó mới chạy vào .then() bẫy lỗi, ta lưu ý các phương thức đều phải là hàm callback không nên gán là khối lệnh.

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // resolve()
  reject();
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(
    (resolve) => console.log("Successfully!"),
    (error) => console.log("Error!")
  ).catch(console.log("Failure!"))
  .finally(() => console.log("Done!"));
```

![Reject](./images/007.png 'Reject')

## 6. Xử lý dữ liệu Promises trả về
### 6.1 Khi resolve() 
- Sau khi Executor xử lý xong trả về đối tượng logic gọi đến hàm resolve(data) sẽ trả về một đối tượng Promise với dữ liệu data trong hàm resolve(data) sẽ được hứng handle xử lý tiếp ở phương thức .then()
- Việc xử lý thành công resolve(data) thường gặp khi lấy dữ liệu từ backend hoặc từ API (Application Programming Interface) trong thực tế.
- Ta xem xét ví dụ sau:

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  resolve("Học lập trình Javascript!!!")

});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function (data) {
    console.log("Successfully: ", data);
  })
  .catch(function () {
    console.log("Failure!");
  })
  .finally(function () {
    console.log("Done!");
  });
```
![Ví dụ Resolve](./images/010.png 'Resolve')
- Hoặc một mảng JSON thông qua API 

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  resolve([
    {
      id: 1,
      name: "Javascript"
    }, 
    {
      id: 2,
      name: "PHP"
    }, 
    {
      id: 3,
      name: "CSS"
    }, 
  ])

});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function (courses) {
    console.log("Successfully: ", courses);
  })
  .catch(function () {
    console.log("Failure!");
  })
  .finally(function () {
    console.log("Done!");
  });
```
![Ví dụ Resolve](./images/011.png 'Resolve')

### 6.2 Khi reject() 
- Khi gặp lỗi, thì data cũng sẽ trả về dữ liệu nằm trong reject(data)

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  reject([
    {
      id: 1,
      name: "Javascript",
    },
  ]);
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function (result) {
    console.log("Successfully: ", result);
  })
  .catch(function (error) {
    console.log("Failure: ", error);
  })
  .finally(function () {
    console.log("Done!");
  });
```
![Ví dụ Reject](./images/012.png 'Reject')
- Nhưng thông thường thì sẽ trả về mô tả lỗi để Dev có thể dễ dàng kiểm tra và khắc phục

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  reject("Lỗi request Timeout!");
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function (result) {
    console.log("Successfully: ", result);
  })
  .catch(function (error) {
    console.log("Failure: ", error);
  })
  .finally(function () {
    console.log("Done!");
  });
```

![Ví dụ Reject](./images/013.png 'Reject')

- Hoặc truyền vào một lỗi kiểu này:

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  reject(new Error("Lỗi request Timeout!"));
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function (result) {
    console.log("Successfully: ", result);
  })
  .catch(function (error) {
    console.error(error + '');
  })
  .finally(function () {
    console.log("Done!");
  });
```

![Ví dụ Reject](./images/014.png 'Reject')
- Nếu không có phương thức handle lỗi thì sẽ báo lỗi như sau:

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  reject(new Error("Lỗi request Timeout!"));
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(function (result) {
    console.log("Successfully: ", result);
  })
  // .catch(function (error) {
  //   console.error(error + '');
  // })
  .finally(function () {
    console.log("Done!");
  });
```
![Ví dụ Reject](./images/015.png 'Reject')
- Ta có thể bắt lỗi trên .then thay vì thiếu .catch như sau:

```js
var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  reject(new Error("Lỗi request Timeout!"));
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(
    function (result) {
      console.log("Successfully: ", result);
    },
    function (error) {
      console.error(error + "");
    }
  )
  // .catch(function (error) {
  //   console.error(error + '');
  // })
  .finally(function () {
    console.log("Done!");
  });
```
![Ví dụ Reject](./images/016.png 'Reject')
## 7. Tóm tắt Promises

- Như vậy các bước tạo một đối tượng Promise là:
  - Bước 1: Tạo mới 1 đối tượng Promise (`new Promise`)
  - Bước 2: Trong khối lệnh có hàm `callback` gồm 2 tham số `resolve` và `reject` (`function(resolve, reject)`)
  - Bước 3: Trong khối lệnh này sẽ xử lý (`Executor`) phân nhánh 1-Xử lý hoặc 2-Từ chối tương ứng:
    - 1. Thành công/Xử lý gọi hàm resolve()
    - 2. Thất bại/Từ chối gọi hàm reject()
- Trong khối xử lý `callback` `function(resolve, reject)` phải gọi hàm `resolve()` hoặc hàm `reject()` để tránh bị lỗi `Memory Leak` (Lỗi rò rỉ bộ nhớ), câu lệnh chạy liên tục gây lãng phí bộ nhớ, bị treo không thành công hay thất bại.
- Sau khi nhận được đối tượng Promise cần chạy gọi lệnh Promise này và bắt các trạng thái theo các phương thức được trở về để xử lý Bất đồng bộ.
- Đối tượng Promise sẽ có 3 phương thức bắt lỗi handle:
  - .then()
  - .catch()
  - .finally()
- Khi xử lý đối tượng Promise sẽ có 3 trạng thái trả về:
  - Pending (Đang xử lý) : Nếu Executor logic không trả về xử lý resolve() hoặc reject()
  - Fulfilled (Hoàn thành) : Nếu Executor logic trả về xử lý resolve()
  - Rejected (Từ chối) : Nếu Executor logic trả về xử lý reject()
- Dữ liệu data ở resolve(data) có thể dùng để truyền vào làm đối số ở hàm callback ở **`.then((data) => console.log(data))`**
- Khi reject() thì nên truyền vào error mô tả lỗi để có thể sử dụng thành đối số được sử dụng ở hàm callback ở .catch hoặc .then dùng handle bắt lỗi ở trạng thái Rejected.

## 8. Trả lời phỏng vấn nếu được hỏi về Promise
> **Hỏi: _Trình bày khái niệm về Promise_**

**Trả lời:**
- Là một Object Constructor được bổ sung từ phiên bản ECMAScript-06 (2015) để khắc phục tình trạng Callback Hell gặp phải khi xử lý bất đồng bộ.
- Trước khi có Promise, khi cần xử lý Bất đồng bộ thì thường sẽ sử dụng Callback để xử lý, nhưng với một số trường hợp cần xử lý đồng bộ theo thứ tự trong bất đồng bộ sẽ gặp tình trạng callback hell.
- Callback Hell làm cho việc đọc các câu lệnh rối rắm, khó hiểu và khi có vấn đề cần chỉnh sửa gặp nhiều khó khăn và dễ gây lỗi về cấu trúc cú pháp.
- Promise được bổ sung nhằm khắc phục tình trạng callback hell này
- Để tạo một đối tượng Promise từ Object Constructor ta dùng từ khóa `new Promise()`
- Trong khối lệnh Executor hàm callback của Promise sẽ có 2 hàm tham số là resolve() và reject(), để xử lý việc thực hiện 1 xử lý logic :
  - Gọi resolve() khi xử lý logic thành công 
  - Gọi reject() khi xử lý logic thất bại, hoặc từ chối xử lý.
- Khi đối tượng Promise được tạo ra, ta có thể sử dụng các phương thức .then, .catch và .finally() để handle lỗi trả về.
- .then và .catch đều là callback function đều nhận vào một tham số từ kết quả xử lý resolve(data) hay reject(error) ở khai báo xử lý logic.
- Đối tượng Promise có 3 trạng thái handle trả về đó là:
  - Pending: Khi khởi tạo nhưng xử lý Executor logic không gọi hàm resolve hoặc hàm reject
  - Fulfilled: Khi xử lý gọi hàm resolve(), xử lý tiếp ở callback tại .then
  - Rejected: Khi xử lý gọi hàm reject(), xử lý tiếp ở callback tại .catch
  
  ---