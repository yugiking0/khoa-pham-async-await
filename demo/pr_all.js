function tOut(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${t} ms`);
    }, t);
  });
}
var time_start = new Date();

// Resolving a normal promise
tOut(1000)
  .then(function (res) {
    console.log('Task 1: ', res);
    return tOut(4000);
  })
  .then(function (res) {
    console.log('Task 2: ', res);
    return tOut(6000);
  })
  .then(function (res) {
    console.log('Task 3: ', res);
    console.log('Total time normal promise: ', new Date() - time_start);
  });

// Promise.all
//prettier-ignore
Promise.all([tOut(1000), tOut(4000), tOut(6000)])
  .then(function (res) {
    console.log('Total time Promise.all: ', new Date() - time_start);
  }
);
