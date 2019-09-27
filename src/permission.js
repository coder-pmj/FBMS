/*
权限校验
beforeEach(to,from,next)
*/

import router from "./router";
import store from '@/store'
router.beforeEach((to, from, next) => {
  //1.获取token
  const token = store.state.user.token;
  //console.log(token)
  if (!token) {
    //如果没有获取到token
    //要访问非登录页面
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {//请求登录页面 
      next();
    }
  } else {
    //获取到token
    if (to.path === "/login") {
      next();
    } else {
      const userInfo = store.state.user.userInfo;//获取库中的用户信息
      if (userInfo) {
        //如果获取到用户信息，则跳转到目标路由
        next();
      } else {
        store.dispatch('store_getUser').then(res => {

          if (res.flag) {
            //如果获取到用户信息,保存到本地

            next();
          } else {
            //未获取到用户信息，则需重新登录
            next({
              path: "/login"
            });
          }
        });
      }
    }
  }
});
