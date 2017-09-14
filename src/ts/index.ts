require.config({
  baseUrl: '/public/js',
  paths: {
    jquery: 'jquery-1.12.4.min',
    Rx: 'Rx.min'
  }
})

require(['jquery', 'Rx'], ($: JQuery, Rx: any) => {
  console.log($, Rx)
  Rx
})