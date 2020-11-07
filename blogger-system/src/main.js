// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store/store'

import registerAllComponents from './components/registerAll' // 全局注册组件
import api from './api' // 获取接口

import mavonEditor from 'mavon-editor' // markdown富文本编辑器
import 'mavon-editor/dist/css/index.css'

import vueCropper from 'vue-cropper' // 截图插件

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

registerAllComponents(Vue)
Vue.use(mavonEditor)
Vue.use(vueCropper)
Vue.use(api)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
