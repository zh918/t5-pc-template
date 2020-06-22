// 权限校验
import router from '../router/index';
import api from '@/services/commonLogic'

export const authRouter = (globalVue) => {
  router.beforeEach((to, from, next) => { 
    api.getMenu(to.path).then(result => {
      if (result) {
        next();
      } else {
        // 抛出提示告知无权限
        next({path: "/f403"});
      }
    });
  });
};
