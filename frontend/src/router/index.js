import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta'
import HomeView from '../views/HomeView.vue';
import TaskList from '../views/TaskList.vue';
import Form from '../views/Form.vue';

Vue.use(VueRouter);
Vue.use(Meta)


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tasklist',
    name: 'tasklist',
    component: TaskList,
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
