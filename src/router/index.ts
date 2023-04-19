import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: {
        requiresAuth: true
      }
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
  if (to.meta?.requiresAuth) {
    console.log('isrequiresAuth');
    if (!isLogined) next({ name: 'login' })
    else next()
  } else {
    if (!isLogined) next()
    else next({ name: 'home' })
  }
})

export default router
