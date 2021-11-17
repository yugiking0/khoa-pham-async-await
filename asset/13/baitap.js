/**
 * Sử dụng Promise.all + axios để tải về 3 đường link sau cùng lúc và hiển thị ra kết quả:
 * https://jsonplaceholder.typicode.com/todos/1
 * https://jsonplaceholder.typicode.com/todos/2
 * https://jsonplaceholder.typicode.com/todos/3
 */

//! Cách dùng axios
const axios = require('axios');

/*
// Cách xử lý get của axios

axios
  .get('https://jsonplaceholder.typicode.com/t3odos/2221')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  })
  .catch((error) => console.log('Lỗi link: ' + error.config.url));

// axios.get('https://jsonplaceholder.typicode.com/todos/1')
//   .then(function (response) {
//     console.log(response.data);
//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.headers);
//     console.log(response.config);
//   });

*/

/*
axios
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => console.log(response))
  .catch((error) => console.log(error))
  .then(() => console.log('Thực hiện xong'));
*/
//todo: Viết lại Promise.all + axios

let axiosPromise = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .get(path)
      .then((response) => resolve(response.data))
      .catch((error) => reject('Lỗi link: ' + error.config.url));
  });
};

let newArr = Promise.all([
  axiosPromise('https://jsonplaceholder.typicode.com/todos/1'),
  axiosPromise('https://jsonplaceholder.typicode.com/todos/2'),
  axiosPromise('https://jsonplaceholder.typicode.com/todos/3'),
])
  .then((arr) => arr)
  .catch((error) => error);

console.log(newArr); // <pending>

setTimeout(() => {
  console.log(newArr);
}, 2000);
