# Xử Lý Bất Đồng Bộ Trong Javascript - Phần 1

---

Chắc chắn khi lập trình, bạn sẽ có các công việc cần thời gian delay (gọi API, lấy dữ liệu từ Database, đọc/ghi file,…). Và đây chính là lúc xử lý bất đồng bộ lên ngôi, hãy cùng mình tìm hiểu về bất đồng bộ trong Javascript và chúng giúp code dễ dàng hơn thế nào nhé.

Trong phần đầu tiên này, chúng ta sẽ cùng tìm hiểu và khái niệm cũng như một số phương án xử lý hay dùng.

## 1. Quá trình đồng bộ (Synchronous)

Đây là một quá trình đã rất quen thuộc với chúng ta. Về cơ bản thì quá trình này gồm các câu lệnh được thực hiện theo thứ tự lần lần lượt, câu lệnh thứ nhất phải hoàn thành thì mới có thể thực hiện câu lệnh thứ 2, …

Ví dụ, đây là một đoạn code của quá trình đồng bộ:

```js
console.log('job1');
console.log('job2');
console.log('job3');
//Các câu lệnh sẽ chạy lần lượt và cho ra kết quả như sau:

// job1;
// job2;
// job3;
```

**Ưu điểm:** Do các câu lệnh được chạy lần lượt nên sẽ dễ kiểm soát hơn, ngoài ra nếu có bất kỳ lỗi nào thì chương trình cũng sẽ dừng lại mà không chạy tiếp.

**Hạn chế:** Đôi khi chúng ta cần lấy dữ liệu từ bên ngoài (đọc file, lấy dữ liệu từ DB, …) nên sẽ cần một thời gian chờ nhất định. Nếu chúng ta thực hiện theo kiểu đồng bộ, thì thời gian chạy của toàn bộ chương trình sẽ bằng tổng thời gian thực hiện từng câu lệnh một

==> _Điều này có thể làm giảm hiệu năng của chương trình_. Ví dụ ta cần đọc 100 file, mỗi file cần 0.5s ==> Tổng thời gian chạy chương trình sẽ là 50s.

![Sync](./image/003.png 'Đồng bộ')

## 2. Quá trình bất đồng bộ (Asynchronous)

Để giải quyết vấn đề ở quá trình đồng bộ thì chúng ta sẽ sử dụng quá trình bất đồng bộ. Đây là quá trình mà các câu lệnh có thể chạy cùng một lúc chứ không cần chờ câu lệnh trước. Với ví dụ trên, thì ta sẽ chạy đồng thời 100 câu lệnh đọc file cùng một lúc => Chúng ta sẽ chỉ mất khoảng 0.5s đến 1s thay vì 50s như lúc trước.

![ASync](./image/004.png 'Bất đồng bộ')

Một lưu ý là có thể câu lệnh thứ 2 sẽ thực hiện nhanh hơn câu lệnh 1 nên sẽ trả về kết quả sớm hơn. Do đó, kết quả của các câu lệnh cũng có thể được trả về không theo thứ tự gọi bạn đâu.

**Ưu điểm:** Như đã nói, nó giúp chúng ta tối ưu được thời gian chạy của các câu lệnh. Cũng giúp chúng ta thực hiện các tác vụ mất nhiều thời gian mà không làm ảnh hưởng đến luồng chính của chương trình.

**Khuyết điểm:** Chính vì các câu lệnh được thực hiện đồng thời và kết quả cũng được trả về một cách không theo thứ tự nên sẽ khó kiểm soát cũng như debug code.

## 3. Các cách xử lý bất đồng bộ phổ biến

Vậy trong Javascript thì làm sao để các câu lệnh thực hiện theo đúng thứ tự ?? Mình sẽ nói đến 3 cách xử lý bất đồng bộ hay dùng nhất:

- Callback
- Promise
- Async / Await

### 3.1 Sử dụng Callback (ES5)

Callback hiểu đơn giản là bạn truyền một hàm B vào hàm A dưới dạng 1 tham số, một lúc nào đó thì hàm A sẽ gọi hàm B để chạy. Ví dụ:

```js
function asyncFunction(callback) {
  console.log('Start');
  setTimeout(() => {
    callback();
  }, 1000);
  console.log('Waiting');
}

let printEnd = function () {
  console.log('End');
};
```

Ở đây mình dùng `setTimeout` để giả sử cho thời gian chờ là 1s. Kết quả khi chạy đoạn code trên:

```js
Start;
Waiting;
End;
```

Ở đây hàm `callback` của mình là `printEnd` và được truyền vào hàm `asyncFunction` dưới dạng 1 tham số. Sau khi chờ 1s thì `asyncFunction` mới gọi hàm callback để thực hiện các câu lệnh tiếp theo. Callback thường được sử dụng trong các `EventListener` để khi bắt được các sự kiện sẽ gọi đến hàm `callback`.

Và tất nhiên `callback` cũng có nhược điểm của nó. Nếu như bạn cần thực hiện nhiều câu lệnh bất đồng bộ thì bạn cần phải lồng từng đó `callback` với nhau, khiến cho code sẽ vô cùng khó đọc, khó debug cũng như phát triển (trường hợp này được gọi là `Callback Hell`),

```js
function a1() {
  function a2() {
    function a3() {
      function a4() {
        function a5() {
          ...
        }
      }
    }
  }
}
```

hay

```js
if(a1){
  if(a2){
    if(a3){
      if(a4){
        if(a5){
          ...
        }
      }
    }
  }
}
```

Ví dụ:

```js
function getData(link, callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}

getData('Data1', () => {
  getData('Data2', () => {
    getData('Data2', () => {
      getData('Data3', () => {
        getData('Data4', () => {
          getData('Data5', () => {
            getData('Data6', () => {
              console.log('Done');
            });
          });
        });
      });
    });
  });
});
```

### 3.2 Sử dụng Promise (ES6)

Để giải quyết vấn đề `Callback Hell `ở trên, phiên bản ES6 đã đem đến cho chúng ta `Promise`. Về khái niệm, `Promise` chính là “lời hứa” đại diện cho giá trị chưa tồn tại và giá trị đó sẽ được trả về vào một thời gian trong tương lai.

Ví dụ, khi bạn oder một món đồ ở trên mạng và cần 2 ngày để ship về, có thể thấy hành động giao hàng ở đây là bất đồng bộ (cần 2 ngày mới có thể hoàn thành). Thì chủ shop đã trao cho bạn một “lời hứa” đại diện cho món hàng đó. Sau đó, bạn vẫn thực hiện các hoạt động khác (ăn, ngủ, code) bình thường và cuối cùng sẽ nhận được món hàng sau 2 ngày và có thể sử dụng nó.

Đây là cách để tạo ra một Promise:

```js
let promise = new Promise((resolve, reject) => {
  // Asynchronous Code.
});
```

Promise sẽ nhận vào một hàm callback gồm 2 tham số như sau:

- **`resolve`**: một function sẽ được gọi nếu đoạn code bất đồng bộ trong Promise chạy thành công.

- **`reject`**: một function sẽ được gọi nếu đoạn code bất đồng bộ trong Promise có lỗi xảy ra. Promise cũng cung cấp cho chúng ta 2 phương thức để xử lý sau khi được thực hiện:

- **_then()_**: Dùng để xử lý sau khi Promise được thực hiện thành công (khi resolve được gọi).

- **_catch()_**: Dùng để xử lý sau khi Promise có bất kỳ lỗi nào đó (khi reject được gọi). Dưới đây là đoạn code hoàn chỉnh về việc sử dụng Promise:

```js
const randomNumber = new Promise((resolve, reject) => {
  const url =
    'https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new';
  let request = new XMLHttpRequest();

  request.open('GET', url);
  request.onload = function () {
    if (request.status == '200') {
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
  };

  request.onerror = function () {
    reject(Error('Error fetching data.'));
  };

  request.send();
});

randomNumber
  .then((res) => {
    console.log('Success');
    console.log('Random number: ', res);
  })
  .catch((err) => {
    console.log('Error: ', err.message);
  });
```

Mình đã khởi tạo một `Promise` là `randomNumber`, nhiệm vụ của Promise này là gọi lên API để lấy một số ngẫu nhiêu trong khoảng [1, 10]. Nếu lấy được số thành công thì sẽ truyền kết quả qua hàm resolve(), còn nếu có lỗi thì sẽ truyền lỗi qua hàm reject().

Ở hàm _**then()**_, mình truyền vào 1 `callback` để in số đó ra nếu lấy thành công

Còn hàm **_catch()_** thì là `callback` để thông báo lỗi nếu thất bại.

Ngoài ra, ta cũng có thể nối nhiều Promise với nhau (`Promise Chaining`) để xử lý nhiều thao tác bất đồng bộ lồng nhau. Từ đó tránh được Callback Hell. Ví dụ:

```js
getAsyncData(url)
.then((res) => {getAsyncData(res.url1)})
.then((res) => {getAsyncData(res.url2)})
.then((res) => {getAsyncData(res.url3)})
.then((res) => {getAsyncData(res.url4)})
.then((res) => {getAsyncData(res.url4)})
.then((res) => {
console.log("Done");
console.log(res);
```

**Tạm Kết**
Vậy là mình đã giới thiệu với các bạn khái quát về bất đồng bộ cũng như một số cách xử lý hay dùng.

---
