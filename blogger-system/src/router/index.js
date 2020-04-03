import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import("@/pages/home")
const Login = () => import("@/pages/login")
const BlogView = () => import("@/pages/blog-view")
const HomePage = () => import("@/pages/home-page")
const Blogging = () => import("@/pages/blogging")
const SearchResult = () => import("@/pages/search-result")
const BlogDetail = () => import("@/pages/blog-detail")
const Test = () => import("@/pages/test")

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
      path: '/test',
      name: 'test',
      component: Test
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
          component: BlogView
        },
        {
          path: '/home/home-page', // 个人中心
          name: 'home-page',
          component: HomePage
        },
        {
          path: '/home/blogging',  // 写博客页面
          name: 'blogging',
          component: Blogging
        },
        {
          path: '/home/search-result', // 搜索结果页面
          name: 'search-result',
          component: SearchResult
        },
        {
          path: '/home/blog-detail', // 博客详情页面
          name: 'blog-detail',
          component: BlogDetail
        }
      ]
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log(from)
  next()
})

export default router
