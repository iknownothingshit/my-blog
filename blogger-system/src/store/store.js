import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        avatars: '', //用户的头像
        userMsg: '', // 用户信息
        token: '' // 用于后台验证的token
    },
    mutations: {
        setAvatars(state, avatars) {
            state.avatars = avatars;
        },
        setUser(state, user) {
            state.userMsg = user;
        },
        setToken(state, token) {
            state.token = token;
        }
    }
})

export default store