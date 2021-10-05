const fs = require('fs');

// fs.readFile('../docs/test12.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     return console.log(new Error('Kiểm tra lại đường dẫn!') + '');
//   }
//   return console.log(data);
// });

const fs = require('fs');
let promiseRead = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(new Error('Kiểm tra lại đường dẫn!') + '');
      }
      return resolve(data);
    });
  });
};
promiseRead('../docs/test1.txt').then(
  (res) => console.log(res),
  (err) => console.log(err)
);
