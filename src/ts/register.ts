require(['js/config'], () => {
  require(['jquery'], () => {
    interface Result {
      name: string,
      isOK: boolean,
      msg: string
    }
    let form = $(".register-form"),
      items = form.find('.form-item'),
      tips = form.find('.input-tip')
    let result: Result[] = []
    // 初始化验证是否通过数组
    let names = [
      '用户名', '密码', '确认密码', '邮箱'
    ]
    for (let i = 0; i < items.length; ++i) {
      result.push({
        name: names[i],
        isOK: false,
        msg: `${names[i]}不能为空！`
      })
    }
    interface S {
      [index: string]: Function
    }
    let s: S = {
      'form-account': (str: string) => /^[a-zA-Z0-9_-]{4,20}$/.test(str),
      'form-pwd': (str: string) => /^\w{6,20}$/.test(str),
      'form-equalTopwd': (str: string) => str.length >= 6 && items.find('#form-pwd').val() === str,
      'form-email': (str: string) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str)
    }
    items.each((i, el) => {
      let input = $($(el).children()[1])
      function valide() {
        if (!input.val()) {
          $(el).addClass('error')
          result[i].isOK = false
          result[i].msg = `${result[i].name}不能为空！`
          $(tips[i]).css('color', '#c00')
        } else if (s[input.attr('id')](input.val())) {
          $(el)
            .removeClass('inputting sucess error')
            .addClass('sucess')
          result[i].isOK = true
          result[i].msg = `${result[i].name}验证通过！`
          $(tips[i]).css('color', 'green')
        } else {
          $(el)
            .removeClass('inputting sucess error')
            .addClass('error')
          result[i].isOK = false
          result[i].msg = `${result[i].name}验证失败！`
          $(tips[i]).css('color', '#c00')
        }
        // 更改信息
        $(tips[i]).text(result[i].msg)
      }
      input
        .on('focus', function () {
          $(el)
            .removeClass('inputting sucess error')
            .addClass('inputting')
        })
        .on('blur', function () {
          $(el).removeClass('inputting')
          // 验证
          valide()
        })
        .on('input', () => {
          valide()
        })
    })

    let subBtn = $('.btn-register')
    subBtn.click(function(e: JQueryEventObject) {
      e.preventDefault()
      for (let x of result) {
        if (!x.isOK) {
          alert(x.msg)
          return
        }
      }
      alert('注册成功')
    })
  })
})