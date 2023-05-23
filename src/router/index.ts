import { createRouter, createWebHistory } from 'vue-router'
import { RouterName } from './constant'
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: { auth: true, breadcrumb: 'Home', routerName: RouterName.Home },
    beforeEnter: async (to: any, _from: any, next: any) => {
      if (to.path === '/') {
        next('/todo')
      }
      next()
    },
    children: [
      {
        path: 'todo',
        name: RouterName.Home,
        component: () => import('@/views/home-page.vue'),
        meta: { breadcrumb: 'Todo', routerName: RouterName.Todo }
      },
      {
        path: 'profile',
        name: RouterName.Profile,
        component: () => import('@/views/ProfilePage.vue'),
        meta: { breadcrumb: 'Profile', routerName: RouterName.Profile }
      },
      {
        path: 'change-password',
        name: RouterName.ChangePassword,
        component: () => import('@/views/ChangePasswordPage.vue'),
        meta: { breadcrumb: 'Change Password', routerName: RouterName.ChangePassword }
      },
      {
        path: 'user-list',
        name: RouterName.UserList,
        component: () => import('@/views/UserList.vue'),
        meta: { breadcrumb: 'User List', routerName: RouterName.UserList }
      },
      {
        path: '/user-detail/:id',
        name: RouterName.UserDetail,
        component: () => import('@/views/UserDetail.vue'),
        meta: { breadcrumb: 'User Detail', routerName: RouterName.UserDetail }
      }
    ]
  },
  {
    path: '/register-form',
    name: RouterName.RegisterForm,
    component: () => import('@/views/RegisterForm.vue'),
    meta: { auth: true }
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
  const isLogged = localStorage.getItem('access_token')
  if (to.meta.auth) {
    if (isLogged) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (isLogged) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
