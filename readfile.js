let fs = require('fs');

let a = fs.readFileSync('./asset/docs/test1.txt', 'utf8');

fs.readFile('./asset/docs/test21.txt', 'utf8', (err, data) => {
  if (err) return console.log(new Error('Loi doc file') + '');
  // if (err) throw err;
  console.log(data);
});

console.log(a);
