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
// 配置环境
type env = 'dev' | 'prod'

let now: env = 'dev',
    root = ''
function switchEnv(e: env) {
  switch(e) {
    case 'dev': {
      root = 'http://localhost:5555/'
      break
    }
    case 'prod': {
      root = '/'
      break
    }
  }
}
switchEnv(now)
log(root)
const rootUrl = '/public/'