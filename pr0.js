// SYNTAX

let aPromise = new Promise((resolve, reject) => {
  // resolve('Thanh cong');
  reject(new Error('Ket noi that bai'));
});

aPromise.then(
  (mess) => console.log('Trang thai: ' + mess),
  (err) => console.log(err + '')
);
