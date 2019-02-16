var blogDetial = new Vue({
  el: '#blogDetial',
  data: {
    title: '',
    count: 0,
    tags: [],
    content: '',
    time: '',
  },
  computed: {

  },
  created: function () {
    var blogId = location.search.slice(1).split('=')[1];
    axios({
      method: 'post',
      url: '/getBlogDetial?blogId=' + blogId,
    }).then(function (resp){
      const data = resp.data.data[0];
      blogDetial.title = data.title;
      blogDetial.count = data.views;
      blogDetial.tags = data.tags.split(',');
      blogDetial.content = data.content;
      blogDetial.time = new Date(parseInt(data.ctime + '000')).toLocaleDateString().replace(/\//g, '-');
      console.log(blogDetial);
    }).catch(function (resp) {
      console.log(resp);
    });
  },
});