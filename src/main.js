import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
import './bus';
import store from './store';
import currencyFilter from './filters/currency';
import timeFilter from './filters/getTime';
import App from './App.vue';
import router from './router';


Vue.config.productionTip = false;
// cookies使用
axios.defaults.withCredentials = true;
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
library.add(fab, far, fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
// currency
Vue.filter('currency', currencyFilter);
Vue.filter('getTime', timeFilter);
// vee-validate中文
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW',
});
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW,
  },
});

Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
