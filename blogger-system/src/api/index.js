import axios from 'axios'

const http = axios.create({
    timeout: 50000,
});
//带上cookie
http.defaults.withCredentials = true

// 接口列表
const api = {
    // 登录  data:{account,password}
    login(data) {
        return http.post(`api/user/login`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 注册  data同上
    register(data) {
        return http.post(`api/user/register`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}

//混入全局实例中
export default {
    install(Vue) {
        Vue.mixin({
            created() {
                this.$_api = api;
            }
        })
    }
}