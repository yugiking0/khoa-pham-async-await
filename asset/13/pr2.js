// Promise.all

// Phép tính cộng
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(
          new Error('Tham số truyền vào phải là kiểu number! PHEP CONG')
        );
      }
      return resolve(a + b);
    }, 1000);
  });
};

// Phép tính nhân
let multiply = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(
          new Error('Tham số truyền vào phải là kiểu number! PHEP NHAN')
        );
      }
      return resolve(a * b);
    }, 1000);
  });
};

// Phép tính chia
let divide = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(
          new Error('Tham số truyền vào phải là kiểu number! PHEP CHIA')
        );
      }
      if (b === 0) {
        return reject(new Error('Số chia phải khác 0.'));
      }
      return resolve(a / b);
    }, 1000);
  });
};

var aResult = Promise.race([add(4, 5), multiply(2, 3), divide(6, 2)]);
// .then((res) => console.log('Ket qua: ', res))
// .catch((err) => console.log(err + ''));

console.log(aResult);
