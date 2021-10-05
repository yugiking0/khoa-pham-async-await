const fs = require('fs');

// fs.readFile('../docs/test12.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     return console.log(new Error('Kiểm tra lại đường dẫn!') + '');
//   }
//   return console.log(data);
// });

let promiseRead = (path) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          return reject(new Error('Kiểm tra lại đường dẫn!') + '');
        }
        return resolve(data);
      });
    }, 1000);
  });
};
promiseRead('../docs/test1.txt').then(
  (res) => console.log(res),
  (err) => console.log(err)
);
