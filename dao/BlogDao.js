var dbutil = require('./DBUtil');

// 插入博客
function insertBlog (title, content, views, tags, ctime, utime, success) {
  var insertSql = 'insert into blog (title, content, views, tags, ctime, utime) value (?, ?, ?, ?, ?, ?)';
  var params = [title, content, views, tags, ctime, utime];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function(err, result) {
    console.log(err, result);
    if (!err) {
      success(result);
    }
  })
  connection.end();
}
// 查询博客列表
function queryBlog (page, pageSize, success) {
  var querySql = 'select * from blog order by id limit ?, ?;';
  var params = [page * pageSize, pageSize];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function(err, result) {
    if (!err) {
      success(result);
    }
  })
  connection.end();
}

// 查询博客详情
function queryBlogDetial (blogId, success) {
  var querySql = 'select * from blog where id = ?;';
  var params = [blogId];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function(err, result) {
    if (!err) {
      success(result);
    }
  })
  connection.end();
}

// 查询博客总数
function queryTotal  (success) {
  var querySql = 'select count(1) as count from blog;';
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, function(err, result) {
    if (!err) {
      success(result);
    }
  })
  connection.end();
}

// 更新博客访问量
function updateBlogViews (count, blogId, success) {
  var updateSql = "update blog set views = ? where id = ?;";
  var params = [count, blogId];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(updateSql,params,  function(err, result) {
    if (!err) {
      success(result);
    } else {
      console.log(err);
    }
  })
  connection.end();
}


module.exports = {
  insertBlog,
  queryBlog,
  queryTotal,
  queryBlogDetial,
  updateBlogViews,
}