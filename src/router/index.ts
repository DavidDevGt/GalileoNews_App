import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import CreateNew from '../views/CreateNew.vue';
import AuthSuccess from '../views/AuthSuccess.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/create',
    name: 'CreateNews',
    component: CreateNew
  },
  {
    path: '/auth/success', 
    name: 'AuthSuccess', 
    component: AuthSuccess 
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
