import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/layout/base-layout.vue'
import HomeView from '@/views/home-page.vue'
import RegisterView from '@/views/register-page.vue'
import LoginView from '@/views/login-page.vue'
import SettingLayout from '@/layout/setting-layout.vue'
import ProfileView from '@/views/profile-page.vue'
import PasswordView from '@/views/password-page.vue'
import UserPage from '@/views/user-page.vue'

import CommonStore from '@/store/Common'
import { RouteName } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.LAYOUT,
      component: LayoutView,
      meta: { auth: true },
      children: [
        {
          path: '',
          name: RouteName.HOME,
          component: HomeView
        },
        {
          path: '/users',
          name: RouteName.USERS,
          component: UserPage
        },
        {
          path: '/setting',
          name: RouteName.SETTING,
          redirect: { name: RouteName.PROFILE },
          component: SettingLayout,
          children: [
            {
              path: 'profile',
              name: RouteName.PROFILE,
              component: ProfileView
            },
            {
              path: 'password',
              name: RouteName.PASSWORD,
              component: PasswordView
            }
          ]
        }
      ]
    },
    {
      path: '/register',
      name: RouteName.REGISTER,
      component: RegisterView
    },
    {
      path: '/login',
      name: RouteName.LOGIN,
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
