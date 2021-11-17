//todo: Promise basic
var fs = require('fs');

let readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

//! Đọc lần lượt từng file

readFilePromise('../docs/test1.txt')
  .then((test1) => {
    console.log(test1);
    return readFilePromise('../docs/test2.txt');
  })
  .then((test2) => {
    console.log(test2);
    return readFilePromise('../docs/test3.txt');
  })
  .then((test3) => console.log(test3))
  .catch((err) => console.log(err + ''));

let onDone = (data) => console.log(data);
let onError = (error) => console.log(error + '');

// Viết ngắn gọn lại

readFilePromise('../docs/test1.txt')
  .then(onDone)
  .then(() => readFilePromise('../docs/test2.txt'))
  .then(onDone)
  .then(() => readFilePromise('../docs/test3.txt'))
  .then(onDone)
  .catch(onError);
