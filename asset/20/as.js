function aLog(time, str) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(str);
    }, time);
  });
}
function basicLog() {
  aLog(200, 'Dòng 1').then((res) => console.log('Basic: ', res));
  console.log('Basic');
  aLog(100, 'Dòng 2').then((res) => console.log('Basic: ', res));
}

async function asynLog() {
  await aLog(200, 'Dòng 1').then((res) => console.log('Async: ', res));
  console.log('Async');
  await aLog(100, 'Dòng 2').then((res) => console.log('Async: ', res));
}
basicLog();
asynLog();
