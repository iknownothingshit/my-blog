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
    },
    // 获取文章
    fetchArticals(data) {
        return http.post(`api/artical/fetchArticals`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 发表文章
    uploadBlog(data) {
        return http.post(`api/artical/uploadBlog`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 获取用户信息
    getUser(data) {
        return http.post(`api/user/getUser`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 获取用户的文章
    fetchUserArticals(data) {
        return http.post(`api/artical/fetchUserArticals`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 点赞文章
    praiseUp(data) {
        return http.post(`api/artical/praise`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 发表评论
    comment(data) {
        return http.post(`api/comment/comment`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    // 获取评论
    fetchComments(data) {
        return http.post(`api/comment/fetchComments`, data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
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