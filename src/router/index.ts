import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import ToegewezenPage from '../views/toegewezen.vue'
import UitgevoerdePage from '../views/uitgevoerde.vue'
import KennisbasePage from '../views/kennisbase.vue'
import InstellingenPage from '../views/instellingen.vue'
import LoginPage from '../views/Login.vue'
import { useAuth } from '@/composables/useAuth'

const appRoutes: Array<RouteRecordRaw> = [{
    path: '/',
    redirect: '/login'
  }, 
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/toegewezen',
    name: 'Toegewezen', 
    component: ToegewezenPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/uitgevoerde',
    name: 'Uitgevoerde',
    component: UitgevoerdePage,
    meta: { requiresAuth: true }
  },  {
    path: '/kennisbase',
    name: 'Kennisbase',
    component: KennisbasePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/instellingen',
    name: 'Instellingen',
    component: InstellingenPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes: appRoutes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
    if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login' });
  } 
  else if (to.name === 'Login' && isAuthenticated.value) {
    next({ name: 'Home' });  } 
  else {
    next();
  }
});

export default router
