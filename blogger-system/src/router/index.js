import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

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
  // 判断是否前往博客编辑页
  if (to.path === '/home/blogging') {
    store.commit('setIsBlogging', true);
  } else {
    store.commit('setIsBlogging', false);
  }

  // 判断前往的是否是无需显示侧边栏的页面
  if (to.path === '/home/blogging' || to.path === '/home/blog-detail') {
    console.log('a')
    store.commit('setHidSidebar', true);
  } else {
    store.commit('setHidSidebar', false);
  }


  next()
  // if (to.meta.auth) {
  //   if (sessionStorage.getItem('token')) {
  //     console.log(sessionStorage.getItem('token'))
  //     next();
  //   } else {
  //     next({ path: '/' });
  //   }
  // } else {
  //   next()
  // }
})

export default router
