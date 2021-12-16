// var pr = function powerNumber(inputValue) {
//   return new Promise(function (resolve, reject) {
//     if (typeof inputValue == "number") {
//       return resolve(inputValue ** 2);
//     }
//     return reject();
//   });
// };

// console.log(pr("4"));

// var pr = new Promise(function (resolve, reject) {
//   var inputValue = 3;
//   if (typeof inputValue == "number") {
//     resolve();
//   } else reject();
// });

// console.log(pr);

// var pr = new Promise(function (resolve, reject) {
//   var inputValue = "3";
//   if (typeof inputValue !== "number") {
//     console.log("Thất bại");
//     reject("Lỗi");
//   } else {
//     console.log("Thành công");
//     resolve(inputValue ** 2);
//   }
// });

// //prettier-ignore
// pr
// .then(rs=>console.log("Result: ",rs), er=>console.log("Error1: ",er))
// .catch(err=>console.log("Error2: ",err))
// .finally(dt=>console.log("Done: ",dt))

var promise = new Promise(function (resolve, reject) {
  reject("Từ chối!");
});

promise
  .then(
    (rs) => rs,
    (error) => console.log("Error: ", error)
  )
  .catch((error) => console.log("Catch: ", error));
