// 获取请求内容并调用对应的model方法，然后把处理完的数据响应回去
const User = require('../models/user-model')
const tokens = require('../tools/token')

class UserController {
    // 用户登录
    static async login(ctx) {
        let req = ctx.request.body;
        if (req.account && req.password) {
            let result = await User.userLogin(req.account, req.password)
            if (result.code) {
                result.token = tokens.createToken(result)
            }
            ctx.response.status = 200;
            ctx.body = result
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            }
        }
    }

    // 用户注册
    static async register(ctx) {
        let req = ctx.request.body;
        if (req.account && req.password) {
            let result = await User.userRegister(req.account, req.password)
            if (result.code) {
                result.token = tokens.createToken(result)
            }
            ctx.response.status = 200;
            ctx.body = result
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            }
        }
    }
}

module.exports = UserController