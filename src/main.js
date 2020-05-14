import Vue from 'vue'

import 'normalize.css/normalize.css'
import './style/contain.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueCropper from 'vue-cropper'

import elTableInfiniteScroll from 'el-table-infinite-scroll';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'

import portalForm from '@/components/PortalFormComponent';

Vue.use(ElementUI);

Vue.use(VueCropper);

Vue.use(elTableInfiniteScroll);

Vue.use(portalForm);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
