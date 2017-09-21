define(['jquery'], () => {
  $('.back-to-top a').click(function(this: HTMLElement) {
    $('html').animate({
      scrollTop: 0
    }, 500)
  })
})