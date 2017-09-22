define(['jquery'], () => {
  // 取得所有的tab元素
  let tabs = $('.tab')
  // 对每一个tab做处理
  tabs.each((tabIndex, tabEl) => {
    // 取得链接和内容
    let navs = $(tabEl).find('.tab-nav').find('li a'),
        panels = $(tabEl).find('.tab-content').find('.tab-panel')
    // 显示第一个
    show(0)
    // 对每个链接绑定事件
    navs.each((navIndex, navEl) => {
      $(navEl).on('click', () => {
        show(navIndex)
      })
    })
    // 显示第i个的函数
    function show(i: number) {
      navs.each((i, el) => {
        $(el).removeClass('active')
      })
      $(navs[i]).addClass('active')
      $(panels[i]).fadeIn(200)
      panels.each((panelIndex, panelEl) => {
        if (panelIndex !== i) {
          $(panelEl).hide()
        }
      })
    }
  })
})