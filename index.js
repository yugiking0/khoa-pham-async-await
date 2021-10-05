'strict mode';
// Async

const fs = require('fs');

fs.readFile('./asset/docs/test10.txt', 'utf-8', (err, data) => {
  if (err) {
    return console.error(err + '');
  }
  console.log('Dữ liệu: ', data);
});

console.log('Kết thúc.');
