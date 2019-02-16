var dbutil = require('./DBUtil');

function insertCommit (blog_id, parent, user_name, comments, email, ctime, utime, success ) {
  var insertSql = 'insert into comments (blog_id, parent, user_name, comments, email, ctime, utime) value (?, ?, ?, ?, ?, ?, ?);'
  var params = [blog_id, parent, user_name, comments, email, ctime, utime];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function (err, result) {
    if (!err) {
      success(result);
    } else {
      console.log(err);
    }
  });
  connection.end();
}



module.exports = {
  insertCommit,
}