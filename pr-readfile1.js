let fs = require('fs');

let promiseReadFile = (patch) => {
  return new Promise((resolve, reject) => {
    return fs.readFile(patch, 'utf8', (err, data) => {
      if (err) return reject(new Error('Loi doc file'));
      return resolve(data);
    });
  });
};

promiseReadFile('./asset/docs/test1.txt').then(
  (data) => console.log(data),
  (err) => console.log(err + '')
);
