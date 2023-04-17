import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-page.vue'
import RegisterView from '@/views/register-page.vue'
import LoginView from '@/views/login-page.vue'
import CommonStore from '@/store/Common'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const { myAccount, getMyAccount } = CommonStore()

  if (isLoggedIn) {
    if (!Object.keys(myAccount).length) getMyAccount()
  }

  if (to.meta.auth) {
    if (isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (isLoggedIn) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
