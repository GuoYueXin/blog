var dbutil = require('./DBUtil');

function addEveryDay (content, ctime, success) {
  var insertSql = 'INSERT INTO every_day (content, ctime) value (?, ?) '
  var params = [content, ctime];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function (err, result) {
    if (!err) {
      success(result);
    }
  })
  connection.end();
}

function queryEveryDay (success) {
  var querySql = 'SELECT * FROM every_day ORDER BY id DESC LIMIT 1';
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, function (err, result) {
    if (!err) {
      success(result);
    }
  })
  connection.end();
}

module.exports = {
  addEveryDay,
  queryEveryDay,
}