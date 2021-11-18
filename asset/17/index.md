# Sử dụng Babel CLI

---

Vì phiên bản Javascript chưa hỗ trợ hoàn toàn Async Await, nên chúng ta cần cài đặt một thư viện hỗ trợ để dịch những Syntax Javascript chưa được hỗ trợ có thể chạy được trên máy.

## 1. Cài đặt

- _Bước 1:_ Khởi tạo thư mục dự án
- _Bước 2:_ Chạy lệnh tạo nhanh file `package.json`
  > **npm init -y**
- _Bước 3:_ Tạo file `index.js` có đoạn lệnh

```js
import fs from 'fs';
```

- _Bước 4:_ Kiểm tra chạy file `index.js` xem chương trình đã hiểu Syntax `import` đã hỗ trợ chưa?
  > node index
  > _Cannot use import statement outside a module_

Như vậy, để chạy được file `index.js` cần dùng đến một công cụ là `Babel CLI` quen thuộc dùng trong `React`

- _Bước 5:_ Chạy các câu lệnh trên Terminal hoặc CMD

  > npm install --save-dev babel-cli

- _Bước 6:_ Thay đổi cách chạy file `index.js` từ

> node index.js

thành chạy kiểu

> babel-node index

- Thực hiện như sau:
  - Mở file `package.json`
  - Bổ sung tại vị trí:

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

thành

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "babel-node index.js"
  }
```

- _Bước 7:_ Chạy Terminal CMD
  > npm start
