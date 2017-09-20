try {
  require.config({
    baseUrl: '/public/js',
    paths: {
      jquery: 'jquery-1.12.4.min',
      Rx: 'Rx.min',
    }
  })
} catch (e) {
}
let log = function (...rest: any[]) {
  console.log(...rest)
}