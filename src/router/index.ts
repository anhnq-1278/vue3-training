import { createRouter, createWebHistory } from 'vue-router'
import {RouterName} from './constant'
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [{ path: '/', name: 'home', component: () => import('@/views/home-page.vue') }]
  },
  {
    path: '/component-test',
    name: RouterName.ComponentTest,
    component: () => import('@/views/ComponentTest.vue')
  },
  {
    path: '/login',
    name: RouterName.Login,
    component: () => import('@/views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
