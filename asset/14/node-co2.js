const fs = require('fs');
const co = require('co');

let readPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

co(function* () {
  var files = ['./song1.txt', './song2.txt', './song3.txt'];
  var values = yield files.map((item) => {
    return readPromise(item);
  });
  return values;
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err + ''));

// Không truyền tham số vào đây được.
var str = 'Hello!';

co(function* (str) {
  console.log(str); // undefined : Không hiểu
  var files = ['./song1.txt'];
  var values = yield files.map((item) => {
    return readPromise(item);
  });
  return values;
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err + ''));
