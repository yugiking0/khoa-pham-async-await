/**
 * Sử dụng node co + axios để tải về các đường url sau theo 2 cách:
 */
var urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];

// Cách dùng axios
const axios = require('axios');
/*
axios
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => console.log(response))
  .catch((error) => console.log(error))
  .then(() => console.log('Thực hiện xong'));
*/
let axiosPromise = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .get(path)
      .then((response) => resolve(response.data))
      .catch((error) => reject('Lỗi url: ' + error.config.url));
  });
};

const co = require('co');

//! Cách 1:
co(function* () {
  //   var urls = [
  //     'https://jsonplaceholder.typicode.com/todos/1',
  //     'https://jsonplaceholder.typicode.com/todos/2',
  //     'https://jsonplaceholder.typicode.com/todos/3',
  //     'https://jsonplaceholder.typicode.com/todos/4',
  //     'https://jsonplaceholder.typicode.com/todos/5',
  //   ];

  var value = yield urls.map((url) => {
    return axiosPromise(url);
  });
  return value;
})
  .then((data) => console.log('Cách 1: ', data))
  .catch((err) => console.log(err + ''));

//! Cách 2:

let axiosCO = co.wrap(function* (urls) {
  var result = yield urls.map((url) => {
    return axiosPromise(url);
  });
  return result;
});

axiosCO(urls)
  .then((data) => console.log('Cách 2: ', data))
  .catch((err) => console.log(err));
