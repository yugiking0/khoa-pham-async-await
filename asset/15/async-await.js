const fs = require('fs');

let readFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};

// Khai báo hàm Async
async function run() {
  var value1 = await readFile('../docs/test1.txt');
  var value2 = await readFile('../docs/test2.txt');
  var value3 = await readFile('../docs/test3.txt');
  return [value1, value2, value3];
}

// Thực thi
run()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
