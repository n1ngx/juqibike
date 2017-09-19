define(['jquery'], () => {
  log($('.back-to-top a'))
  $('.back-to-top a').click(function(this: HTMLElement) {
    $('html').animate({
      scrollTop: 0
    }, 500)
  })
})