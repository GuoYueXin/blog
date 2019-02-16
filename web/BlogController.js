var url = require('url');
var blogDao = require('../dao/BlogDao');
var tagDao = require('../dao/TagDao');
var tagBolgMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');

var path = new Map();

function addBlog (request, response) {
  var params = url.parse(request.url, true).query;
  var tags = params.tags.replace(/ /g, '').replace('，', ',');
  request.on('data', function (data) {
    blogDao.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      response.write(respUtil.writeResult('success', '添加成功', null));
      response.end();
      var blogId = result.insertId;
      var tagList = tags.split(',');
      for (var i = 0; i < tagList.length; i ++) {
        if (tagList[i] == '') {
          continue;
        }
        queryTag(tagList[i], blogId);
      }
    })
  });
}
path.set('/addBlog', addBlog);

// 查询博客列表
function getBlog (request, response) {
  var params = url.parse(request.url, true).query;
  blogDao.queryBlog(params.page-1, parseInt(params.pageSize), function (result) {
    for (var i = 0; i < result.length; i ++) {
      result[i].content = result[i].content.replace(/<img[\w\W]+>/g, '[图片]').replace(/<[\w\W]+>/g, '');
      if (result[i].content.length > 200) {
        result[i].content = result[i].content.slice(0,200).concat('...');
      }
    }
    blogDao.queryTotal(function (total) {
      result.push({ total: total[0].count });
      response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      response.write(respUtil.writeResult('success', '', result));
      response.end();
    })

  })
}
path.set('/getBlog', getBlog);

// 查询博客列表
function getBlogDetial (request, response) {
  var params = url.parse(request.url, true).query;
  blogDao.queryBlogDetial(params.blogId, function (result) {
    blogDao.updateBlogViews(parseInt(result[0].views + 1), parseInt(params.blogId), function (data) {
      result[0].views += 1;
      response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      response.write(respUtil.writeResult('success', '', result));
      response.end();
    });

  })
}
path.set('/getBlogDetial', getBlogDetial);


function queryTag(tag, blogId) {
  tagDao.queryTag(tag, function (result) {
    if (result == null || result.length === 0) {
      insertTag(tag, blogId);
    } else {
      insertTagBlogMapping(result[0].id, blogId);
    }
  })
}

function insertTag(tag, blogId) {
  tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
    insertTagBlogMapping(result.insertId, blogId);
  })
}

function insertTagBlogMapping(tagId, blogId) {
  tagBolgMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function(result) {
    console.log(result);
  })
}

module.exports = { path };