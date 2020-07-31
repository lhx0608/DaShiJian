$(function () {
  // 获取用户的基本信息
  getUserinfo()
  function getUserinfo() {
    var layer = layui.layer
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      headers: {
        Authorization: localStorage.getItem('token') || ''
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败!')
        }
        // 渲染头像
        renderAvatar(res.data)
      },
      // 不论成功还是失败，最终都会调用 complete 回调函数
      complete: function (res) {
        console.log(res)
        // 在complete回调函数中，可以通过responseJson拿到服务题响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
          localStorage.removeItem('token');
          location.href = '/login.html'
        }
      }
    })
  }
  // 渲染用户的头像
  function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      $('.layui-nav-img').hide()
      // 渲染文本头像
      var first = name[0].toUpperCase()
      $('.text-avatar').html(first).show()
    }
  }

  // 实现退出功能
  var layer = layui.layer
  $('#btnClose').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token'),
        location.href = 'login.html'
      layer.close(index);
    });
  })
})
