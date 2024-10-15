import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import InicioPage from '../views/InicioPage.vue';
import RegisterPage from '../views/RegisterPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: InicioPage
  },
  {
    path: '/register', // Nueva ruta para la página de registro
    name: 'Register',
    component: RegisterPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
