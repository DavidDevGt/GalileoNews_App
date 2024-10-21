import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import RegisterPage from '../views/RegisterPage.vue';
import CreateNews from '@/views/CreateNews.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
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
    path: '/register', // Nueva ruta para la página de registro
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/createNews',
    name: 'CreateNews',
    component: CreateNews
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
