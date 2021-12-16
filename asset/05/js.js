function logCount(ms) {
  setTimeout(function () {
    console.log(1);
    setTimeout(function () {
      console.log(2);
      setTimeout(function () {
        console.log(3);
        setTimeout(function () {
          console.log(4);
          setTimeout(function () {
            console.log(5);
            setTimeout(function () {
              console.log(6);
              setTimeout(function () {
                console.log(7);
                setTimeout(function () {
                  console.log(8);
                }, ms);
              }, ms);
            }, ms);
          }, ms);
        }, ms);
      }, ms);
    }, ms);
  }, ms);
}

logCount(1000);
