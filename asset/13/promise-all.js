var fs = require('fs');
let readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

Promise.all([
  readFilePromise('../docs/test1.txt'),
  readFilePromise('../docs/test29.txt'),
  readFilePromise('../docs/test3.txt'),
])
  .then((arr) => console.log(arr))
  .catch((err) => console.log(err + ''));
