/**
 * Viết Promise liên tục Diện tích hình thang
 * Dt = (a + b) * h/2
 */

// note: Cộng
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if ((typeof a != "number") | (typeof b != "number")) {
        return reject(new Error("Tham số truyền vào phải là kiểu số!"));
      }
      return resolve(a + b);
    });
  });
};

// add(4, `5`).then(
//   (res) => console.log(res),
//   (err) => console.log(err + '')
// );

// note: Nhân
let multiply = (a, h) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if (typeof h != "number") {
        return reject(new Error("Tham số truyền vào phải là kiểu số!"));
      }
      return resolve(a * h);
    });
  });
};

// note: Chia
let divide = (a, c) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if (typeof c != "number") {
        return reject(new Error("Tham số truyền vào phải là kiểu số!"));
      } else if (typeof c === 0) {
        return reject(new Error("Số chia phải khác 0!"));
      } else {
        return resolve(a / c);
      }
    });
  });
};

// add(2, 3)
//   .then(
//     (res) => multiply(res, 2),
//     (err) => console.log('Lỗi 1: ' + err + '')
//   )
//   .then(
//     (result) => divide(result, 2),
//     (error) => console.log('Lỗi 2: ' + error + '')
//   )
//   .then(
//     (re) => console.log(re),
//     (er) => console.log('Lỗi 3: ' + er + '')
//   );

let dienTichHinhThang = (a, b, c) => {
  return add(a, b)
    .then((res) => multiply(res, c))
    .then((result) => divide(result, 2));
};

// dienTichHinhThang(3, 3, 4).then(
//   (result) => console.log('Diện tích hình thang là ' + result),
//   (err) => console.log('Lỗi 3: ' + err + '')
// );

//-----------------------------------------------

let dienTichHinhThang2 = (a, b, c) => {
  return add(a, b)
    .then(
      (res) => multiply(res, c),
      (err) => console.log("Lỗi 1: " + err + "")
    )
    .then(
      (result) => divide(result, 2),
      (error) => console.log("Lỗi 2: " + error + "")
    )
    .then(
      (result) => console.log(result),
      (err) => console.log("Lỗi 3: " + err + "")
    );
};

dienTichHinhThang2("3", 3, 4).then(
  (mess) => console.log("Diện tích: " + mess),
  (err) => console.log("Lỗi 4: " + err)
);

var add2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});
