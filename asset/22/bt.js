var books = [
  { title: 'C++', author: 'Bjarne' },
  { title: 'Java', author: 'James' },
  { title: 'Python', author: 'Guido' },
  { title: 'Java', author: 'James' },
];

/*
 books = [
                { title: "C++", author: "Bjarne" },
                { title: "JavaJava", author: "JamesJames" },
                { title: "Python", author: "Guido" },     
            ];
*/

let newArr = books.reduce(function (sumOf, item) {
  var i = sumOf.findIndex((x) => x[0].title == item.title); // Xác định index của item đã có trong mảng
  console.log(i);
  if (i < 0) {
    sumOf.push([item, 1]);
  } else {
    sumOf[i][1]++;
  }
  return sumOf;
}, []);
console.log(newArr);
