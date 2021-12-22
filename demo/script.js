/**
 * Data Users, Comments
 */

var users = [
  {
    id: 1,
    name: 'Kien Pham',
  },
  {
    id: 2,
    name: 'Son Dang',
  },
  {
    id: 3,
    name: 'Hung Dam',
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
    content: 'Vừa ra em ơi!',
  },
  {
    id: 3,
    user_id: 1,
    content: 'Cam on anh ^^',
  },
];

// Tạo load dữ liệu Comments Bất đồng bộ là một Promise
function getComments() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(comments);
    }, 1000);
  });
}

// Tạo load dữ liệu Users Bất đồng bộ là một Promise
// lấy theo list ID từ user đã Comments

function getUsersByID(userIds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      //Lọc những User nằm trong Array userIDs
      var results = users.filter(function (user) {
        // Kiểm tra đối chiếu userIds các phần tử là user.id
        return userIds.includes(user.id);
      });
      return resolve(results);
    }, 1000);
  });
}

// Xử lý lấy Data cần lấy từ back-end theo Promise Chain
getComments()
  .then(function (comments) {
    // Lấy userIds từ comments
    var userIds = comments.map(function (comment) {
      return comment.user_id;
    });
    return getUsersByID(userIds).then(function (users) {
      return {
        users: users,
        comments: comments,
      };
    });
  })
  .then(function (data) {
    var commentsBox = document.getElementById('comments-box');
    var html = '';

    // Lặp qua các Comments để lấy nội dung
    data.comments.forEach(function (comment) {
      // Với mỗi comment có user_id sẽ kết nối qua user để lấy thông tin user
      var user = data.users.find(function (user) {
        return user.id == comment.user_id;
      });
      html += `<li> ${user.name} : ${comment.content}</li> \n`;
    });

    commentsBox.innerHTML = html;
  });
