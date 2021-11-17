var fs = require('fs');
var axios = require('axios');

fs.readFile('./data.json', { encoding: 'utf8' }, function (err, data) {
  console.log('Data loaded from disk', data);

  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(function (res) {
      console.log('Data downloaded from url', res.data);
    });
});

/**
 * Sử dụng async await kết hợp với Promise để viết lại đoạn code trên. Gợi ý: Viết lại 1 async function làm 2 việc trên và chạy thử
 */

async function load(file, url) {
  var data1 = await new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, res) => {
      if (err) return reject(err);
      return resolve('Data loaded from disk: ' + res);
    });
  }).then(
    (data) => data,
    (err) => console.log(err + '')
  );
  console.log('Data loaded from disk', data1);

  var data2 = await new Promise((resolve, reject) => {
    return axios
      .get(url)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  }).then(
    (data) => data,
    (err) => console.log(err + '')
  );
  console.log('Data downloaded from url', data2);

  //return [data1, data2];
}

load('./data.json', 'https://jsonplaceholder.typicode.com/todo2s/1').catch(
  (err) => console.log(err + '')
);
