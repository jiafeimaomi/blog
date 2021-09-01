import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/style/index.scss"; // global css

Vue.use(ElementUI, {size: 'mini'})


Vue.config.productionTip = false
Vue.prototype.router = router

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
