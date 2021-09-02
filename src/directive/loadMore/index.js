import loadMore from './loadMore'

const install = function(Vue) {
  Vue.directive('loadMore', loadMore)
}

if (window.Vue) {
  window['loadMore'] = loadMore
  Vue.use(install); // eslint-disable-line
}

export default install
