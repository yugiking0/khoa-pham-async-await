# Promise Chain

---

- [1. Nhắc lại Callback Hell](#1-nhắc-lại-callback-hell)
- [2. Tính chất chuỗi của Promise](#2-tính-chất-chuỗi-của-promise)
  - [Tạo các khối .then liên tiếp](#21-tạo-các-khối-then-liên-tiếp)
  - [Tạo các khối .then liên tiếp có xử lý setTimeOut](#22-tạo-các-khối-then-liên-tiếp-có-xử-lý-settimeout)
  - [Tạo các khối .then liên tiếp, có xử lý return giá trị](#23-tạo-các-khối-then-liên-tiếp-có-xử-lý-return-giá-trị)
  - [Tạo các khối .then liên tiếp return giá trị, có setTimeOut](#24-tạo-các-khối-then-liên-tiếp-return-giá-trị-có-settimeout)
  - [Tạo khối liên tiếp và có xử lý setTimeOut -> Promise](#25-tạo-khối-liên-tiếp-và-có-xử-lý-settimeout-promise)
  - [Tạo khối liên tiếp và có xử lý Promise -> setTimeout](#26-tạo-khối-liên-tiếp-và-có-xử-lý-promise-settimeout)
  - [Tạo khối liên tiếp và có xử lý Promise có Reject](#27-tạo-khối-liên-tiếp-và-có-xử-lý-promise-có-reject)
- [3. Áp dụng in số thứ tự sau mỗi giây](#3-áp-dụng-in-số-thứ-tự-sau-mỗi-giây)
  - [3.1 Bài tập](#31-bài-tập)
  - [3.2 Xử lý](#32-xử-lý)

---

- Tính chất chuỗi của Promise (Promise Chain)

## 1. Nhắc lại Callback Hell

- Việc các câu lệnh bị lồng nhau thành nhiều tầng và lớp, rất khó khi chỉnh sửa hay thêm 1 câu lệnh nào đó bổ sung sẽ dễ sai xót các dấu ngoặc nhọn hoặc dấu ngoặc tròn dẫn đến câu lệnh bị sai, nếu tăng số lượng các file cần đọc lên nhiều 10, 100, 1000,... thì việc điều chỉnh những câu lệnh này sẽ rất khó khăn và dễ sai xót dẫn đến lỗi.
- Với Promise sẽ khắc phục được lỗi `Callback Hell`, bằng cách xử lý gọi lệnh từng dòng chạy song song, dễ nhìn và dễ chỉnh sửa.

## 2. Tính chất chuỗi của Promise

- Ta xem lại cách tạo một đối tượng Promise

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Resolve');
});

newPromise
  .then((result) => console.log('Successfully: ', result))
  .catch((error) => console.error(error + ''));
```

### 2.1 Tạo các khối .then liên tiếp

- Tạo handle của Promise với nhiều khối lệnh .then liên tiếp

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Success!');
});

newPromise
  .then(() => console.log(1)) // Line 1
  .then(() => console.log(2)) // Line 2
  .then(() => console.log(3)) // Line 3
  .catch((error) => console.error(error + ''))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/001.png 'Promise Chain')

- Ta thấy sau khi chạy xong .then thứ nhất, sẽ chạy tiếp .then thứ 2 rồi mới chạy tiếp .then thứ ba.

### 2.2 Tạo các khối .then liên tiếp có xử lý setTimeOut

- Tạo handle của Promise với nhiều khối lệnh .then liên tiếp, trong đó có xử lý setTimeOut để kiểm tra các .then là xử lý bất đồng bộ hay đồng bộ.

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Success!');
});

newPromise
  .then(() => console.log(1)) // Line 1
  .then(() => {
    setTimeout(() => {
      console.log(2); // Line 2
    }, 1000);
  })
  .then(() => console.log(3)) // Line 3
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/002.png 'Promise Chain')

- Như vậy khi .then thì xử lý ở đây vẫn là bất đồng bộ không theo thứ tự từng khối line.

### 2.3 Tạo các khối .then liên tiếp, có xử lý return giá trị

- Một tính chất của Promise đó là có tính thừa hưởng giá trị của từng khối lệnh .then trong chuỗi (Promise Chain)

```js
var newPromise = new Promise((resolve, reject) => {
  resolve();
});

//prettier-ignore
newPromise
  .then(function () {
    console.log('Line1'); // Line 1
  }) 
  .then(function (data) {
    console.log('Line2 : ', data); // Line 2
    return 2
  })
  .then(function (data) {
    console.log('Line3 : ', data); // Line 3
  })
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/000.png 'Promise Chain')

- Nếu khối lệnh .then phía trước nếu không return một giá trị thì tham số data của khối lệnh .then trong callback kế tiếp sẽ là giá trị `Undefine`

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Success!');
});

newPromise
  .then((rs) => {
    console.log(rs); // line Success
    return 1;
  })
  .then((line2) => {
    console.log(line2); // line 1
    return 2;
  })
  .then((line3) => {
    console.log(line3); // line 2
    return 3;
  })
  .then((line4) => {
    console.log(line4); // line 3
  })
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/003.png 'Promise Chain')

- Giá trị được return của khối lệnh .then callback phía trước sẽ trở thành tham số của khối lệnh .then trong callback phía sau.

### 2.4 Tạo các khối .then liên tiếp return giá trị, có setTimeOut

- Tạo các khối .then liên tiếp có return giá trị, và có setTimeOut để kiểm tra kế thừa giá trị và bất đồng bộ hay đồng bộ.

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Success!');
});

newPromise
  .then((rs) => {
    setTimeout(() => {
      console.log('Line 1: ', rs); // line 1
      return 1;
    }, 4000);
  })
  .then((line2) => {
    setTimeout(() => {
      console.log('Line 2: ', line2); // line 2
      return 2;
    }, 3000);
  })
  .then((line3) => {
    setTimeout(() => {
      console.log('Line 3: ', line3); // line 3
      return 3;
    }, 2000);
  })
  .then((line4) => {
    setTimeout(() => {
      console.log('Line 4: ', line4); // line 4
    }, 1000);
  })
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/004.png 'Promise Chain')

- Xử lý bất đồng bộ nếu như không return một Promise thì sẽ chạy xử lý tiếp ở .then kế tiếp mà không chờ xử lý.

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Success!');
});

newPromise
  .then((rs) => {
    setTimeout(() => {
      return 1;
    }, 4000);
  })
  .then((data) => {
    setTimeout(() => {
      console.log('Line 2: ', data); // line 2
      return 2;
    }, 3000);
  })
  .then((data) => {
    setTimeout(() => {
      console.log('Line 3: ', data); // line 3
      return 3;
    }, 2000);
  })
  .then((data) => {
    setTimeout(() => {
      console.log('Line 4: ', data); // line 4
    }, 1000);
  })
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/005.png 'Promise Chain')

- Ta thấy ở các .then này vẫn chạy theo tính chất đồng bộ và nếu không chạy xử lý .then phía trước không return đối tượng Promise.

### 2.5 Tạo khối liên tiếp và có xử lý setTimeOut -> Promise

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Success!');
});

newPromise
  .then((data) => {
    setTimeout(() => {
      return new Promise((resolve) => {
        console.log('Line 1: ', data); // Line 1
        resolve(2);
      });
    }, 2000);
  })
  .then((data) => {
    setTimeout(() => {
      return new Promise((resolve) => {
        console.log('Line 2: ', data); // Line 2
        resolve(3);
      });
    }, 1000);
  })
  .then((data) => {
    console.log('Line 3: ', data); // Line 3
  })
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/007.png 'Promise Chain')

- Ta thấy các khối lệnh .then do chạy setTimeout trước nên bị lướt qua chạy bất đồng bộ, sau đó chạy tiếp các .then kế tiếp mà không chờ xử lý Promise trong khối lệnh setTimeout

- Như vậy nếu khối lệnh .then không xử lý return trả về một đối tượng Promise thì vẫn chạy theo kiểu đồng bộ chạy tiếp câu lệnh kế tiếp, nếu có xử lý setTimeOut thì sẽ chạy ngầm và chạy tiếp xử lý ở .then kế tiếp mà không dừng lại chờ.

### 2.6 Tạo khối liên tiếp và có xử lý Promise -> setTimeout

```js
var newPromise = new Promise((resolve, reject) => {
  resolve('Success!');
});

newPromise
  .then((data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Line 1: ', data); // Line 1
        resolve(1);
      }, 3000);
    });
  })
  .then((data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Line 2: ', data); // Line 2
        resolve(2);
      }, 2000);
    });
  })
  .then((data) => {
    console.log('Line 3: ', data); // Line 3
  })
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/006.png 'Promise Chain')

- Với xử lý .then xử lý return trả về một Promise thì các khối lệnh .then chạy theo xử lý Đồng bộ theo thứ tự và chờ xử lý xong câu lệnh .then phía trước mới chạy tiếp các khối lệnh .then kế tiếp.

```js
var newPromise = new Promise((resolve, reject) => {
  resolve();
});

//prettier-ignore
newPromise
  .then(function () {
    return new Promise((resolve) => {
      console.log('Line1'); // Line 1
      setTimeout(resolve,3000)
    })
  })
  .then(function (data) {
    console.log('Line2'); // Line 2
    return 2
  })
  .then(function (data) {
    console.log('Line3 : ', data); // Line 3
  })
  .catch(() => console.error('Error!'))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/008.png 'Promise Chain')

### 2.7 Tạo khối liên tiếp và có xử lý Promise có Reject

- Ta xen kẻ nhiều đối tượng Promise xử lý Reject() để kiểm tra kết quả trả về.

```js
var newPromise = new Promise((resolve, reject) => {
  resolve();
});

//prettier-ignore
newPromise
  .then(function () {
    return new Promise((resolve) => {
      console.log('Line1'); // Line 1
      setTimeout(() => {
        resolve(2);
      },3000)
    })
  })
  .then(function (data) {
    return new Promise((resolve, reject) => {
      console.log('Line2: ', data); // Line 2
      setTimeout(() => {
        reject("Error1") // Rejected 1
      },2000)
    })
  })
  .then(function (data) {
    return new Promise((resolve) => {
      console.log('Line3: ', data); // Line3
      setTimeout(() => {
        resolve(3) // Resolve
      },2000)
    })
  })
  .catch((error) => console.error('Error 1: ', error))
  .then(function (data) {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
        console.log('Line4: ', data); // Line 4
        reject("Error1") // Rejected 2
      },2000)
    })
  })
  .catch((error) => console.error('Error: ',error)) // Rejected Catch
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/009.png 'Promise Chain')

- Như vậy với mỗi Reject() của .then thì sẽ tìm khối lệnh .catch gần nhất để xử lý, sau đó chạy tiếp khối lệnh .then phía sau của .catch

```js
var newPromise = new Promise((resolve, reject) => {
  resolve();
});

//prettier-ignore
newPromise
  .then(function () {
    return new Promise((resolve) => {
      console.log('Line1'); // Line 1
      setTimeout(() => {
        resolve(2);
      },3000)
    })
  })
  .then(function (data) {
    return new Promise((resolve, reject) => {
      console.log('Line2: ', data); // Line 2
      setTimeout(() => {
        reject("Error1") // Rejected 1
      },2000)
    })
  })
  .then(function (data) {
    return new Promise((resolve) => {
      console.log('Line3: ', data); // Line 3
      setTimeout(() => {
        resolve(3)
      },2000)
    })
  })
  .then(function (data) {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
        console.log('Line4: ', data); // Line 4
        reject("Error1")
      },2000)
    })
  })
  .catch((error) => console.error('Error: ',error))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/010.png 'Promise Chain')

- Như vậy khi gặp đối tượng Promise có Reject() thì sẽ nhảy đến xử lý ở khối lệnh .catch gần nhất, nếu sau khối lệnh .catch không có khối lệnh .then thì xử lý handle đối tượng newPromise sẽ được dừng lại.
- Với các khối lệnh .then khi trả về đối tượng Promise thì có thể dùng chung một khối lệnh .catch và từ khối lệnh .then được return sẽ không chạy xử lý tiếp các khối lệnh .then còn lại, như vậy chuỗi .then hay tính chất chuỗi của Promise Chain sẽ được dừng lại khi gặp xử lý .then return trả về một đối tượng Promise bị Rejected thì sẽ dừng lại không xử lý tiếp các khối lệnh .then tiếp theo phía sau.

## 3. Áp dụng in số thứ tự sau mỗi giây

### 3.1 Bài tập

> Bài tập: In ra màn hình các số theo thứ tự sau mỗi giây, không dùng setInterval.

```js
function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      return resolve();
    }, ms);
  });
}

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

sleep(1000)
  .then(function (data) {
    console.log(1);
    return sleep(1000);
  })
  .then(function (data) {
    console.log(2);
    return sleep(1000);
  })
  .then(function (data) {
    console.log(3);
    return sleep(1000);
  })
  .then(function (data) {
    console.log(4);
    return sleep(1000);
  })
  .then(function (data) {
    console.log(5);
    return sleep(1000);
  })
  .catch((error) => console.error('Error: ', error))
  .finally(() => console.log('Done!'));
```

```js
function sleep(ms, data) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(++data), ms);
  });
}

sleep(1000, 0)
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .catch((error) => console.error('Error: ', error))
  .finally(() => console.log('Done!'));
```

### 3.2 Xử lý

- Xử lý thành Arrow Function sẽ viết gọn lại như sau:

```js
function printLog(ms, count) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      count++;
      console.log(count);
      return resolve(count);
    }, ms);
  });
}

printLog(1000, 0)
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .then((data) => printLog(1000, data))
  .catch((error) => console.error('Error: ', error))
  .finally(() => console.log('Done!'));
```

![Promise Chain](./images/011.png 'Promise Chain')

---
