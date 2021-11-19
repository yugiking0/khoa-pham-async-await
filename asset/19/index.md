# Toàn tập về Javascript Async Await – Tại sao lại nên dùng?

---

`Javascript Async await` được giới thiệu từ phiên bản **NodeJS 7.6** và hiện tại thì nó được hỗ trợ trên tất cả các trình duyệt hiện đại.

Mình làm việc với `Javascript` cũng được một thời gian. Từ ngày mình cảm thây vui vẻ với `callback`, rồi sung sướng tột độ với `Promise`, cuối cùng thì vỡ òa với `Async/await` 🙂

Ngay từ cái tên gọi `Javascript async await` của nó cũng đã nói lên phần nào về tác dụng. Nó cũng giống với `Promise` hay `callback` về công dụng, tức là viết code không đồng bộ theo luồng logic đồng bộ.

Bài viết này chúng ta sẽ cùng nhau tìm hiểu tất cả những khía cạnh của `Async/await`, lý do tại sao chúng ta nên sử dụng nó thay vì `Promise`.

---

## 1. Giới thiệu Async/await

Trước khi chúng ta bắt đầu vào tìm hiểu kỹ hơn, mình sẽ giới thiệu qua một số thông tin:

- `Async/await` là một giải pháp mới để viết code không đồng bộ. Trước đây, chúng ta có hai giải pháp đó là dùng `Callback` và `Promise`.
- `Async/await` thực sự chỉ là cách viết `syntax` được xây dựng từ `promise`. Nó không được sử dụng với `plain callback` hay `node callback`.
- `Async/await` giống như `promises`, là `non blocking`.
- `Async/await` làm cho đoạn mã không đồng bộ trông giống như mã đồng bộ. Đây chính là ưu điểm của nó so với `callback` và `promise`.
