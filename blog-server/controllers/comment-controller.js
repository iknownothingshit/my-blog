// 获取请求内容并调用对应的model方法，然后把处理完的数据响应回去
const Comment = require('../models/comment-model')
const Artical = require('../models/artical-model')
const tokens = require('../tools/token')

class CommentController {
    //发表评论
    static async comment(ctx) {
        let req = ctx.request.body;
        if (req) {
            let create_res = await Comment.comment(req);
            let increase_res = await Artical.commentIncrease(req);
            let obj = {};
            if (increase_res && create_res) {
                obj.message = '评论成功'
                obj.code = 1
            } else {
                obj.message = '评论失败'
                obj.code = 0
            }
            ctx.response.status = 200;
            ctx.body = obj;
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            };
        }
    }

    // 获取文章的评论
    static async fetchComments(ctx) {
        let req = ctx.request.body;
        if (req) {
            let res = await Comment.fetchComments(req);
            ctx.response.status = 200;
            ctx.body = res;
        } else {
            ctx.response.status = 416;
            ctx.body = {
                message: '参数不全'
            };
        }
    }
}

module.exports = CommentController