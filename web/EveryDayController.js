var everyDayDao = require('../dao/EveryDayDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');

var path = new Map();

function addEveryDay (request, response) {
  request.on('data', function (data) {
    everyDayDao.addEveryDay(data.toString().trim(), timeUtil.getNow(), function (result) {
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      response.write(respUtil.writeResult('success', '添加成功', null));
      response.end();
    })
  });
}
path.set('/addEveryDay', addEveryDay);

function queryEveryDay (request, response) {
  everyDayDao.queryEveryDay(function (result) {
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    response.write(respUtil.writeResult('success', '查询成功', result));
    response.end();
  })
}
path.set('/queryEveryDay', queryEveryDay);

module.exports = { path };