# Xử lý bất đồng bộ trong Javascript - Phần 2

---

## 3. Các cách xử lý bất đồng bộ phổ biến

Vậy trong Javascript thì làm sao để các câu lệnh thực hiện theo đúng thứ tự ?? Mình sẽ nói đến 3 cách xử lý bất đồng bộ hay dùng nhất:

- Callback
- Promise
- Async / Await

### 3.3 Async/await (ES7)

Async/await là cơ chế giúp bạn thực thi các thao tác bất đồng bộ một cách tuần tự hơn , giúp đoạn code nhìn qua tưởng như đồng bộ nhưng thực ra lại là chạy bất đồng bộ, giúp chúng ta dễ hình dung hơn.

#### 3.2.1 Async

Để định nghĩa một hàm bất đồng bộ với async, ta cần khai báo từ khóa async ngay trước từ khóa định nghĩa hàm.

_Regular function:_

```js
async function getUser() {
    return ...
}
```

_Function expression:_

```js
getUser = async function() {
    return ...
}
```

Kết hợp với cú pháp arrow function của ES6

```js
getUser = async () => { ... }
```

Giá trị trả về của `AsyncFunction` sẽ luôn là một `Promise` mặc cho bạn có gọi `await` hay không, nếu trong code không trả về `Promise` nào thì sẽ có một `promise` mới được `resolve` với giá trị lúc đầu (nếu không có giá trị nào trong `return` kết quả trả về sẽ là _undefine_). Promise này sẽ ở trạng thái thành công với kết quả được trả về qua từ khóa return của hàm `async`, hoặc ở trạng thái thất bại với kết quả được đẩy qua từ khóa `throw` trong hàm `async`.

#### 3.1.2 Await

Về cơ bản thì `await` giúp cho cú pháp trông dễ hiểu hơn, thay thì phải dùng `then()` nối tiếp nhau thì chỉ cần đặt await trước mỗi hàm mà chúng ta muốn đợi kết quả của thao tác bất đồng bộ. Chỉ dùng được `await` trong hàm nào có async đứng phía trước.
