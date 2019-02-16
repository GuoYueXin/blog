var tagDao = require('../dao/TagDao');
var respUtil = require('../util/respUtil');

var path = new Map();

function queryTag (request, response) {
  tagDao.queryAllTag(function (result) {
    var tagArr = [];
    result.forEach(function (ele) {
      tagArr.push(ele.tag);
    });
    response.writeHead(200, { "Content-Type": "application/json:charset=utf-8" });
    response.write(respUtil.writeResult('success', '查询成功', tagArr));
    response.end();
  })
}

path.set('/queryTag', queryTag);

module.exports = { path };