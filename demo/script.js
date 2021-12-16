var newPromise = new Promise((resolve, reject) => {
  console.log("Xử lý Promise!");
  // Fake API data Promise
  reject(new Error("Lỗi request Timeout!"));
});

setTimeout(() => {
  console.log(newPromise);
}, 1000);

newPromise
  .then(
    function (result) {
      console.log("Successfully: ", result);
    },
    function (error) {
      console.error(error + "");
    }
  )
  // .catch(function (error) {
  //   console.error(error + '');
  // })
  .finally(function () {
    console.log("Done!");
  });
