import Vue from 'vue';
import axios from 'axios';

import { remote } from 'electron'; // eslint-disable-line
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
axios.defaults.baseURL = 'http://localhost:' + remote.getGlobal('sharedObject').port; // eslint-disable-line
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>',
}).$mount('#app');
