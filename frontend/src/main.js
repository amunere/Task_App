import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMeta from 'vue-meta'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMeta)

Vue.config.productionTip = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
