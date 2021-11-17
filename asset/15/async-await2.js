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
async function run(urls) {
  var values = await urls.map((url) => {
    return readFile(url);
  });
  return values;
}
var listSongs = ['../docs/test1.txt', '../docs/test2.txt', '../docs/test3.txt'];
// Thực thi
var Files = run(listSongs)
  .then((data) => data)
  .catch((err) => console.log(err));

setTimeout(() => {
  console.log('Data: ', Files);
}, 1000);
