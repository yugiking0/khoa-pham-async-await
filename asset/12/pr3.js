let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      resolve(a + b);
    }, 1000);
  });
};

let rPromise = Promise.reject('Bị lỗi');
rPromise.then(
  (res) => console.log(res),
  (er) => console.log(er + '')
);
console.log(rPromise);
// Promise { <rejected> 'Bị lỗi' }
// Bị lỗi
