$(function () {
  // 点击去注册链接 隐藏登录 hide() 显示注册 show()
  $('.reg_btn').on('click', function () {
    $('.login-box').hide()
    $('.reg').show()
  })

  // 点击去登录 隐藏注册 显示登录
  $('.login_btn').on('click', function () {
    $('.login-box').show()
    $('.reg').hide()
  })

  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg [name=password]').val()
      if (pwd !== value) {
        return ('两次输入不一样！')
      }
    }
  })

  // 监听注册表单的提交
  var layer = layui.layer;
  $('#form_reg').on('submit', function (e) {
    console.log(111);
    // 阻止表单的默认行为
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录');
        $('.login_btn').click();
      }
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }
        layer.msg('登录成功')
        console.log(res.token)
        localStorage.setItem('token', res.token);
        location.href = 'index.html'
      }
    })
  })
  // 阻止默认行为

  // $.ajaxPrefilter(function (options) {

  // })
})