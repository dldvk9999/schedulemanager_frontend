/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import vueMoment from 'vue-moment'
import VueCookies from "vue-cookies";
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';
import ToggleButton from 'vue-js-toggle-button';
import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
 
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$alert = false;

Vue.use(NowUiKit);
Vue.use(Vuetify);
Vue.use(vueMoment);
Vue.use(VueCookies);
Vue.use(VueTimepicker);
Vue.use(ToggleButton);
Vue.use(BootstrapVue)

new Vue({
  router,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'md',
    },
  }),
  render: h => h(App)
}).$mount('#app');
