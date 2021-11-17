/**
 * Sử dụng node co + axios để tải về các đường link sau theo 2 cách:
 */
var urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];

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
      });
  });
}

const co = require('co');

// Cách 1: Sử dụng vòng lặp for

urls.map((link) => {
  co(function* () {
    return yield requestAxiosPromise(link);
  })
    .then((link) => console.log('Load: ', link))
    .catch((err) => console.log('Error: ', err));
});

co(function* () {
  return yield urls.map((link) => {
    return requestAxiosPromise(link);
  });
})
  .then((link) => console.log('Load: ', link))
  .catch((err) => console.log('Error: ', err));

co(function* () {
  var values = yield urls.map((url) => {
    return requestAxiosPromise(url);
  });
  return values;
})
  .then((data) => console.log('Cach 1: ', data))
  .catch((error) => console.log(error));

// Cách 2: Sử dụng array.map
// Gợi ý: Có thể yield 1 array các Promise

var readAllLink = co.wrap(function* (files) {
  //Change Array -> Array Promise
  let arr = yield files.map(function (file) {
    return requestAxiosPromise(file);
  });
  return arr;
});

readAllLink(urls)
  .then((values) => console.log('Cach 2: ', values))
  .catch((err) => console.log('Error: ', err));
