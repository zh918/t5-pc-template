import path from "@/config/env";

export default {
  // 登陆 登出 菜单
  getAccessToken: `${path.authApi}/api/oauth/token/getAccessToken`,
  // getUserMenuTree: `${path.authApi}/api/user/systemuser/getUserMenuTree`,
  getUserMenuTree: `${path.authApi}/api/oauth/token/getUserMenuTree`,
  

  // ---------demo-------------
  loanPageQueryLoan: `${path.authApi}/api/coperation/loan/pageQueryLoan`,
  
  // 贷前管理
  factorapplyPageQuery: `${path.busApi}/api/apply/factorapply/pageQuery`,
  factorapplyapprovalPageQuery: `${path.busApi}/api/apply/factorapplyapproval/pageQuery`,

  // ----------------以上代码都可以删除----------------------------

  // 登录
  userLogin: `${path.busApi}/api/auth/user/login`,

  // 系统管理
  systemQuery: `${path.busApi}/api/auth/system/query`,
  systemFind: `${path.busApi}/api/auth/system/find`,
  systemCreate: `${path.busApi}/api/auth/system/create`,


  
  
};
