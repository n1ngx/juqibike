require(['js/config'], () => {
  require(['jquery'], () => {
    function ats(arr: any[], cb: (v: any, i?: number, arr?: any[]) => any) {
      return arr.map(cb).join('').trim()
    }
    // 登录 退出
    let userName = localStorage.getItem('user')
    log(userName)
    if (userName) {
      $('.login .no').hide()
      let logout = $('<a href="javascript:">退出</a>')
      $('.login .yes')
        .show()
        .html(`
          欢迎您，${userName}，
        `)
        .append(logout)
      logout.click(() => {
        localStorage.removeItem('user')
        $(window).attr('location', rootUrl)
      })
    }

    // 搜索
    $('#search-input').on('input', (e) => {
      if (e.target.tagName.toLowerCase() !== 'li') {
        return
      }
      let el = e.target as HTMLInputElement,
          $sug = $('.s-suggestion')
      if (el.value) {
        $sug.show()
      } else {
        $sug.hide()
      }
      $.ajax({
        method: 'get',
        url: 'http://suggestion.baidu.com/su',
        dataType: 'jsonp',
        jsonp: 'cb',
        data: {
          wd: el.value
        },
        success: (res) => {
          let s = res.s
          s = s.map((x: string) => `<li>${x}</li>`)
          $sug
          .html('')
          .append(
            $('<ul>')
            .append(s)
            .click(function(e) {
              $(el).val($(e.target).text())
              $sug.html('')
            })
          )
        }
      })
    })
    // 购物车
    let shopcar = $('.shop-car'),
        nothing = $('.nothing'),
        list = shopcar.find('.list')
    if (userName) {
      shopcar.find('.no-login').hide()
      shopcar.find('.yes-login').show()
    }
    nothing.hide()
    $.ajax({
      method: 'get',
      url: root + 'shopcar',
      data: {
        username: localStorage.getItem('user')
      },
      success: (res) => {
        if (res.length === 0) {
          nothing.show()
          list.hide()
          shopcar.find('.pay').hide()
        }
        let str = ats(res, v => `
          <li>
            <div class="pic">
              <img src="${v.img}" alt="">
            </div>
            <div class="link">
              <a href="javascript:">${v.msg}</a>
            </div>
            <div class="price">￥<span>${v.price}</span>x<span>${v.num}</span></div>
            <div class="del">
              <a href="javascript:">删除</a>
            </div>
          </li>
        `)
        list
        .html(str)
        .find('a').click(function(this: HTMLElement, e: MouseEvent) {
          $(this).parent().parent().remove()
          if (list.children().length === 0) {
            nothing.show()
            list.hide()
            shopcar.find('.pay').hide()
          }
          count()
        })
        $('#shopcar .shop-count').text(res.length)
        function count() {
          let o = {
            total: 0,
            num: 0
          }
          let l = list.find('.price')
          l.each((i, v: HTMLElement) => {
            let s = $(v).find('span'),
                s0 = $(s[0]),
                s1 = $(s[1])
            o.total += +s0.text() * +s1.text()
            o.num += +s1.text()
          })
          let pay = shopcar.find('.pay .total span')
          $(pay[0]).text(o.num)
          $(pay[1]).text('￥' + o.total)
          $('#shopcar .shop-count').text(o.num)
        }
        count()
        // let o = res.reduce((p: any, n: any) => ({
        //   total: p.total + n.price * n.num,
        //   num: p.num + n.num
        // }), {
        //   total: 0,
        //   num: 0
        // })
        // let pay = $('.shop-car .pay .total span')
        // $(pay[0]).text(o.num)
        // $(pay[1]).text('￥' + o.total)
      }
    })
    // 
  })
})