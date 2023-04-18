import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home-page.vue'),
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login-page.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register-page.vue')
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const isLoggedIn = !!localStorage.getItem('access_token')

  // check page is auth
  if (to.meta.auth) {
    if (isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  }

  // check page is not auth
  else {
    if (isLoggedIn) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
