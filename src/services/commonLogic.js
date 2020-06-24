import urls from './url';

class CommonLogic {
  constructor() {}

  login(parms) {
    return $http.post(urls.userLogin, parms).then(result => {
      if (result.code === 1) {
        $Data.set('token', result.data.token);
        // $Data.set("name", result.data.LOGIN_NAME);
        // $Data.set("role", result.data.ROLE_ID);
        console.log(result);
      }
      return result;
    });
  }

  logout() {
    return $http.post(urls.logout, {redirect: decodeURIComponent(location.origin)}).then(result => {
      
      location.href = result.data;
    });
  }

  // 加载权限数据
  getAuthData() {
    return new Promise(function(resolve, reject){
      $http.post(urls.getUserMenuTree).then(result => {
        window.authPromise = result;
        resolve(true)
      });

    });
  }

  // 通过path来判定是否具有权限访问
  async getMenu(path) {
    window.authPromise = window.authPromise || await $http.post(urls.getUserMenuTree);
    if (path === '/f403') {
      return true;
    } else if (path) {
      return window.authPromise.auths.some(a => a.path === path);
    } else {
      return window.authPromise;
    }
  }
}

export default new CommonLogic();
