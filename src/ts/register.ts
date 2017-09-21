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
      'form-account': (str: string) => /^[\u4e00-\u9fa5A-Za-z0-9-_]{2,20}$/.test(str),
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
          getUserName()
        })
        .on('input', () => {
          valide()
        })
    })
    // Rx做实时判断用户名是否存在
    $('#form-account').on('input', (e) => {
      getUserName()

    })
    function getUserName() {
      let el = $('#form-account')[0] as HTMLInputElement
      $.ajax({
        method: 'get',
        url: root + 'register',
        data: {
          username: el.value
        },
        success: (res) => {
          if (res.isRepeat) {
            $(items[0])
              .removeClass('inputting sucess error')
              .addClass('error')
            result[0].isOK = false
            result[0].msg = `${result[0].name}${el.value}已存在！`
            $(tips[0]).text(result[0].msg)
            $(tips[0]).css('color', '#c00')
          }
        }
      })
    }
    let subBtn = $('.btn-register')
    subBtn.click(function (e: JQueryEventObject) {
      let url = root + 'register'
  
      e.preventDefault()
      for (let x of result) {
        if (!x.isOK) {
          alert(x.msg)
          return
        }
      }
      $.ajax({
        method: 'post',
        url,
        data: {
          name: $('#form-account').val(),
          pwd: $('#form-pwd').val(),
          email: $('#form-email').val()
        },
        success: (res) => {
          switch(res.status) {
            case 'success': {
              alert('注册成功！')
              $(window).attr('location', rootUrl + 'login.html')
              break
            }
            case 'error': {
              alert('注册失败！')
              ;($('.register-form')[0] as HTMLFormElement).reset()
              break
            }
          }
        }
      })
    })
  })
})