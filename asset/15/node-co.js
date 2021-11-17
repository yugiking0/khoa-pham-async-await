const fs = require('fs');

let readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

readFile('../docs/song1.txt')
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//! Sử dụng Node co
const co = require('co');
var arrFiles = ['../docs/test1.txt', '../docs/test2.txt', '../docs/test3.txt'];

//Cách 1

var testList = co(function* () {
  // Sử dụng mảng arrFiles đã khai báo trước đó mà không truyền vào Function
  var values = yield arrFiles.map((item) => {
    return readFile(item);
  });
  return values;
})
  .then((res) => res)
  .catch((err) => console.log(err));

setTimeout(() => {
  console.log(testList);
}, 1000);

//Cách 2: Sử dụng như Function có tham số urls

let readFilesCo = co.wrap(function* (urls) {
  return yield urls.map((url) => {
    return readFile(url);
  });
});

var listSongs = readFilesCo(['../docs/song1.txt', '../docs/song2.txt'])
  .then((res) => res)
  .catch((err) => console.log(err));
console.log(listSongs);

setTimeout(() => {
  console.log(listSongs);
}, 1000);
