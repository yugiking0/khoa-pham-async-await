/**
 * Sử dụng Promise.all + axios để tải về 3 đường link sau cùng lúc và hiển thị ra kết quả:
 * https://jsonplaceholder.typicode.com/todos/1
 * https://jsonplaceholder.typicode.com/todos/2
 * https://jsonplaceholder.typicode.com/todos/3
 */
var axios = require('axios');

function requestAxiosPromise(path) {
  return new Promise(function (resolve, reject) {
    axios
      .get(path)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error.config.url);
        // reject(error.request.path);
        // reject(error.request);
      });
  });
}

Promise.all([
  requestAxiosPromise('https://jsonplaceholder.typicode.com/todos/1'),
  requestAxiosPromise('https://jsonplaceholder.typicode.com/todos/2'),
  requestAxiosPromise('https://jsonplaceholder.typicode.com/todos/3'),
]) //Array Executed
  .then(function (values) {
    console.log(values);
  })
  .catch(function (err) {
    console.log('Error:', err);
  });
