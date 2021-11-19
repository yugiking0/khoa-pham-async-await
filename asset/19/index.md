# Toàn tập về Javascript Async Await – Tại sao lại nên dùng?

---

`Javascript Async await` được giới thiệu từ phiên bản **NodeJS 7.6** và hiện tại thì nó được hỗ trợ trên tất cả các trình duyệt hiện đại.

Mình làm việc với `Javascript` cũng được một thời gian. Từ ngày mình cảm thây vui vẻ với `callback`, rồi sung sướng tột độ với `Promise`, cuối cùng thì vỡ òa với `Async/await` 🙂

Ngay từ cái tên gọi `Javascript async await` của nó cũng đã nói lên phần nào về tác dụng. Nó cũng giống với `Promise` hay `callback` về công dụng, tức là viết code không đồng bộ theo luồng logic đồng bộ.

Bài viết này chúng ta sẽ cùng nhau tìm hiểu tất cả những khía cạnh của `Async/await`, lý do tại sao chúng ta nên sử dụng nó thay vì `Promise`.

- [1. Giới thiệu Async/await](#1-giới-thiệu-asyncawait)
- [2. Cú pháp của Async/await](#2-cú-pháp-của-asyncawait)
  - [Async](#21-async)
  - [Await](#22-await)
- [3. Một vài lưu ý khi sử dụng Async/Await](#3-một-vài-lưu-ý-khi-sử-dụng-asyncawait)
  - [Await không thể viết bên ngoài Async.](#31-await-không-thể-viết-bên-ngoài-async)
  - [Không thể dùng Await bên trong một hàm thông thường](#32-không-thể-dùng-await-bên-trong-một-hàm-thông-thường)
  - [Async Await làm cho code thực hiện tuần tự](#33-async-await-làm-cho-code-thực-hiện-tuần-tự)
- [4. Lý do nên sử dụng Async/Await](#4-lý-do-nên-sử-dụng-asyncawait)
  - [Code ngắn gọn, dễ đọc](#41-code-ngắn-gọn-dễ-đọc)
  - [Error handling](#42-error-handling)
  - [Khắc phục triệt để điều kiện lồng nhau](#43-khắc-phục-triệt-để-điều-kiện-lồng-nhau)
  - [Dễ Debugging hơn](#44-dễ-debugging-hơn)
- [5. Tạm kết](#5-tạm-kết)

---

## 1. Giới thiệu Async/await

Trước khi chúng ta bắt đầu vào tìm hiểu kỹ hơn, mình sẽ giới thiệu qua một số thông tin:

- `Async/await` là một giải pháp mới để viết code không đồng bộ. Trước đây, chúng ta có hai giải pháp đó là dùng `Callback` và `Promise`.
- `Async/await` thực sự chỉ là cách viết `syntax` được xây dựng từ `promise`. Nó không được sử dụng với `plain callback` hay `node callback`.
- `Async/await` giống như `promises`, là `non blocking`.
- `Async/await` làm cho đoạn mã không đồng bộ trông giống như mã đồng bộ. Đây chính là ưu điểm của nó so với `callback` và `promise`.

## 2. Cú pháp của Async/await

Giả sử, chúng ta có một hàm `getJSON()` trả về một `promise`, và `promise` này sẽ đưa kết quả là đối tượng `JSON`. Khi nhận được kết quả thì chúng chỉ log nó ra màn hình `console` và `return` là `message “done”`.

Nếu dùng `Promise`, chúng ta sẽ viết code như sau:

```js
const makeRequest = () =>
  getJSON().then((data) => {
    console.log(data);
    return 'done';
  });
makeRequest();
```

Còn nếu dùng Async/await thì nó sẽ “đẹp đẽ” như sau:

```js
const makeRequest = async () => {
  console.log(await getJSON());
  return 'done';
};
makeRequest();
```

Để phân tích điểm khác biệt giữa hai cách viết trên:

- Chúng ta sử dụng từ khóa `async` trước một hàm. Từ khóa `await` chỉ được sử dụng bên trong một hàm được định nghĩa bằng khóa `async`. Bất kỳ hàm nào được khái báo với từ khóa `async` đều sẽ ngầm trả về một `promise`. Và `Promise` này sẽ `resolve` bất kỳ giá trị nào được trả về bằng từ khóa `return` (trong trường hợp trên thì `promise` sẽ `resolve message “done”`).

- `await getJSON()` tức là hàm `console.log()` nó sẽ đợi cho đến khi hàm `getJSON()` lấy được kết quả.

### 2.1 Async

Như mình đã nói ở trên, hàm `Async` cho phép chúng ta viết code không đồng bộ mà nhìn như đồng bộ. Nó hoạt động không đồng bộ thông qua `event-loop`.

Các hàm `async` luôn trả về một giá trị. Đó là một `promise`.

```js
async function firstAsync() {
  return 'VNTALKING.COM';
}
firstAsync().then(alert); // "VNTALKING.COM"
```

Bạn chạy đoạn mã trên nếu thấy có một `alert` với nội dung `“VNTALKING.COM”` thì tức là một `promise` đã được trả về. Nều không thì từ khóa `then()` không có ý nghĩa, nó không làm gì cả.

### 2.2 Await

Từ khóa `Await` được dùng để chờ một `promise` được trả về. Nó chỉ được sử dụng bên trong một đoạn code có `Async`.

Từ khóa `Await` sẽ báo cho `Javascript` chờ cho đến khi `promise` trả về một giá trị.

> Lưu ý: `Await` chỉ làm cho khối có từ khóa `Async` phải chờ thôi nhé, chứ không phải là toàn bộ chương trình phải chờ.

Mình sẽ minh họa bằng đoạn code bên dưới đây:

```js
async function firstAsync() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 1000)
    });
    // wait until the promise returns us a value
    let result = await promise;

    // "Now it's done!"
    alert(result);
    }
};

firstAsync();
```

## 3. Một vài lưu ý khi sử dụng Async/Await

Dưới đây là một vài điểm mà các bạn cần lưu ý khi sử dụng `Async/Await`. Có những cái lỗi mà bị vi phạm thì nó `waring` luôn nên cũng không quan ngại lắm. Ví dụ như cái số 1 bên dưới đây.

### 3.1 Await không thể viết bên ngoài Async.

Chúng ta không thể sử dụng `await` ở bên ngoài hàm được định nghĩa với `async`.

```js
// Không thể viết như thế này.
// await makeRequest()
// Viết như này thì được.
makeRequest().then((result) => {
  // làm một cái gì đó ở đây.
});
```

### 3.2 Không thể dùng Await bên trong một hàm thông thường

`Await` bắt buộc phải đi kèm với `Async`. Vì vậy, nếu một hàm thông thường (không khai báo với từ khóa `async`) thì không sử dụng được `Await`.

```js
function firstAsync() {
  let promise = Promise.resolve(10);
  let result = await promise; // Syntax error
}
```

Nếu muốn sử dụng `Await` thì thêm từ khóa `async` khi khai báo hàm. Như thế này nhé:

```js
async function firstAsync() {
  let promise = Promise.resolve(10);
  let result = await promise; // Syntax error
}
```

### 3.3 Async Await làm cho code thực hiện tuần tự

Mặc dù không phải là điều xấu, nhưng có vẻ thực hiện các tác vụ đồng thời thì sẽ nhanh hơn.

Mình ví dụ:

```js
async function sequence() {
  await promise1(50); // đợi 50ms…
  await promise2(50); // …sau đó đợi thêm 50ms.
  return 'done!';
}
```

- Đoạn `code` mất tổng cộng 100ms để hoàn thành.
- Điều này xảy ra là do đoạn code trên chạy theo đúng trình tự lần lượt từ trên xuống dưới.
- Hai promise được được trả lại, và mỗi promise mất 50ms để hoàn thành.
- Promise thứ 2 chỉ được thực hiện sau khi promise thứ nhất đã hoàn thành.

Đây không phải là cách làm tốt, nếu các tác vụ cần nhiều thời gian để hoàn thành, chúng ta cần phải thực hiện đồng thời.

Chúng ta có giải pháp để giải quyết bài toán này. Đó là sử dụng `Promise.all()`

> **Theo như mô tả của MDN:**

> _The `Promise.all()` method returns a single **Promise** that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects._

Chúng ta sẽ chuyển đoạn code trên thành như sau:

```js
async function sequence() {
  await Promise.all([promise1(), promise2()]);
  return 'done!';
}
```

Hàm `Promise.all()` được `resolve` khi tất cả các `promise` bên trong nó được `resolve`.

## 4. Lý do nên sử dụng Async/Await

Sau khi các bạn đã hiểu rõ hơn về `Javascript` `Async Await` thì có ai đặt câu hỏi là:**_Thế cái “của nợ” này tốt hơn `Promise` hay `Callback` chỗ nào? Nó vẫn thế mà!!!_**

Nếu ai hỏi như vậy thì mình thực sự thấy vui vì bạn đã rất chủ động tư duy. Để mình chỉ ra một vài ưu điểm nổi bật của `Javascript Async Await`, để xem có đáng sử dụng không nhé.

### 4.1 Code ngắn gọn, dễ đọc

Rõ ràng là cách viết với `async/await` làm mã ngắn gọn hơn rất nhiều. Như ví dụ ở đầu bài viết, các bạn cũng thấy khá rõ. Có một cái hay ho là mặc dù viết mã ngắn gọn hơn nhưng nó lại không làm cho code trở nên khó hiểu, ngược lại, nó còn dễ đọc hơn.

```js
const makeRequest = () =>
  getJSON().then((data) => {
    console.log(data);
    return 'done';
  });
makeRequest();
```

Còn nếu dùng Async/await thì nó sẽ “đẹp đẽ” như sau:

```js
const makeRequest = async () => {
  console.log(await getJSON());
  return 'done';
};
makeRequest();
```

Ngoài ra, việc dùng `async/await` cũng khắc phục được triệt để vấn đề `callback hell`, thậm chí cả `promise hell`.

### 4.2 Error handling

`Async/Await` giúp có thể xử lý cả lỗi đồng bộ và bất đồng bộ với cùng một cấu trúc `try-catch`.

Như trong ví dụ bên dưới đây với `promise`, `try/catch` sẽ không thể xử lý được với lỗi nếu `JSON.parse` bị `failed`, vì nó xảy ra bên trong `promise`. Chúng ta cần phải gọi thêm một .`catch` cùng với `promise`, `duplicate` đoạn mã xử lý lỗi.

```js
const makeRequest = () => {
  try {
    getJSON()
      .then(result => {
        // this parse may fail
        const data = JSON.parse(result)
        console.log(data)
      })
      // uncomment this block to handle asynchronous errors
      // .catch((err) => {
      //   console.log(err)
      // })
  } catch (err) {
    console.log(err)
  }
```

Nào, bây giờ chúng sẽ viết lại đoạn mã trên với `async/await`

```js
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON());
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
```

### 4.3 Khắc phục triệt để điều kiện lồng nhau

Hãy thử tưởng tượng một bài toán mà cần phải thực hiện như bên dưới:

```js
  return getJSON()
    .then(data => { // .then 1
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => { // .then 2
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
```

Mặc dù với đoạn mã này không phải là `callback hell`, nhưng với điều kiện lồng nhau như vậy cũng đủ làm người đọc phải đau đầu.

Nếu dùng `Async/await` thì vấn đề sẽ được giải quyết:

```js
const makeRequest = async () => {
  const data = await getJSON();
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData);
    return moreData;
  } else {
    console.log(data);
    return data;
  }
};
```

### 4.4 Dễ Debugging hơn

Dù lập trình bằng ngôn ngữ nào đi chăng nữa thì vấn đề `debug` luôn quan trọng.

Đây là một ưu điểm mà mình đánh giá rất cao. Nếu bạn dùng `promise`, khi `debug`, bạn sẽ gặp phải 2 vấn đề hơi nhức nhối:

- Bạn không để đặt `breakpoint` vào các `arrow functions` mà trả về một `expressions` (không có body).

- Nếu bạn đặt `breakpoint` bên trong một đoạn code `.then()`. Khi `debug`, bạn sử dụng phím tắt như `step-over` thì nó sẽ không nhảy sang hàm `.then()` tiếp theo như ý bạn.

  ![Promise](./image/001.png 'Promise')

  Với `Async/await` thì bạn sẽ khắc phục được hay nhược điểm trên.

  ![Async/await](./image/002.png 'Async/await')

## 5. Tạm kết

`Javascript async await` là một trong những tính năng tốt nhất được thêm vào `Javascript`. Nó giúp cho mã nguồn của bạn rõ ràng, sạch đẹp hơn rất nhiều.

---
