$(function () {
  // 自定义验证规则
  var form = layui.form
  var layer = layui.layer
  form.verify({
    // if(value.length)
    nickname: function (value) {
      if (value > 6) {
        return '昵称必须在1~6个字符之间'
      }
    }
  })
  // 初始化用户的基本信息
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取基本信息失败！')
        }
        console.log(res)
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })
})


// 监听表单的提交事件
$('.layui-btn').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/my/userinfo',
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('更新用户信息失败！');
      }
      layer.msg('更新用户信息成功！');
      // 调用父页面的方法
      window.parent.getUserInfo()
    }
  })
})



