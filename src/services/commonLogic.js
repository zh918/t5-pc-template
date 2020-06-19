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
      debugger
      location.href = result.data;
    });
  }

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
