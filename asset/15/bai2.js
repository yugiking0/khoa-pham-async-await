const axios = require('axios');

// Giải thích điểm khác nhau giữa 1 và 2:
async function fetchUrls(urls) {
  const results = [];
  for (const url of urls) {
    const res = await axios.get(url);
    results.push(res);
  }
  return results;
}

// 2. Xử lý Promise ban đầu cho cả mảng xem việc thực thi có thành công hay không
async function fetchUrlsParallel(urls) {
  const results = await Promise.all(
    urls.map(function (url) {
      return axios.get(url);
    })
  );
  return results;
}

// Chạy thử 2 hàm trên với đầu vào dưới đây và so sánh tốc độ
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
];

fetchUrls(urls)
  .then(() => console.log('Done'))
  .catch((err) => console.log('Error1'));
fetchUrlsParallel(urls)
  .then(() => console.log('Done 2'))
  .catch((err) => console.log('Error2'));
/*
1. Giải thích điểm khác nhau giữa 1 và 2:
fetchUrls: 
    + Duyệt qua 1 mảng thực hiện chạy lấy kết quả đẩy vào mảng mới, việc thực thi theo trình tự index của mảng để thực hiện => Đẩy dữ liệu push vào mảng mới.
    + Đây là Promise từng url xem có thực thi thành công hay không, thực hiện từng Promise mỗi phần tử.
fetchUrlsParallel:
    + Chỉ 1 lần Promise.all thực hiện 1 lúc nhiều câu lệnh với các phần tử của mảng, xem như 1 lần chờ xử lý bất đồng bộ.

2. Chạy thử 2 hàm trên với đầu vào dưới đây và so sánh tốc độ
 - Tốc độ fetchUrlsParallel nhanh hơn so với fetchUrls.
 - Vì Done2 chỉ chờ 1 lần Promise, còn Done1 phải chờ n lần phần tử bất đồng bộ xử lý.
*/
