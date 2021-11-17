// Function Basic
function logString(str) {
  return console.log('Basic: ', str);
}
// Async Function
async function showString(str) {
  return str;
}

logString('Begin');
showString('Begin Async').then((res) => console.log('Async: ', res));
logString('Hello');
logString('Xin chao');

showString('Hello').then((res) => console.log('Async: ', res));
showString('Xin chao').then((res) => console.log('Async: ', res));
logString('End');
showString('End Async').then((res) => console.log('Async: ', res));

// Basic:  Begin
// Basic:  Hello
// Basic:  Xin chao
// Basic:  End
// Async:  Begin Async
// Async:  Hello
// Async:  Xin chao
// Async:  End Async
