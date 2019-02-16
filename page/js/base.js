var tags = new Vue({
  el: '#tags',
  data: {
    tags: []
  },
  computed: {
    randomColor: function () {
      return function () {
        const red = Math.random() * 255;
        const green = Math.random() * 255;
        const blue = Math.random() * 255;
        return 'rgb('+ red +','+ green +','+ blue +')';
      }
    },
    randomSize: function () {
      return function () {
        const size = Math.random() * 5 + 12 + 'px';
        return size;
      }
    }
  },
  created: function () {
    axios({
      method: 'post',
      url: '/queryTag',
    }).then(function (resp) {
      tags.tags = resp.data.data;
    }).catch(function (resp) {
      console.log(resp);
    });
  },
});