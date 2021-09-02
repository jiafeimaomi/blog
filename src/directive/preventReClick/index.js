import preventReClick from './preventReClick'

const install = function(Vue) {
  Vue.directive('preventReClick', preventReClick)
}

if (window.Vue) {
  window['preventReClick'] = preventReClick
  Vue.use(install); // eslint-disable-line
}

export default install
