let aPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Không thể kết nối.'));
    // resolve('Thành công.');
  }, 2000);
});
aPromise.then(
  (msg) => console.log('Đã thực thi: ', msg),
  (err) => console.log(err + '')
);
