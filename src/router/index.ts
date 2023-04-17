import { createRouter, createWebHistory } from 'vue-router'
import { RouterName } from './constant'
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: { auth: true },
    children: [{ path: '/', name: 'home', component: () => import('@/views/home-page.vue') }]
  },
  {
    path: '/component-test',
    name: RouterName.ComponentTest,
    meta: { auth: true },
    component: () => import('@/views/ComponentTest.vue')
  },
  {
    path: '/login',
    name: RouterName.Login,
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: RouterName.Register,
    component: () => import('@/views/RegisterPage.vue')
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  const isLogged = localStorage.getItem('access_token');
  if (to.meta.auth) {
    if (isLogged) {
      next();
    } else {
      next('/login');
    }
  }

  else {
    if (isLogged) {
      next('/');
    } else {
      next();
    }
  }

});

export default router
