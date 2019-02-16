var fs = require('fs');
var globalConfig = require('./config');

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync('web');

for (var i = 0, len = files.length; i < len; i ++) {
  var temp = require('./web/' + files[i]);
  if (temp.path) {
    for (var [key, value] of temp.path) {
      if (pathMap.get(key) == null) {
        pathMap.set(key, value);
      } else {
        throw new Error('url path 异常，url:' + key);
      }
    }
    controllerSet.push(temp);
  }
}

module.exports = pathMap;