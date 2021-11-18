# Npm và package

---

![npm](./image/001.png 'npm')

## 1. Giới thiệu chung

**NPM** viết tắt của **_Node Package Manager_** là một công cụ tạo và quản lý các thư viện lập trình **Javascript** cho **NodeJS**. Trong cộng đồng **Javascript**, các lập trình viên chia sẻ hàng trăm nghìn các thư viện với các đoạn code đã thực hiện sẵn một chức năng nào đó. Nó giúp cho các dự án mới tránh phải viết lại các thành phần cơ bản, các thư viện lập trình hay thậm chí cả các **framework**.

Nếu bạn vẫn chưa tưởng tượng ra lợi ích của việc sử dụng **_npm_** thì ta sẽ lấy ví dụ cụ thể hơn.(Các ví dụ dưới đây đều không bao gồm các trường hợp các bạn sử dụng 1 `package manager` nào khác, ví dụ như `yarn`, `maven…`)

_**Ví dụ 1:**_ Nếu bạn không sử dụng **_npm_**, bạn sẽ phải download toàn bộ các thư viện một cách thủ công, sau đó _include_ vào _project_ của bạn, việc này rất mất thời gian, trong khi với **npm**, bạn chỉ cần 1 dòng lệnh là xong.

**_Ví dụ 2:_** Khi làm 1 dự án, bạn phải chia sẻ _code_ cùng với các cộng sự của mình, nếu không sử dụng **_npm_** (hoặc bất kì trình quản lí **package** nào) thì khi `commit code` ta phải **commit** cả thư viện vào, rất nặng. Khi **deploy** ta cũng phải copy thư viện lên, rất chậm và tốn thời gian.

**_Bạn đã thấy sử dụng npm tiện như thế nào chưa?_**

---

## 2. Cài đặt và sử dụng Npm

**_Npm_** được tích hợp sẵn có trong **NodeJS**, để kiểm tra xem trên hệ thống của bạn đã được cài npm chưa chúng ta sử dụng lệnh `npm -v`, nếu một phiên bản hiện ra thì hệ thống của bạn đã được cài đặt **npm**.

Nếu bạn tạo mới 1 _project_ và muốn sử dụng **npm**, tốt hơn hết bạn nên bắt đầu với câu lệnh:

> npm init

Câu lệnh trên đơn giản là sẽ tạo ra 1 file có tên là `package.json` – thành phần này được gọi là `Local Package Database`, lưu trữ thông tin (tên _package_, phiên bản, các **dependencies**) mà `project` của bạn sử dụng.

Sau khi chạy câu lệnh này, **Npm** sẽ hỏi chúng ta một vài câu hỏi về `project` của bạn.

- Đầu tiên là về **package name**: Đây là tên dự án của bạn
- **Version**: Đây là phiên bản dự án của bạn, mặc định sẽ là `1.0.0`
- **Description**: Mô tả về dự án của bạn.
- **Entry point**: `Entry point` sẽ quy định root của **Node**, file này sẽ chứa các câu lệnh về server, mặc định sẽ là `index.js`. Chú ý là khi bạn chạy server, **Node** sẽ đọc dữ liệu từ file này để khởi tạo. Tên này có thể thay đổi được, nhưng hãy chắc rằng file đó tồn tại ở root của dự án.
- **Test command**: Đây là dòng lệnh mà sẽ chạy khi bạn gọi `npm test` Mặc định để trống
- **Git repository**: Như tên gọi, nó là `git repository` ứng với dự án của bạn. Mặc định để trống.
- **Keywords**: Các từ khóa tương ứng với dự án của bạn. Mặc định để trống
- **Author**: Tên tác giả của dự án. Mặc định để trống
- **License**: Giấy phép. Mặc định là `ISC`.

Khi kết thúc sẽ hỏi 1 câu là `Is this OK`: bạn có chắc không, **yes** hoặc **no**.

Sau khi kết thúc, project của các bạn sẽ có thêm 1 file có tên là `package.json`. Khi bạn vào trong đó ban đầu sẽ file hiển thị những thông tin tương tự như dưới đây.

![package.json](./image/002.png 'package.json')

Các thông tin trong file này ban đầu chính là những thông tin bạn nhập trước đó trong phần `npm init`. Trong tương lai bạn có thể add rất nhiều thứ vào file này nữa. Và giờ bạn có thể sử dụng npm để cài đặt các **package** mà mình muốn _include_ vào trong dự án của mình rồi.

---

## 3. Phân loại loại package

Dựa theo chức năng mà ta chia _package_ ra làm 2 loại, đó là:

- **Simple dependencies** (Để cho ngắn gọn thì về sau mình sẽ chỉ gọi nó là **Dependencies** thôi)
- **Development dependencies**.

_Về sự khác nhau giữa 2 loại này ra sao???_

### 3.1 Simple dependencies

**Dependencies** là những _package_ bắt buộc phải có trong quá trình chạy sản phẩm, kiểu như một thư viện cung cấp các hàm mà code của bạn cần.

Khi cài đặt **dependencies**, **Npm** sẽ tự động cài đặt tất cả các **dependencies** cần thiết.

> _Ví dụ như nếu **package A** phụ thuộc vào **package B**, **package B** lại phụ thuộc vào **package C** thì **Npm** sẽ cài đặt đồng thời cả **A,B,C**_.

Đó cũng chính là lí do vì sao khi bạn cài đặt 1 _package_ và vào `folder node_modules` sẽ thấy cả đống các _package_ khác mà bạn không hề cài đặt

### 3.2 Development dependencies

Còn đối với **Development dependencies** là những _package_ bắt buộc khi phát triển cũng như phát hành sản phẩm. Kiểu như các trình biên dịch giúp biên dịch đoạn code của bạn về javascript, rồi các `framework` phục vụ cho việc kiểm thử,…

Khi cài đặt **Development Dependencies**, **Npm** sẽ chỉ cài đặt các _dependencies_ mà cần thiết. Chỉ cài Module được chạy lệnh, không cài những Module phụ thuộc.

> _Ví dụ như nếu **package A** phụ thuộc vào **package B**, **package B** lại phụ thuộc dev vào **package C** thì **Npm** sẽ chỉ cài đặt **A** và **B**._

_Giờ chúng ta sẽ xem chúng ta cài đặt các package như thế nào nhé._

### 3.3 Cài đặt

#### 3.3.1 Cài đặt Simple dependencies package:

> Cú pháp như sau: **`npm install [tên package]`**
> hoặc đơn giản hơn là **`npm i [tên package]`**

Ví dụ:
![Simple dependencies package](./image/003.png 'Simple dependencies package')

Khi cài xong, bạn vào file `package.json` sẽ thấy có thêm 1 trường như này:

![Simple dependencies package](./image/004.png 'Simple dependencies package')
Ở đây, **Slugify** là tên _package_, còn `^1.3.6` là _version_ của _package_.

#### 3.3.2 Cài đặt Development dependencies package:

> Cú pháp như sau: **`npm install [tên package] --save-dev`**
> hoặc đơn giản hơn là: **`npm i [tên package] --save-dev`**

![Development dependencies package](./image/005.png 'Development dependencies package')

Sau khi cài xong, bạn vào file `package.json` sẽ thấy có thêm 1 trường như này:

![Development dependencies package](./image/006.png 'Development dependencies package')

Cùng với việc thêm file `package.json`, khi bạn cài đặt _package_, project của bạn sẽ có thêm 1 folder có tên là `node_modules`, trong đó sẽ chứa tất cả các package đã được cài đặt.

---

## 4. Các loại Node Module Chuẩn

**NodeJS Module** là một thư viện _Javascript_, nó là một tập hợp các hàm (function) đối tượng và các biến, mà bạn có thể đưa vào ứng dụng của bạn để sử dụng. Sử dụng **Module** giúp đơn giản việc viết code, và quản lý code trong ứng dụng của bạn. Thông thường mỗi module sẽ được viết trong một tập tin riêng rẽ.

**NodeJS** đã xây dựng sẵn khá nhiều **Module**, nó các các thư viện chuẩn để bạn phát triển ứng dụng. Dưới đây là danh sách:

| Module         | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| assert         | Cung cấp tập hợp các **assertion tests** (Kiểm tra khẳng định)                    |
| buffer         | Để xử lý các dữ liệu nhị phân (binary data).                                      |
| child_process  | Để chạy một tiến trình con (child process)                                        |
| cluster        | Để tách một tiến trình (process) thành nhiều tiến trình.                          |
| crypto         | Chứa các hàm mã hóa **OpenSSL** (_OpenSSL cryptographic functions_)               |
| dgram          | Cung cấp các thực hiện (implementation) cho **UDP sockets**                       |
| dns            | Cung cấp các chức năng để tìm kiếm (lookups) và phân giải (resolution) DNS.       |
| events         | Để xử lý các sự kiện (events)                                                     |
| fs             | Để xử lý file system                                                              |
| http           | Để làm cho **Node.js** hoạt động như một **HTTP server**.                         |
| https          | Để làm cho **Node.js** hoạt động như một **HTTPS server**.                        |
| net            | Để tạo các **server** và các **client**.                                          |
| os             | Cung cấp các thông tin về hệ điều hành.                                           |
| path           | Để xử lý các đường dẫn file (file paths).                                         |
| querystring    | Để xử lý URL query strings                                                        |
| readline       | Để xử lý các luồng dữ liệu (data streams) mà có thể đọc từng dòng (line) dữ liệu. |
| stream         | Xử lý các luồng dữ liệu (streaming data)                                          |
| string_decoder | Để giải mã (decode) đối tượng bộ đệm (buffer objects) thành string                |
| timers         | Hẹn giờ để thực thi một hàm **Javascript**.                                       |
| tls            | Để thực hiện các giao thức **TLS & SSL**.                                         |
| tty            | Cung cấp các lớp được sử dụng bởi text terminal.                                  |
| url            | Giúp phân tích (parse) các chuỗi **URL** (URL strings)                            |
| util           | Cung cấp các hàm tiện ích (Utility functions).                                    |
| v8             | Truy cập vào các thông tin của **V8 JavaScript engine**.                          |
| vm             | Biên dịch (compile) mã **JavaScript** trong máy ảo (Virtual machine)              |
| zlib           | Xử lý nén và giải nén các tập tin.                                                |

- Xem [Các Module package tại **Node.js documentation**](https://nodejs.org/api/)

---
