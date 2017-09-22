require(['js/config'], () => {
  require([
    'common',
    'util/banner1',
    'util/banner2',
    'jquery'
  ], cb)
  function cb() {
    $('.tab-panel a').attr('href', 'details.html')
    $(window).on('scroll', function (e) {
      let scrollTop = $(e.target).scrollTop()
      loadImg(scrollTop)
    })
    loadImg(500)
    function loadImg(scrollTop: number) {
      // log($('.banner1 a img'))
      let imgs = $('img.lazy-load')
      imgs.each((i, el) => {
        if ($(el).offset().top <= scrollTop + $(window).height()) {
          setTimeout(() => {
            $(el).attr('src', $(el).attr('data-src')).removeAttr('data-src').removeClass('lazy-load')
          }, 500)
        }
      })
    }
    //---
  }
})