// Phép Cộng
let add = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack(new Error('Tham so phai có kieu number.'));
    }
    return callBack(undefined, a + b);
  }, 1000);
};

// Phép Nhân
let multiply = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack(new Error('Tham so phai có kieu number.'));
    }
    return callBack(undefined, a * b);
  }, 1000);
};

// Phép Chia
let divide = (a, b, callBack) => {
  setTimeout(() => {
    if ((typeof a != 'number') | (typeof b != 'number')) {
      return callBack(new Error('Tham so phai có kieu number.'));
    }
    if (b == 0) {
      return callBack(new Error('So bi chia phai khac 0.'));
    }
    return callBack(undefined, a / b);
  }, 1000);
};

// Tính Diện tích hình thang

let square = (a, b, c, cb) => {
  add(a, b, (err1, res1) => {
    if (err1) return cb(err1);
    multiply(res1, c, (err2, res2) => {
      if (err2) return cb(err2);
      divide(res2, 2, (err3, res3) => {
        if (err3) return cb(err3);
        return cb(undefined, res3);
      });
    });
  });
};

// Diện tích hình thang
square(2, 3, `2`, (err, res) => {
  if (err) {
    return console.log(err + '');
  }
  console.log('Dien tich: ' + res);
});
