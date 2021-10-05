// todo : Promise liên tục Promise xử lý (4 + 5) + 6

// !Learn:  Basic
let aPromise = new Promise((resolve, reject) => {
  resolve(console.log('Check!!'));
});

aPromise.then(
  (mess) => console.log('Trang thai: ' + mess),
  (err) => console.log(err + '')
);

//Note: Viết Promise xử lý (4 + 5) + 6
let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((typeof a != 'number') | (typeof b != 'number')) {
        return reject(new Error('Kiểm tra biến truyền vào phải là kiểu số!'));
      }
      return resolve(a + b);
    }, 1000);
  });
};

add(4, '5')
  .then(
    (result) => add(result, '6'),
    (err) => console.log('Lỗi 1: ' + err)
  )
  .then(
    (rs) => console.log(rs),
    (er) => console.log('Lỗi 2: ' + er)
  );
