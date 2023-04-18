import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLogined = localStorage.getItem('token')
  console.log(to.meta);
  if (to.name !== 'login' && !isLogined) next({ name: 'login' })
  else next()
})

export default router
