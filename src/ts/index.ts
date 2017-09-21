require(['js/config'], () => {
  require([
    'common',
    'util/banner1', 
    'util/banner2',
  ])
  require(['jquery'], () => {
    $(window).on('scroll', function(e) {
      let scrollTop = $(e.target).scrollTop()
      loadImg(scrollTop)
    })
    loadImg(0)
    function loadImg(scrollTop: number) {
      let imgs = $('img.lazy-load')
      imgs.each((i, el) => {
        if ($(el).offset().top - $(window).height() < scrollTop) {
          setTimeout(() => {
            $(el).attr('src', $(el).attr('data-src')).removeAttr('data-src').removeClass('lazy-load')
          }, 500)
        }
      })
    }
  })
})