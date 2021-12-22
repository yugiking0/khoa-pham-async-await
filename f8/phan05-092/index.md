# Promise methods

---

- Promise.resolve
- Promise.reject
- Promise.all

---

### 1. Nhắc lại Promise Chain khi bị reject

- Ta xem lại ví dụ in liên tục các số thứ tự tăng dần sau mỗi giây.
- Xử lý gồm các khối .then liên tục.
- Nếu như .then không return là một Promise thì sẽ thực hiện tiếp khối .then kế tiếp mà không dừng lại

```js
function sleep(ms, data) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(++data), ms);
  });
}

sleep(1000, 0)
  .then(() => console.log('Line 1'))
  .then(() => console.log('Line 2'))
  .then(() => console.log('Line 3'))
  .then(() => console.log('Line 4'))
  .then(() => console.log('Line 5'));
```

![Promise Chain](./images/001.png 'Promise Chain')

```js
function sleep(ms, data) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(++data), ms);
  });
}

sleep(1000, 0)
  .then(function (data) {
    console.log('Line 1: ', data);
    return sleep(1000, data);
  })
  .then(function (data) {
    setTimeout(() => console.log('Line 2: ', data), 1000);
  })
  .then(function (data) {
    setTimeout(() => console.log('Line 3: ', data), 1000);
  })
  .then(function (data) {
    console.log('Line 4: ', data);
  })
  .then(function (data) {
    console.log('Line 5: ', data);
  });
```

![Promise Chain](./images/002.png 'Promise Chain')

- Nếu .then return là một Promise thì xử lý chuỗi này tạm dừng lại chờ kết quả Promise, sau đó mới chạy tiếp khối .then kế tiếp.

```js
function sleep(ms, data) {
  return new Promise(function (resolve) {
    console.log(`Line ${data} : ${data}`);
    setTimeout(() => resolve(++data), ms);
  });
}

sleep(1000, 1)
  .then(function (data) {
    return sleep(1000, data);
  })
  .then(function (data) {
    return sleep(1000, data);
  })
  .then(function (data) {
    return sleep(1000, data);
  })
  .then(function (data) {
    return sleep(1000, data);
  });
```

![Promise Chain](./images/003.png 'Promise Chain')

- Nếu trong chuỗi xử lý Promise Chain có xử lý Reject thì chuỗi sẽ bị dừng lại tại vị trí khối lệnh .then đó.

```js
function sleep(ms, data) {
  return new Promise(function (resolve) {
    console.log(`Line ${data} : ${data}`);
    setTimeout(() => resolve(++data), ms);
  });
}

sleep(1000, 1)
  .then(function (data) {
    return sleep(1000, data);
  })
  .then(function (data) {
    return new Promise(function (resolve, reject) {
      reject();
    });
  })
  .then(function (data) {
    return sleep(1000, data);
  })
  .then(function (data) {
    return sleep(1000, data);
  });
```

![Promise Chain](./images/004.png 'Promise Chain')

- Ta bổ sung thêm xử lý .catch để bắt lỗi khi Reject để tránh xử lý bị Memory Leak

```js
function sleep(ms, data) {
  return new Promise(function (resolve) {
    console.log(`Line ${data} : ${data}`);
    setTimeout(() => resolve(++data), ms);
  });
}

sleep(1000, 1)
  .then(function (data) {
    return sleep(1000, data);
  })
  .then(function (data) {
    return new Promise(function (resolve, reject) {
      reject('Dừng lại!');
    });
  })
  .then(function (data) {
    return sleep(1000, data);
  })
  .then(function (data) {
    return sleep(1000, data);
  })
  .catch(function (err) {
    console.error(err);
  });
```

![Promise Chain](./images/005.png 'Promise Chain')

- Khi gặp khối lệnh .then reject() thì chuỗi xử lý sẽ bỏ qua xử lý những .then tiếp theo.
- Trong một chuỗi Promise không phải mọi xử lý công đoạn đều thành công, mà có thể 1 mắc xích nào đó gặp lỗi.

### 3. Promise.resolve

- Đối tượng Promise được xử lý Resolve - Thành công

```js
var newPromise = new Promise(function (resolve, reject) {
  resolve('Success!');
});

newPromise.then(function (result) {
  console.log('Result: ', result);
});

// Result:  Success!
```

- Trong thực tế, đôi khi Debug hoặc xử lý nào đó cần xử lý ngay trả về một Promise thành công thì có thể dùng cách dùng đơn giản hơn bằng `Promise.resolve`

```js
var newPromise = Promise.resolve('Success!');

newPromise
  .then(function (result) {
    console.log('Result: ', result);
  })
  .catch(function (err) {
    console.log('Error: ', err);
  });

// Result:  Success!
```

- Không cần `new Promise`, cũng như function xử lý Logic phân nhánh.

### 4. Promise.reject

```js
var newPromise = new Promise(function (resolve, reject) {
  // resolve('Success!');
  reject('Failure!');
});

newPromise
  .then(function (result) {
    console.log('Result: ', result);
  })
  .catch(function (err) {
    console.log('Error: ', err);
  });

// Error:  Failure!
```

- Tương tự có thể viết nhanh một Promise bị rejected bằng câu lệnh:

```js
var newPromise = Promise.reject('Failure!');
newPromise
  .then(function (result) {
    console.log('Result: ', result);
  })
  .catch(function (err) {
    console.log('Error: ', err);
  });

// Error:  Failure!
```

- Không cần `new Promise`, cũng như function xử lý Logic phân nhánh, viết thẳng luôn thành `Promise.reject(err)`
- Nguyên nhân một số Thư viện xử lý dữ liệu sẽ luôn trả về là một Promise như: fetch, axios,... nên để kiểm tra Debug ta sẽ xử lý viết nhanh chỗ này để kiểm tra chấp nhận việc lấy dữ liệu trả lại đối tượng thành công hoặc thất bại.

### 5. Promise.all

- Promise.all sẽ giúp chạy song song nhiều xử lý bất đồng bộ Promise thay vì viết thành nhiều khối lệnh tách rời, ta sẽ gom chung lại thành 1 mảng để xử lý.

- Với cách xử lý bằng phương thức Promise.all sẽ xử lý song song đồng thời cùng lúc các đối tượng Promise theo kiểu mảng, và sẽ trả về dạng mảng.
- Ví dụ: Ta có 3 xử lý Task1, Task2, Task3 cần xử lý bất đồng bộ.
  - Task 1: Cần 1000ms
  - Task 2: Cần 4000ms
  - Task 3: Cần 6000ms
- Nếu tách ra xử lý như Promise Chain sẽ mất tổng cộng là 11s
- Nhưng nếu xử lý chung bằng Promise.all xử lý bất đồng bộ thì chỉ mất thời gian của Task 3 lâu nhất là 6s.

```js
function tOut(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${t} ms`);
    }, t);
  });
}
var time_start = new Date();

// Resolving a normal promise
tOut(1000)
  .then(function (res) {
    console.log('Task 1: ', res);
    return tOut(4000);
  })
  .then(function (res) {
    console.log('Task 2: ', res);
    return tOut(6000);
  })
  .then(function (res) {
    console.log('Task 3: ', res);
    console.log('Total time normal promise: ', new Date() - time_start);
  });

// Promise.all
//prettier-ignore
Promise.all([tOut(1000), tOut(4000), tOut(6000)])
  .then(function (res) {
    console.log('Total time Promise.all: ', new Date() - time_start);
  }
);
```

![Promise.all](./images/008.png 'Promise.all')

- Ví dụ: Gộp 2 mảng bất đồng bộ thành 1 mảng mới
  - Mảng 1 lấy dữ liệu mất 2s.
  - Mảng 2 lấy dữ liệu mất 5s.

```js
var pr1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2]);
  }, 4000);
});

var pr2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([3, 4, 5]);
  }, 4000);
});

Promise.all([pr1, pr2]).then((res) => {
  console.log('Result: ', res);
  console.log(res[0].concat(res[1]));
});
```

![Promise.all](./images/006.png 'Promise.all')

- Với xử lý Promise.all sẽ mất thời gian là 5000ms.
- Nếu tồn tại một Promise trong mảng bị từ chối, thì xử lý Promise.all sẽ bị từ chối.

```js
var pr1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2]);
  }, 4000);
});

var pr2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([3, 4, 5]);
  }, 4000);
});

var pr3 = Promise.reject('Error');

Promise.all([pr1, pr2, pr3])
  .then((res) => {
    console.log('Result: ', res);
    console.log(res[0].concat(res[1]));
  })
  .catch((err) => {
    console.error(err);
  });
```

![Promise.all](./images/007.png 'Promise.all')

- Ta so sánh xử lý theo từng Promise và xử lý chung Promise.all

```js
function load1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2]);
    }, 2000);
  });
}

function load2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([3, 4, 5]);
    }, 3000);
  });
}

var time_start = new Date();
var arr = [];

// Resolving a normal promise
load1()
  .then(function (res1) {
    console.log(`Task 1: Completed in ${new Date() - time_start} ms`);
    arr = arr.concat(res1);
    return load2();
  })
  .then(function (res2) {
    console.log(`Task 2: Completed in ${new Date() - time_start} ms`);
    arr = arr.concat(res2);
    console.log(
      `Completed Single Promise in ${new Date() - time_start} ms : `,
      arr
    );
  });

// Resolving Promise.all
Promise.all([load1(), load2()]).then(function (res) {
  console.log(
    `Completed Promise.all in ${new Date() - time_start} ms : `,
    res[0].concat(res[1])
  );
});
```

![Promise.all](./images/009.png 'Promise.all')
