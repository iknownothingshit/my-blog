// 获取请求内容并调用对应的model方法，然后把处理完的数据响应回去
const Artical = require('../models/artical-model')
const tokens = require('../tools/token')

class ArticalController {
    //文章上传
    static async blogUpload(ctx) {
        let req = ctx.request.body;
        if (req) {
            const res = await Artical.blogUpload(req);
            ctx.response.status = 200;
            ctx.body = res;
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            };
        }
    }

    // 获取文章
    static async fetchArticals(ctx) {
        let req = ctx.request.body;
        if (req) {
            let res = await Artical.fetchArticals(req.page);
            ctx.response.status = 200;
            ctx.body = res;
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            };
        }
    }

    // 获取用户文章
    static async fetchUserArticals(ctx) {
        let req = ctx.request.body;
        if (req.authorId) {
            let res = await Artical.fetchUserArticals(req);
            ctx.response.status = 200;
            ctx.body = res;
        } else {
            ctx.response.status = 416
            ctx.body = {
                message: '参数不全'
            }
        }
    }

    // 点赞文章
    static async praise(ctx) {
        let req = ctx.request.body;
        if (req) {
            let res = await Artical.praise(req);
            ctx.response.status = 200;
            ctx.body = res;
        } else {
            ctx.response.status = 416
            ctx.body = {
                message: '参数不全'
            }
        }

    }
}

module.exports = ArticalController