import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import toegewezen from '@/views/toegewezen.vue'
import uitgevoerde from '@/views/uitgevoerde.vue'
import kennisbase from '@/views/kennisbase.vue'
import instellingen from '@/views/instellingen.vue'

const routes = [
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
    component: HomePage
  },
  {
    path: '/toegewezen',
    name: 'Toegewezen',
    component: toegewezen
  },
  {
    path: '/uitgevoerde',
    name: 'Uitgevoerde',
    component: uitgevoerde
  },
  {
    path: '/kennisbase',
    name: 'Kennisbase',
    component: kennisbase
  },
  {
    path: '/instellingen',
    name: 'Instellingen',
    component: instellingen
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes
})

export default router
