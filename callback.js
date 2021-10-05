// let square = (a,b,h)=> (a+b)*h/2;
// console.log("Dien tich: " + square(2,3,2));

let add0 = (a, b, cb) => {
  setTimeout(() => {
    let err, res;
    if (typeof a != "number" || typeof b != "number") {
      err = "Kiem tra lai cac so nhap";
      return cb(err, res); // ("Kiem tra lai cac so nhap", undefined)
    }
    res = a + b;
    return cb(err, res);
  }, 1000);
};

// 1. Cong
let add = (a, b, cb) => {
  setTimeout(() => {
    if (typeof a != "number" || typeof b != "number") {
      return cb(new Error("Kiem tra lai cac so nhap"));
    }
    return cb(undefined, a + b);
  }, 1000);
};

// add(4, 5, (err, res) => {
//   if (err) return console.log("Loi: " + err);
//   return console.log("Ket qua: " + res);
// });

// 2. Nhan
let multiply = (a, b, cb) => {
  setTimeout(() => {
    if (typeof a != "number" || typeof b != "number") {
      return cb(new Error("Kiem tra lai cac so nhap"));
    }
    return cb(undefined, a * b);
  }, 1000);
};

// 3. Chia
let divide = (a, b, cb) => {
  setTimeout(() => {
    if (typeof a != "number" || typeof b != "number") {
      return cb(new Error("Kiem tra lai cac so nhap"));
    }
    if (typeof b === 0) return cb(new Error("Chia cho 0 !"));
    return cb(undefined, a / b);
  }, 1000);
};

// 4. Tinh dien tich hinh thang
let tinhDienTichHinhThang = (a, b, h, cb) => {
  add(a, b, (err, res) => {
    if (err) return cb(err);
    multiply(res, h, (err, res) => {
      if (err) return cb(err);
      divide(res, 2, (err, square) => {
        if (err) return cb(err);
        cb(undefined, square);
      });
    });
  });
};

tinhDienTichHinhThang(2, 3, 2, (err, result) => {
  if (err) return console.log(err + "");
  console.log("Dien tich hinh thang la: " + result);
});
