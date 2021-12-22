var users = [
  {
    id: 1,
    username: 'Kien Dam',
  },
  {
    id: 2,
    username: 'Son Dang',
  },
  {
    id: 3,
    username: 'Hung Dam',
  },
];

var comments = [
  {
    id: 1,
    user_id: 1,
    content: 'anh Son chua ra video :(',
  },
  {
    id: 2,
    user_id: 2,
    content: 'Vừa ra xong em ơi!',
  },
  {
    id: 3,
    user_id: 1,
    content: 'Cam on anh ^^',
  },
  {
    id: 4,
    user_id: 2,
    content: 'OK',
  },
];
/**
 * 1. Lấy dữ liệu comments
 * 2. Lấy dữ liệu các user thuộc những user comments
 * 3. Nối dữ liệu xác định user_name : comment
 */

//1. Lấy comments
var getComments = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(comments);
    }, 1000);
  });
};

//2. Lấy user by ID
var getUsersByID = function (userIds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var results = users.filter(function (user) {
        return userIds.includes(user.id);
      });

      resolve(results);
    }, 1000);
  });
};

getComments()
  .then(function (comments) {
    var userIds = comments.map((comment) => comment.user_id);

    //Cần trả return Promise để tạo Promise Chain
    return getUsersByID(userIds).then(function (users) {
      // Trả lại các bảng liên quan
      return {
        users: users,
        comments: comments,
      };
    });
  })
  .then(function (data) {
    // Xử lý ra chat-box
    // console.log(data);
    var commentBox = document.getElementById('comments-box');
    var html = '';
    // Lặp qua lấy từng Comment
    data.comments.forEach((comment) => {
      // Lấy User có cùng id comment
      var user = data.users.find((user) => user.id == comment.user_id);

      // Gán cho html user.username : comment.content
      html += `<li> ${user.username} : ${comment.content} </li>`;
    });
    commentBox.innerHTML = html;
  });
