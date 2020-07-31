$(function () {
  var layer = layui.layer
  var form = layui.form
  // 发起请求获取数据
  initCreateList()
  function initCreateList() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // 利用模板引擎渲染页面
        var htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr)
      }
    })
  }

  // 使用layer.open()实现弹出层效果
  var indexADD = null;
  $('#btn').on('click', function () {
    indexADD = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog_add').html()
    })
  })

  // 添加文章分类的功能
  // 通过代理的方式为 form 表单绑定submit事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      data: $(this).serialize(),
      url: '/my/article/addcates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initCreateList();
        layer.msg('新增分类成功！');
        layer.close(indexADD);
      }
    })
  })

  // 通过委派事件为 form_edit 绑定点击事件
  var indexEdit = null;
  $('tbody').on('click', '.btn-edit', function () {
    // console.log(11);
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog_edit').html()
    })
    var id = $(this).attr('data-id');
    console.log(id)
    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！');
        initCreateList();
        layer.close(indexEdit);

      }
    })
  })

  // 删除
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');
    console.log(id);
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'GET',
        url: '/my/article/deletecate/' + id,

        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败！')
          }
          initCreateList()
          layer.msg('删除成功！')
          layer.close(index);
        }
      })
    });
  })

})