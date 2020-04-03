import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import("@/pages/home")
const Login = () => import("@/pages/login")
const BlogView = () => import("@/pages/blog-view")
const HomePage = () => import("@/pages/home-page")
const Blogging = () => import("@/pages/blogging")
const SearchResult = () => import("@/pages/search-result")
const BlogDetail = () => import("@/pages/blog-detail")
const NotFound = () => import("@/pages/404")

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home',
          redirect: '/home/blog-view'
        },
        {
          path: '/home/blog-view',  //主页
          name: 'blog-view',
          component: BlogView,
          meta: { auth: true }
        },
        {
          path: '/home/home-page', // 个人中心
          name: 'home-page',
          component: HomePage,
          meta: { auth: true }
        },
        {
          path: '/home/blogging',  // 写博客页面
          name: 'blogging',
          component: Blogging,
          meta: { auth: true }
        },
        {
          path: '/home/search-result', // 搜索结果页面
          name: 'search-result',
          component: SearchResult,
          meta: { auth: true }
        },
        {
          path: '/home/blog-detail', // 博客详情页面
          name: 'blog-detail',
          component: BlogDetail,
          meta: { auth: true }
        }
      ]
    },
    {
      path: '*',
      name: '404-not-found',
      component: NotFound
    },
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // if (to.meta.auth) {
  //   next({ path: '/404' })
  // } else {
  //   next()
  // }
  next()
})

export default router
