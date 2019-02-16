var dbutil = require('./DBUtil');

function insertTagBlogMapping (tagId, BlogId, ctime, utime, success) {
  var insertSql = 'insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) value (?, ?, ?, ?)';
  var params = [tagId, BlogId, ctime, utime];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function(err, result) {
    if (!err) {
      success(result);
    }
  })
  connection.end();
}

module.exports = {
  insertTagBlogMapping,
}