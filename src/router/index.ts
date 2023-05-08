import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home-page.vue'),
      meta: { auth: true, layout: 'default' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login-page.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register-page.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/views/change-password.vue'),
      meta: { auth: true, layout: 'auth' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile-page.vue'),
      meta: { auth: true, layout: 'default' }
    },
    {
      path: '/list-users',
      name: 'list-users',
      component: () => import('@/views/list-users.vue'),
      meta: { auth: true, layout: 'default' }
    },
    {
      path: '/user/:id',
      name: 'user-detail',
      component: () => import('@/views/user-detail.vue'),
      meta: { auth: true, layout: 'default' }
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
