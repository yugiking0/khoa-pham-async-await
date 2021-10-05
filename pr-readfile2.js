let fs = require('fs');

let promiseReadFile = (patch) => {
  return new Promise((resolve, reject) => {
    return fs.readFile(patch, 'utf8', (err, data) => {
      if (err) return reject(new Error('Kiem tra lai duong dan bi sai!')); // if (err) return reject(err);
      return resolve(data);
    });
  });
};

promiseReadFile('./asset/docs/test3.txt').then(
  (data) => console.log(data),
  (err) => console.log(err + '')
);

let promiseRead = new Promise((resolve, reject) => {
  return fs.readFile('./asset/docs/test1.txt', 'utf8', (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});

promiseRead.then(
  (data) => console.log(data),
  (err) => console.log(err + '')
);
