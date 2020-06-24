// 自定义样式及reset
import "./style/reset.less";
import "lt-element/lib/theme-chalk/index.css";
import "./style/common.less";

import Vue from "vue";
import Element from "lt-element";
import App from "./App.vue";
import "./common/storage";
import "./common/util";
import router from "./router/index";
import store from "./store/index";
import "./config/env";
import "./common/http";
import permission from './common/permission'
import { authRouter } from "./common/auth";
import "./common/tabHelper";

Vue.use(Element);
Vue.use(permission); 


import api from '@/services/commonLogic'
api.getAuthData().then(reuslt => {
  console.log('-----获取权限数据', window.authPromise)
  const globalVue = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
  
  window.globalVue = globalVue;
  authRouter(globalVue);
});




