// 权限校验
import router from '../router/index'

export const authRouter = (globalVue)=> {
	router.beforeEach((to,from,next)=>{ 
		if (!$Data.get('accessToken') && to.name != 'login'){
			$Data.set("beforeUrl",to.path);
		 	next({name:'login'}); 
		}
		else{
			next();
		}
	});
}
