# Sử dụng Babel CLI

---

> Vì các phiên bản **Javascript** cũ chưa hỗ trợ hoàn toàn `Async Await`, nên chúng ta cần cài đặt một thư viện hỗ trợ để biên dịch những `Syntax Javascript` có thể chạy được trên máy. Ở đây ta sẽ dùng gói thư viện `Babel CLI.`

## 1. Cài đặt

- _Bước 1:_ Khởi tạo thư mục dự án **ES7**
- _Bước 2:_ Chạy lệnh tạo nhanh file `package.json`
  > **npm init -y**
- _Bước 3:_ Tạo file `index.js` có đoạn lệnh

```js
import fs from 'fs';
```

- _Bước 4:_ Kiểm tra chạy file `index.js` xem chương trình đã hiểu Syntax `import` đã hỗ trợ chưa?

  > node index

  > _Cannot use import statement outside a module_ > >_SyntaxError: Cannot use import statement outside a module_

Như vậy, để chạy được file `index.js` cần dùng đến một công cụ là `Babel CLI` quen thuộc dùng trong `React`

- _Bước 5:_ Chạy các câu lệnh trên Terminal hoặc CMD

  > **npm install --save-dev babel-cli**

Việc cài sẽ được khai báo vào file `package.json` tại đoạn `devDependencies` như sau:

```js
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-es2017": "^6.24.1"
  }

```

- Xem thêm ở [Npm và package](../16/index.md) để biết chạy lệnh

  > **npm install --save-dev babel-cli**
  > liên quan đến `Development dependencies`

- _Bước 6:_ Thay đổi cách chạy file `index.js` từ

> **node index.js**

thành chạy kiểu

> **babel-node index**

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

Khi này chạy trên Terminal sẽ gọi lệnh chạy

> **npm start**

- _Bước 7:_ Cài bổ sung thêm `Preset` để biên dịch sang Javascript bình thường có thể chạy được.

  > **npm install --save-dev babel-preset-es2015 babel-preset-es2017**

  - _babel-preset-es2015_: Để hiểu được Syntax lệnh `import`
  - _babel-preset-es2017_: Để hỗ trợ các Syntax lệnh `Async Await`

- _Bước 9:_ Tạo file `config` cho `babel` để biên dịch Javascript sang phiên bản Javascript cũ hơn, tạo file `.babelrc` nằm cùng thư mục `index.js`.

  > .babelrc

```js
{
  "presets": ["es2015", "es2017"]
}

```

- _Bước 10:_ Chạy lại trên Terminal CMD kiểm tra đoạn lệnh

  > **npm start**

```js
// log
  > babel-node index.js

  > Hello World !!!
```

Lúc này **môi trường đã sẵn sàng** để chạy các câu lệnh `Async Await` biên dịch trên Javascript phiên bản cũ hơn.

---
