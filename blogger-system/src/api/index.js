import axios from 'axios'

const http = axios.create({
    timeout: 100000,
});
//带上cookie
http.defaults.withCredentials = true

// 接口列表
const api = {
    // 设置token
    setToken(token) {
        http.defaults.headers.authorization = token || ''
    },
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
    },
    // 更新用户信息 type = 1为更新头像 2为更新昵称
    updateMsg(data) {
        return http.post(`api/user/uploadMsg`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 上传图片
    uploadImg(data) {
        return http.post(`api/image/uploadImg`, data).then(res => {
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