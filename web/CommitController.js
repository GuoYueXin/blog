var commitDao = require('../dao/CommitDao');
var respUtil = require('../util/respUtil');
var timeUtil = require('../util/timeUtil');

var path = new Map();

// 添加评论
function addCommit (request, response) {
  request.on('data', function (data) {
    var params = JSON.parse(data.toString());
    commitDao.insertCommit(params.blogId, params.parent, params.username, params.content, params.email, timeUtil.getNow(), timeUtil.getNow(), function (result) {
      console.log(result);
      response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
      response.write(respUtil.writeResult('success', '添加成功', null));
      response.end();
    })
  });
}
path.set('/addCommit', addCommit);

module.exports = { path };