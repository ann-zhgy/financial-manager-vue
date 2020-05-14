import axios from 'axios'
import {MessageBox, Message, Loading} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/cookie-utils'

let loading = null;
let loadingNum = 0;

const startLoading = () => {
  if (loadingNum === 0) {
    loading = Loading.service({
      lock: true,
      text: '拼命加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.55)',
    })
  }
  loadingNum++;
};

const endLoading = () => {
  loadingNum--;
  loadingNum = Math.max(loadingNum, 0);
  if (loadingNum === 0 && loading !== null) {
    loading.close();
    loading = null;
  }
};

const service = axios.create({
  baseURL: "http://localhost:9000/api/",
  timeout: 5000
});

// 不需要 loading 动画的页面
let noLoading = ['/user/login', '/user/info', '/user/logout', '/register', '/check/username', '/check/email'];

// 请求拦截
service.interceptors.request.use(
  config => {
    let url = config.url;
    if (noLoading.indexOf(url) === -1) {
      startLoading();
    }
    if (store.getters.token) {
      config.headers['authorization'] = 'Bearer ' + getToken();
    }
    if (url.indexOf('upload') !== -1) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config
  },
  error => {
    // 请求错误
    return Promise.reject(error)
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    let url = response.config.url;
    if (noLoading.indexOf(url) === -1) {
      endLoading();
    }
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 1000
      });

      // 50008: 无效token
      // 50012: 其他客户端登陆
      // 50014: Token 过期
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已经注销了，你可以离开这个页面或重新登陆', '确认注销', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res;
    }
  },
  error => {
    let url = error.config.url;
    if (noLoading.indexOf(url) === -1) {
      endLoading();
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)';
          break;
        case 401:
          MessageBox.confirm('您的登录信息失效，请重新登录(401)', '登录信息过期', {
            confirmButtonText: '重新登陆',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          });
          break;
        case 403:
          error.message = '您没有权限进行此操作(403)';
          break;
        case 404:
          error.message = '请求出错(404)';
          break;
        case 408:
          error.message = '请求超时(408)';
          break;
        case 500:
          error.message = '服务器错误(500)';
          break;
        case 501:
          error.message = '服务未实现(501)';
          break;
        case 502:
          error.message = '网络错误(502)';
          break;
        case 503:
          error.message = '服务不可用(503)';
          break;
        case 504:
          error.message = '网络超时(504)';
          break;
        case 505:
          error.message = 'HTTP版本不受支持(505)';
          break;
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = '连接服务器失败!'
    }
    Message({
      message: error.message + ' QAQ',
      type: 'error',
      duration: 1000
    });
    return Promise.reject(error);
  }
);

export default service
