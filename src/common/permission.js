export default function(Vue, options) {
  // 操作权限
  Vue.prototype.permission = function(code) {
    if (code) {
      return window.authPromise.auths.some(a => a.code === code);
    } else {
      return false;
    }
  }
}
