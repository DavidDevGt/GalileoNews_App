import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import storage from "@/services/storageService";
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import CreateNew from '../views/CreateNew.vue';

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
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/create',
    name: 'CreateNews',
    component: CreateNew
  }
];

const validateLogin = async () => {
  const tokenLogin = await storage.get('token')
  if (tokenLogin != null) {
    return true
  }
  return false
}

const validateIsAdmin = async () => {
  const isAdminFlag = await storage.get('isAdmin')
  if (isAdminFlag != null && isAdminFlag === 'S') {
    return true
  }
  return false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const publicRoutes = ['Login', 'Register']
const adminRoutes = ['CreateNews']

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await validateLogin()
  const isAdmin = await validateIsAdmin()
  if (!publicRoutes.includes(String(to.name)) && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (adminRoutes.includes(String(to.name)) && !isAdmin) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router;
