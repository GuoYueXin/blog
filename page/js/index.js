var everyDay = new Vue({
  el: '#every-day',
  data: {
    content: '',
  },
  computed: {
    getContent: function () {
      return this.content;
    }
  },
  created: function () {
    // 请求数据
  axios({
    method: 'post',
    url: '/queryEveryDay',
  }).then(function (response) {
    everyDay.content = response.data.data[0].content;
  }).catch(function  () {
    console.log('请求接口失败')
  });
  },
});

var articleList = new Vue({
  el: '#article-list',
  data: {
    page: 1,
    pageSize: 5,
    total: 100,
    pageNumList: [],
    articleList: []
  },
  computed: {
    getPage: function () {
      return function (page, pageSize) {
        axios({
          method: 'post',
          url: '/getBlog?page=' + page + '&pageSize=' + pageSize
        }).then(function (resp) {
          var list = [];
          articleList.total = resp.data.data[resp.data.data.length-1].total;
          resp.data.data.pop();
          resp.data.data.forEach(function (ele) {
            var temp = {};
            temp.title = ele.title;
            temp.content = ele.content;
            temp.time = new Date(parseInt(ele.ctime + '000')).toLocaleDateString().replace(/\//g, '-');
            temp.count = ele.views;
            temp.tags = ele.tags.split(',');
            temp.id = ele.id;
            list.push(temp);
          });
          articleList.generateTotal(articleList.total);
          console.log(articleList.pageNumList);
          articleList.articleList = list;
        }).catch(function (resp) {
          console.log(resp);
        });
      }
    },
    generateTotal: function (total) {
      return function (total) {
        if (total < 5) {
          return;
        }
        var list = [];
        var size = parseInt(total/articleList.pageSize + 1);
        console.log(size);
        if (articleList.page === 1) {
          list.push({ text: '<', size: 1 });
        } else {
          list.push({ text: '<', size: articleList.page - 1 });
        }
        for (var i = 1; i <= (total + articleList.pageSize - 1)/articleList.pageSize; i++) {
          list.push({ text: i, size: i });
        }
        if (articleList.page === size) {
          list.push({ text: '>', size: articleList.page - 1 });
        } else {
          list.push({ text: '>', size: size });
        }
        articleList.pageNumList = list;
      }
    }
  },
  created: function () {
    this.getPage(this.page, this.pageSize);
  },
});
