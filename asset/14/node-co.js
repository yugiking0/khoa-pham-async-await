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

var arr = co(function* () {
  var song1 = yield readPromise('./song22.txt');
  var song2 = yield readPromise('./song1.txt');
  var song3 = yield readPromise('./song3.txt');
  return [song1, song2, song3];
})
  .then((data) => data)
  .catch((err) => console.log(err + ''));

setTimeout(() => {
  console.log(arr);
}, 2000);

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
  var values = yield [
    readPromise('./song2.txt'),
    readPromise('./song1.txt'),
    readPromise('./song3.txt'),
  ];
  return values;
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err + ''));
