function sleep(ms, data) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(++data), ms);
  });
}

sleep(1000, 0)
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .then(function (data) {
    console.log(data);
    return sleep(1000, data);
  })
  .catch((error) => console.error('Error: ', error))
  .finally(() => console.log('Done!'));
