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

var files = ['./song1.txt', './song2.txt', './song3.txt'];

let readFiles = co.wrap(function* (path) {
  var data = yield path.map((value) => {
    return readPromise(value);
  });
  return data;
});

let readFiles2 = function* (path) {
  co.wrap(function* (path) {
    var data = yield path.map((value) => {
      return readPromise(value);
    });
    return data;
  });
};
readFiles2(['./song1.txt', './song2.txt', './song3.txt']).then((data) =>
  console.log(data)
);
