define(['jquery'], () => {
  function ats(arr: any[], cb: (v: any, i?: number, arr?: any[]) => any) {
    return arr.map(cb).join('').trim()
  }
  $.ajax({
    url: root + 'banner?type=2',
    async: false,
    success: (res) => {
      init(res)
    }
  })
  function init(res: any) {
    let str = ''
    for (let i = 0; i < res.length; ++i) {
      str += '<li class="list-item">'
      for (let j = 0; j < 3; ++j) {
        let o = res.shift()
        str += `<a href="${o.link}"><img class="lazy-load" data-src="${o.img}" alt=""></a>`
      }
      str += '</li>'
    }
    if (res.length) {
      str += '<li class="list-item">'
      let o
      while(o = res.shift()) {
        str += `<a href="${o.link}"><img class="lazy-load" data-src="${o.img}" alt=""></a>`
      }
      str += '</li>'
    }
    log(str)
    let banner2 = $('.banner2')
    banner2.find('.list').html(str)

    let items = banner2.find('.list-item')
    let w = $(items[0]).parent().width()
    items.each((i, el) => {
      $(el).css('left', i * w)
    })
    let i = 0, paused = false,
      startTime = 0, nowTime
    let timer = setInterval(show, 3000)
    function show() {
      let next = (i + 1 + items.length) % items.length
      $(items[next]).css('left', w).animate({ left: 0 }, 500)
      $(items[i]).animate({ left: -w }, 500)
      i = (++i + items.length) % items.length
    }
    let prevBtn = banner2.find('.prev'),
      nextBtn = banner2.find('.next')
    prevBtn.click(() => {
      // 节流
      nowTime = new Date().getTime()
      let t = nowTime - startTime
      startTime = nowTime
      if (t < 500) return
      // 显示
      let prev = (i - 1 + items.length) % items.length
      $(items[prev]).css('left', -w).animate({ left: 0 }, 500)
      $(items[i]).animate({ left: w }, 500)
      i = (--i + items.length) % items.length
      // 重启定时器
      clearInterval(timer)
      timer = setInterval(show, 3000)
    })
    nextBtn.click(() => {
      // 节流
      nowTime = new Date().getTime()
      let t = nowTime - startTime
      startTime = nowTime
      if (t < 500) return
      // 显示
      show()
      // 重启定时器
      clearInterval(timer)
      timer = setInterval(show, 3000)
    })
  }
})