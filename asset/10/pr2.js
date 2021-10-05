// Phép tính cộng
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      return resolve(a + b);
    }, 1000);
  });
};

let multiply = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      return resolve(a * b);
    }, 1000);
  });
};

let divide = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Tham số truyền vào phải là kiểu number!'));
      }
      if (b === 0) {
        return reject(new Error('Số chia phải khác 0.'));
      }
      return resolve(a / b);
    }, 1000);
  });
};
/*
let square = (a, b, h) => {
  add(a, b)
    .then((res) => multiply(res, h))
    .then((res) => divide(res, 2))
    .then((res) => console.log('Diện tích hình thang: ' + res))
    .catch((err) => console.log(err + ''));
};

square(4, 6, 5);
*/
let square = (a, b, h) => {
  return add(a, b)
    .then((res) => multiply(res, h))
    .then((res) => divide(res, 2));
};

square(4, 5, 6)
  .then((res) => console.log('Diện tích hình thang: ' + res))
  .catch((err) => console.log(err + ''));
