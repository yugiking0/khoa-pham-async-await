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

let aPromise = Promise.resolve(add(4, 5));

// console.log(aPromise); // Promise { <pending> }
aPromise.then((res) => console.log(res));
// 9
