import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import jquery from 'jquery'
import echarts from 'echarts'
import 'echarts-gl';

Vue.prototype.$echarts = echarts
Vue.prototype.$ = jquery

//权限拦截---路由
import "./permission";
Vue.config.productionTip = false;


Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
