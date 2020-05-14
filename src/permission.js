import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookie-utils'

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/register', '/index']; // 不需要权限的页面
const statusList = ['/404', ];

router.beforeEach(async(to, from, next) => {
  NProgress.start();

  // set page title
  document.title = to.meta.title;

  if (statusList.indexOf(to.path) !== -1) {
    // 如果是状态类型的页面，直接放行
    next();
  } else {
    // 如果是其他页面：
    // 获取token，如果没有登录，为 undefined
    const hasToken = getToken();
    if (hasToken) {
      // 有token ===> 登录
      if (whiteList.indexOf(to.path) !== -1) {
        // 如果是不需要权限的页面，重定向到 home 页
        next({ path: '/home' });
        NProgress.done();
      } else {
        // 如果是需要权限的页面，先获取用户信息
        const hasGetUserInfo = store.getters.name;
        if (hasGetUserInfo) {
          // 如果获取到用户信息
          next();
        } else {
          try {
            // 获取用户信息
            await store.dispatch('user/getInfo');

            next();
          } catch (error) {
            // 移除token，重定向到登录页
            await store.dispatch('user/resetToken');
            Message.error(error || 'Has Error');
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      // 未登录
      if (whiteList.indexOf(to.path) !== -1) {
        // 如果是不需要权限的页面，放行
        next();
      } else {
        // 如果是需要权限的页面，重定向到登录页
        next(`/login?redirect=${to.path}`);
        NProgress.done()
      }
    }
  }
});

router.afterEach(() => {
  // 过渡效果结束
  NProgress.done()
});
