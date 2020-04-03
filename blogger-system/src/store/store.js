import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userMsg: '', // 用户信息
        token: '' // 用于后台验证的token
    },
    mutations: {
        setUser(state, user) {
            state.userMsg = user;
        },
        setToken(state, token) {
            state.token = token;
        }
    }
})

export default  store