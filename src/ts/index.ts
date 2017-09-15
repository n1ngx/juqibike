require(['js/config'], () => {
  require(['jquery', 'Rx'], () => {
    // banner1 
    (() => {
      let banner1 = $('.banner1').find('li')
      let btn = $('.banner1').find('.btn').children()
      
      log(banner1)
      let i = 0, paused = false
      $(banner1[i]).fadeIn(500)
      $(btn[i]).css('background', '#f90')
      ++i
      setInterval(show, 3000)
      function show() {
        if (paused) return 
        banner1.each((i, el) => {
          $(el).fadeOut(500)
          $(btn[i]).css('background', '#666')
        })
        $(banner1[i]).fadeIn(500)
        $(btn[i]).css('background', '#f90')
        if (++i > banner1.length - 1) {
          i = 0
        }
      }
      btn
      .on('mouseenter', function(this: HTMLElement) {
        let num = parseInt(this.dataset.num as string)
          i = num
          show()
        paused = true
      })
      .on('mouseleave', () => {
        log('out')
        paused = false
      })
    })()
    // banner2 
    ;(() => {
      let banner2 = $('.banner2')
      let items = banner2.find('.list-item')
      let w = $(items[0]).parent().width()
      log(w)
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
          log(prevBtn, nextBtn)
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
    })()
  })
})