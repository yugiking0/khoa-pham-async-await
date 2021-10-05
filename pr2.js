let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        return reject(new Error('Bien truyen vao phai la kieu so.'));
      }
      resolve(a + b);
    }, 2000);
  });
};

add(4, 5).then(
  (res) => console.log(res),
  (err) => console.log(err + '')
);
