// 过滤器：用于过滤没有token的请求
const tokens = require('./token')

module.exports = async (ctx, next) => {
    let url = ctx.request.url;
    if (url != '/user/login' && url != '/user/register') {
        let token = ctx.request.header.authorization;
        if (token) {
            let res = tokens.checkToken(token)
            if (res && res.exp <= new Date() / 1000) {
                ctx.body = {
                    message: 'token过期,请重新登录',
                    code: 0
                }
            } else if (res) {
                await next()
            } else {
                ctx.body = {
                    message: 'token无效',
                    code: 0
                }
            }
        } else {
            ctx.body = {
                message: '请把token设置在request.header.authorization中',
                code: 0
            }
        }

    } else {
        await next()
    }
}
