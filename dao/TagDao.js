var dbutil = require('./DBUtil');

function insertTag (tag, ctime, utime, success) {
  var insertSql = 'insert into tags (tag, ctime, utime) value (?, ?, ?)';
  var params = [tag, ctime, utime];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function (err, result) {
    if (!err) {
      success(result);
    }
  });
  connection.end();
}

// 查询tag是否存在
function queryTag (tag, success) {
  var querySql = 'select * from tags where tag = ?';
  var params = [tag];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function (err, result) {
    if (!err) {
      success(result);
    }
  });
  connection.end();
}

// 查询所有tag
function queryAllTag (success) {
  var querySql = 'select * from tags;';
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, function (err, result) {
    if (!err) {
      success(result);
    }
  });
  connection.end();
}

module.exports = {
  insertTag,
  queryTag,
  queryAllTag,
}