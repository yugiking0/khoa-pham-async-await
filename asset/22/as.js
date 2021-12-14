// Phep Cong
var add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        return reject(
          new Error('Tham so truyen vao phai kieu Number - PHEPCONG')
        );
      }
      return resolve(a + b);
    }, 100);
  });
};

// Phep Nhan
var multiply = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        return reject(
          new Error('Tham so truyen vao phai kieu Number - PHEPNHAN')
        );
      }
      return resolve(a * b);
    }, 100);
  });
};

// Phep Chia
var divide = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        return reject(
          new Error('Tham so truyen vao phai kieu Number - PHEPCHIA')
        );
      } else if (b === 0) {
        return reject(new Error('Tham so truyen vao phai khac 0 - PHEPCHIA'));
      }
      return resolve(a / b);
    }, 1000);
  });
};

var tinhDienTich = async (a, b, c) => {
  try {
    var ab = await add(a, b);
    var ah = await multiply(ab, c);
    var result = await divide(ah, 2);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};

async function xuLy(a, b, c) {
  var dt = await tinhDienTich(a, b, c)
    .then((res) => res)
    .catch((err) => console.log(err + ''));
  if (dt !== undefined) {
    console.log(dt);
  }
}

xuLy(4, 5, '6');
