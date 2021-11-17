// Function Basic
function logString(str) {
  return console.log('Basic: ', str);
}
// Async Function
async function aShowString(str) {
  return str;
}

logString('Begin');
aShowString('Begin Async').then((res) => console.log('Async: ', res));
logString('Hello');
logString('Xin chao');

aShowString('Hello').then((res) => console.log('Async: ', res));
aShowString('Xin chao').then((res) => console.log('Async: ', res));
logString('End');
aShowString('End Async').then((res) => console.log('Async: ', res));
