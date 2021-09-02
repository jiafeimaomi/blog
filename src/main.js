import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/style/index.scss"; // global css
import preventReClick from './directive/preventReClick' // 防多次点击，重复提交
import {
  handleData
} from "@/utils/common";

Vue.use(ElementUI, {size: 'mini'})


Vue.config.productionTip = false
Vue.prototype.router = router
Vue.prototype.handleData = handleData;

Vue.prototype.msgSuccess = function (msg, duration=3000) {
  this.$message({ showClose: true, message: msg, duration, type: "success" });
};

Vue.prototype.msgError = function (msg, duration=3000) {
  this.$message({ showClose: true, message: msg, duration, type: "error",  });
};

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
};
Vue.use(preventReClick)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
