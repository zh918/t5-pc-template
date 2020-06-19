import Vue from 'vue';
import Router from 'vue-router';

import f403 from './map/layout/403';
import login from './map/login/index';
import home from './map/home/index'; 
import system from './map/auth/system';
import resource from './map/auth/resource';
import role from './map/auth/role';

import demo from './map/demo/index';

Vue.use(Router);

let routerArray = [
  // { path: '/', redirect: '/login' },
  f403,
  login,
  home,
  system,
  resource,
  role,
  demo
];

export default new Router({
  mode: 'hash',
  routes: routerArray,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
