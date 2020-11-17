// 文章表模型
const dataBase = require('../config/db')

let sequelize = dataBase.sequelize,
    Sequelize = dataBase.Sequelize

const PraiseModel = sequelize.define('praise', {
    userId: Sequelize.INTEGER,
    blogId: Sequelize.INTEGER,
})

function setRes(res, tips) {
    let obj = {};
    obj.data = res;
    if (res) {
        obj.code = 1;
        obj.message = `${tips}成功`;
    } else {
        obj.code = 0;
        obj.message = `${tips}失败`;
    }
    return obj;
}

class Praise {
    // 点赞文章
    static async pariseUp(req) {
        const res = await PraiseModel.create({
            userId: req.userId,
            blogId: req.blogId
        });
        let obj = setRes(res, '点赞');
        return obj;
    }

    // 查看当前用户是否已点赞文章
    static async isPraise(req) {
        const res = await PraiseModel.findOne({
            where: { userId: req.userId, blogId: req.blogId }
        });
        let obj = {};
    obj.data = res;
    if (res) {
        obj.code = 1;
        obj.message = '用户已点赞';
    } else {
        obj.code = 0;
        obj.message = '用户未点赞';
    }
    return obj;
    }
}

module.exports = Praise