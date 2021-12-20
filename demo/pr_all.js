function waitSecond() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('Log');
      res();
    }, 1000);
  });
}

function runSeries() {
  console.time('series');
  waitSecond().then(() => {
    console.log('1');
    waitSecond().then(() => {
      console.log('2');
      waitSecond().then(() => {
        console.log('3');
        waitSecond().then(() => {
          console.log('4');
          waitSecond().then(() => {
            console.log('5');
            console.timeEnd('series');
          });
        });
      });
    });
  });
}

function runParallel() {
  console.time('parallel');
  Promise.all([
    waitSecond(),
    waitSecond(),
    waitSecond(),
    waitSecond(),
    waitSecond(),
  ]).then(() => {
    console.timeEnd('parallel');
  });
}

runSeries();
runParallel();
