# Tìm hiểu câu lệnh setTimeout

---

## 1. Cấu trúc lệnh

> setTimeout(()=>{},time)

- Chờ 1 khoảng thời gian kết thúc, sau đó mới thực thi câu lệnh trong ngoặc.

### Ví dụ 1:

```js
setTimeout(() => {
  console.log('Hello Javascript!');
}, 1000);
```

- Chờ xong 1 giây, mới in log ra câu `Hello Javascript!`.

### Ví dụ 2:

```js
setTimeout(() => {
  console.warn('Đã hết 1 giây!');
}, 1000);

console.log('Kết thúc.');
```

![Ví dụ 1](./image/001.png 'setTimeout 1')

- Mặc dù câu lệnh `Kết thúc` nằm ở sau câu lệnh `Đã hết 1 giây!`, nhưng vẫn được in log ra trước.

---

## 2. Thứ tự thực hiện

- Câu lệnh viết trước sẽ được chạy trước, câu lệnh chạy sau sẽ được thực hiện sau.
- Mặc dù vậy, thì không có nghĩa câu lệnh viết trước sẽ được kết thúc trước mà có thể câu lệnh viết sau được kết thúc trước.
- Trong 1 file bao gồm câu lệnh đồng bộ và câu lệnh bất đồng bộ, thì sau khi tất cả câu lệnh đồng bộ được thực hiện xong hết thì mới chuyển sang thực hiện các câu lệnh Callback của các câu lệnh bất đồng bộ.
