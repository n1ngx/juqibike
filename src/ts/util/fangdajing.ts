define(['jquery', 'Rx'], ($: any, Rx: any) => {
  let e = $('.detail .detail-box .left .pic')

  let small = e.find('.small') as JQuery,
    big = e.find('.big') as JQuery,
    bigImg = e.find('.big-img') as JQuery,
    smallImg = e.find('.small-img') as JQuery,
    box = e.find('.box') as JQuery 

  let ob = Rx.Observable

  let move = ob.fromEvent(small, 'mousemove')
  let enter = ob.fromEvent(small, 'mouseenter')
  let leave = ob.fromEvent(small, 'mouseleave')

  enter.do(() => {
    box.show()
    big.show()
  }).subscribe()
  leave.do(() => {
    box.hide()
    big.hide()
  }).subscribe()

  interface P { x: number, y: number }

  const validValue = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max))

  move
    .do((e: MouseEvent) => {
      // log(e.offsetX, e.offsetY)
    })
    // .map((e: MouseEvent) => ({
    //   x: e.clientX,
    //   y: e.clientY
    // }))
    .map((e: MouseEvent) => ({
      x: e.clientX,
      y: e.clientY
    }))
    .do(() => {
      let bX = box.position().left / (smallImg.width() - box.width()),
        bY = box.position().top / (smallImg.height() - box.height()),
        w = bigImg.width() - big.width(),
        h = bigImg.height() - big.height()
      bigImg.css('left', -bX * w) 
      bigImg.css('top', -bY * h)
    })
    .subscribe((p: P) => {
      box.css('cursor', 'pointer')
      let boxW = box.width(),
        boxH = box.height(),
        smallW = small.width(),
        smallH = small.height(),
        offsetY = small.offset().top - $(window).scrollTop(),
        x = validValue(p.x - boxW / 2 - small.offset().left, 0, smallW - boxW),
        y = validValue(p.y - boxH / 2 - offsetY, 0, smallH - boxH)
      box.css('left', x)
      box.css('top', y)
    })
})