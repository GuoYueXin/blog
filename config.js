var fs = require('fs');

var globalConfig = {};

var configArr = fs.readFileSync('./config.conf').toString().split('\r\n');

for(var i = 0, len = configArr.length; i < len; i ++) {
  var item = configArr[i].split('=');
  globalConfig[item[0].trim()] = item[1].trim();
}

module.exports = globalConfig;
