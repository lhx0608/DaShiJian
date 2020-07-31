$(function () {
  var layer = layui.layer
  var q = {
    pagenum: 1, //页码值
    pagesize: 2, //每页显示的数据
    cate_id: '', //文章分类的id
    state: ''  //文章的状态
  }

  initTable()
  // 获取文章数据的方法
  function initTable() {
    $.ajax({
      tyle: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // 使用模板引擎渲染页面
        var htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr)
      }
    })
  }

  // 初始化文章分类的方法

})