require.config({
  baseUrl: '/public/js',
  paths: {
    jquery: 'jquery-1.12.4.min',
    Rx: 'Rx.min'
  }
})

let log = function(...rest: any[]) {
  console.log(...rest)
} 
log('hello')