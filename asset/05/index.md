# Promise

---

- 1. Nguồn gốc cần xuất hiện Promise
- 2. Promise giải quyết việc gì? (Nỗi đau)

---

## 1. Synchronous - Asynchronous

- Ban đầu các câu lệnh chạy theo kiểu **`Đồng bộ`** (**`Synchronous`**)

### 1.1 Synchronous - Đồng Bộ

- Là việc thực hiện các câu lệnh theo thứ tự từ trên xuống dưới theo trình tự.
- Khi công việc trước chưa thực hiện xong thì công việc lệnh kế tiếp chưa được thực hiện và phải chờ.
- Ta xem ví dụ sau:

```js
console.log("Line 1");
console.log("Line 2");

//Console
// Line 1
// Line 2
```

- Trong thực tế ta xem việc thực hiện này giống như trình tự các bước nấu một món ăn như: "**Cá kho**", sẽ bao gồm trình tự các bước thực hiện như sau:

```
  - **Bước 1: Chuẩn bị nguyên liệu**
    - 500 g cá quả (hoặc cá chép, trắm, rô, basa, bông lau, lòng tong, thu,...).
    - 2 củ hành khô
    - 3 tép tỏi
    - 1 mẩu gừng
    - 3 quả ớt hiểm
    - 1,5 thìa canh nước mắm
    - 1 thìa canh đường
    - Dầu ăn
    - Tiêu
  - **Bước 2: Sơ chế nguyên liệu**
    - 1. Chà xát da cá và bụng cá với giấm và muối cho sạch nhớt. Cạo sạch máu đọng và màng đen trong bụng cá. Rửa lại bằng nước lạnh, để ráo.
    - 2. Hành tỏi băm nhỏ. Gừng thái sợi. Ớt đập dập.
  - **Bước 3: Ướp cá**
    - 1. Ướp cá với 1,5 thìa canh mắm, 1 thìa canh đường, ớt.
    - 2. Làm nóng nồi/chảo với 2 thìa canh dầu ăn. Thắng nước hàng (nước màu) với 1 thìa canh đường. Khi đường vừa chuyển màu mật ong, tắt bếp.
    - 3. Cho hành, tỏi, gừng vào phi thơm.
    - 4. Đợi hỗn hợp hành tỏi nguội, trút hết vào ướp cá.
    - 5. Ướp cá 30-60 phút trong tủ lạnh.
  - **Bước 4: Kho cá**
    - 1. Xếp cá vào nồi/chảo, đậy vung.
    - 2. Bật lửa lớn cho nồi sôi lên khoảng 5 phút rồi hạ xuống lửa nhỏ nhất. Nếu thấy nước không đủ ngập sâm sấp khúc cá thì châm nước sôi.
    - 3. Kho cá đậy vung, lửa nhỏ khoảng 1 tiếng tới khi nước kho sệt lại. Sau khi kho được 30-40 phút, bạn nhẹ nhàng lật cá để 2 mặt đều ngấm gia vị.
  - **Bước 5: Hoàn thành**
    - Rắc nhiều tiêu trước khi ăn. Cá kho ăn nóng hoặc nguội với cơm nóng, rau luộc.
```

**_- Vấn đề nảy sinh_**

> Nếu cần thực hiện một lúc nhiều công việc cùng lúc, và nếu một công việc nào đó chưa thực hiện xong thì vẫn cho công việc kế tiếp thực hiện thì là thế nào???

- Ví dụ thực tế:
  - 1. Một nhà hàng nấu nhiều món ăn cùng 1 lúc, không thể chờ chế xong món 1, hoặc phải làm xong bước 1 của món 1 mới được thực hiện các món khác được vì đôi khi đang thực hiện món này thiếu nhiên liệu hoặc bị hư hỏng thì vẫn phải chế biến món khác cho thực khách khác.
  - 2. Khi mở trang Website có nhiều hình ảnh, không thể chờ hình 1 load xong mới, cho phép chạy load hình 2 được, mà công việc load này cần thực hiện song song cùng lúc.

Vậy lúc này cần xử lý **`Bất đồng bộ`** (`Asynchronous`)

### 1.2 Asynchronous - Bất Đồng Bộ

- Là xử lý cùng lúc nhiều công việc khác nhau không theo trình tự.
- Không cần công việc trước hoàn tất, mà tại thời điểm này các công việc khác vẫn thực hiện.
- Trong JavaScript có 1 số Method chức năng hỗ trợ chạy Bất đồng bộ này đơn giản như: _setTimeout_, _setInterval_, _fetch_, _XMLHttpRequest_
- Ta xem ví dụ sau:

```js
setTimeout(() => {
  console.log("Line 1");
}, 1000);
console.log("Line 2");

//Console
// Line 2
// Line 1
```

- Ta thấy câu lệnh `console.log("Line 1");` nằm ở trên câu lệnh `console.log("Line 2");` nhưng khi in ra vẫn bị in sau.
- **`Asynchronous`** cho phép **`xử lý Đa luồng`** so **`Synchronous`** với chỉ cho phép **`xử lý Đơn luồng`**.

### 1.3 Sự cần thiết xử lý Đồng bộ trong Bất đồng bộ

- Đối với những tác vụ mà có sự ràng buộc lẫn nhau, tác vụ phía sau muốn chạy được phải chờ dữ liệu của tác vụ trước nó.
- Quay trở lại ví dụ nấu nhiều món ăn: Món cá, món rau, món xào ... được thực hiện trong bếp của một Nhà Hàng.
- Cùng 1 lúc các đầu bếp có thể xử lý nấu nhiều món ăn khác nhau, nhưng đối với từng món ăn phải đảm bảo theo trình tự chế biến; Không thể `mới chuẩn bị Nguyên liệu lại đem đi kho mà chưa sơ chế được`.
- Ta xem cây qui trình sau:

```js
Asynchronous(Món 1) // Dish01
  Synchronous(Bước 1) // Task01
  Synchronous(Bước 2) // Task02
  Synchronous(Bước 3) // Task03

Asynchronous(Món 2) // Dish02
  Synchronous(Bước 1) // Task01
  Synchronous(Bước 2) // Task02
  Synchronous(Bước 3) // Task03
  Synchronous(Bước 4) // Task04

Asynchronous(Món 3) // Dish03
  Synchronous(Bước 1) // Task01
  Synchronous(Bước 2) // Task02
```

- Trong mỗi xử lý Bất đồng bộ cần xử lý Đồng bộ theo trình tự nếu viết lại theo cách giả lập trình sẽ thành:

```js
Asynchronous(Dish01){ // Chế biến món 1
 Process(Task01)      // Thực hiện bước 1
 if(Task01 Done){     // Nếu bước 1 hoàn thành
  Process(Task02)     // Thực hiện bước 2
  if(Task02 Done){    // Nếu bước 2 hoàn thành
    Process(Task03)   // Thực hiện bước 3
    if(Task03 Done){
      Process(Task04)
      if(Task04 Done){
        Process(Task05)
        if(Task05 Done){
          Process(Task06)
          if(Task06 Done){
            if(Task06 Done){
              ...
            }

          }
        }
      }
    }
  }
 }
}
```

> Ta xét ví dụ: In ra màn hình dãy số tăng dần sau mỗi giây(Không sử dụng chức năng setInterval)

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

### 1.4 Vấn đề của xử lý quá nhiều Đồng bộ trong Bất đồng bộ (Nỗi đau của Asynchronous)

- Đối với 1 số xử lý qua quá nhiều bước khác nhau, thì sẽ làm cho câu lệnh trên sẽ thực hiện nhiều xử lý lồng nhau, khi này nếu có 1 điều chỉnh nào đó ở bước nào đó, sẽ làm cho câu lệnh khó đọc, khó Maintain sửa chữa.
- Cấu trúc xử lý các câu lệnh trên được gọi là: **`Callback Hell`**.

**_Giải pháp xử lý nào cho vấn đề này?_**
-> Và **_`Promise`_** được sinh ra để giải quyết nỗi đau này.
Promise làm giảm độ phức tạp **`Callback Hell`** trong viết lệnh code lồng nhau nhiều lần.

---
