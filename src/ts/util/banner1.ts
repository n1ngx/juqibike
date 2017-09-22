define(['jquery'], () => {
  function ats(arr: any[], cb: (v: any, i?: number, arr?: any[]) => any) {
    return arr.map(cb).join('').trim()
  }
  $.ajax({
    url: root + 'banner?type=1',
    async: false,
    success: (res) => {
      init(res)
    }
  })
  function init(res: any) {
    let str = `
      <ul>
        ${ats(res, v => `
          <li><a href="${v.link}"><img class="lazy-load" data-src="${v.img}" alt=""></a></li>
        `)}
      </ul>
      <div class="btn">
        ${ats(res, (v, i) => `
          <a data-num="${i}" href="javascript:"></a>
        `)}
      </div>      
    `
    $('.banner1').html(str)
    let banner1 = $('.banner1').find('li')
    let btn = $('.banner1').find('.btn').children()
  
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
      .on('mouseenter', function (this: HTMLElement) {
        let num = parseInt(this.dataset.num as string)
        i = num
        show()
        paused = true
      })
      .on('mouseleave', () => {
        paused = false
      })
  }
})