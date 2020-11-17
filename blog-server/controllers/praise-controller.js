// 获取请求内容并调用对应的model方法，然后把处理完的数据响应回去
const Praise = require('../models/praise-model')
const tokens = require('../tools/token')

class PraiseController {
    // 点赞文章
    static async praiseUp(ctx) {
        let req = ctx.request.body;
        if (req) {
            const res = await Praise.praiseUp(req);
            ctx.response.status = 200;
            ctx.response.body = res;
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            };
        }
    }

    // 查看当前用户是否已点赞文章
    static async isPraise(ctx){
        let req = ctx.request.body;
        if (req) {
            const res = await Praise.isPraise(req);
            ctx.response.status = 200;
            ctx.response.body = res;
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            };
        }
    }
}

module.exports = PraiseController