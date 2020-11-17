import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        avatars: '', // 用户的头像
        userMsg: '', // 用户信息
        isBlogging: false, // 是否处于博客编辑界面
        hidSidebar: false,// 是否隐藏侧边栏
        token: '' // 用于后台验证的token
    },
    mutations: {
        // 侧边栏
        setHidSidebar(state, hidSidebar) {
            state.hidSidebar = hidSidebar;
        },
        // 更新头像
        setAvatars(state, avatars) {
            state.avatars = avatars;
        },
        // 记录用户信息
        setUser(state, user) {
            state.userMsg = user;
        },
        // 修改编辑态
        setIsBlogging(state, isBlogging) {
            state.isBlogging = isBlogging;
        },
        setToken(state, token) {
            state.token = token;
        }
    }
})

export default store