import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ '
  },

  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  // 搜索页
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  // 详情页
  {
    path: '/detail',
    component: () => import('@/views/Detail')
  },
  // 编辑个人资料页面
  {
    path: '/edituser',
    component: () => import('@/views/My/components/edituser.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
