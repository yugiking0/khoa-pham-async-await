# ReadFile và ReadFileSync trong NodeJS

---

## 1. Ví dụ:

- Xem ví dụ readFile (Đọc file bất đồng bộ)

```js
// Async

const fs = require('fs');
fs.readFile('./asset/docs/test1.txt', 'utf-8', (err, data) => {
  if (err) {
    return console.error(err + '');
  }
  console.log('Dữ liệu: ', data);
});

console.log('Kết thúc.');
```

![readFile](./image/001.png 'readFile Bất đồng bộ')

- Xem ví dụ readFileSync (Đọc file đồng bộ)

```js
const fs = require('fs');
let data = fs.readFileSync('./asset/docs/test1.txt', 'utf-8');
console.log(data);
console.log('Kết thúc.');
```

![readFileSync](./image/001.png 'readFileSync Đồng bộ')

## 2. Nhận biết câu lệnh Đồng bộ và Bất đồng bộ:

- Đa số câu lệnh đồng bộ của NodeJS sẽ có thêm chữ tiếp hậu ngữ Sync ở phía sau.
- Đa số câu lệnh bất đồng bộ sẽ có `Callback` để trả về kết quả hoặc thông báo lỗi nếu có lỗi xảy ra.
- Việc quyết định khi nào sử dụng lệnh Bất đồng bộ hay Đồng bộ được quyết định bởi người viết chương trình có dụng ý từ việc thiết kế hay phân tích.
- Để chắc chắn hiểu được cấu trúc và cách thực thi cần đọc tài liệu mô tả hướng dẫn sử dụng.
- Đối với NodeJS có thể tham khảo ở đường link sau: [Arrow Function](./asset/01/arrow.md)
