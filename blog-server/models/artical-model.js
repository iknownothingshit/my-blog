// 文章表模型
const dataBase = require('../config/db')

let sequelize = dataBase.sequelize,
    Sequelize = dataBase.Sequelize

const BlogModel = sequelize.define('blog', {
    blogId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    text: Sequelize.TEXT,
    praiseNum: Sequelize.INTEGER,
    authorId: Sequelize.INTEGER,
    text_title: Sequelize.STRING(255),
    comment_num: Sequelize.INTEGER,
    title_img: Sequelize.STRING(255),
    praise_user: Sequelize.STRING(255),
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

class Artical {
    // 发表文章
    static async blogUpload(data) {
        const res = await BlogModel.create({
            text: data.text,
            praiseNum: 0,
            authorId: data.authorId,
            text_title: data.text_title,
            comment_num: 0,
            title_img: data.title_img,
            praise_user: JSON.stringify([])
        });
        let obj = setRes(res, '发表文章');
        return obj;
    }

    // 获取最新的文章:一页10条
    static async fetchArticals(page) {
        const res = await BlogModel.findAndCountAll({ order: [['blogId', 'desc']], limit: 10, offset: page * 10 });
        let obj = setRes(res, '获取文章');
        return obj;
    }

    // 获取指定用户的文章
    static async fetchUserArticals({ authorId, page }) {
        const res = await BlogModel.findAndCountAll({ where: { authorId }, order: [['blogId', 'desc']], limit: 10, offset: page * 10 });
        let obj = setRes(res, '获取用户文章');
        return obj;
    }

    // 点赞文章
    static async praise({ userId, blogId }) {
        const find_res = await BlogModel.findOne({ where: { blogId } });
        let obj = {};
        if (find_res) {
            let praise_users = JSON.parse(find_res.praise_user);
            praise_users.push(userId);
            const update_res = await BlogModel.update({ praise_user: JSON.stringify(praise_users), praiseNum: find_res.praiseNum + 1 }, { where: { blogId } });
            obj = setRes(update_res, '点赞');
        } else {
            obj = setRes(find_res, '查找文章');
        }
        return obj;
    }

    // 文章收到一条评论后增加一个评论数
    static async commentIncrease({ blogId }) {
        const find_res = await BlogModel.findOne({ where: { blogId } });
        if (!find_res) return false;
        const res = await BlogModel.update({ comment_num: find_res.comment_num + 1 }, { where: { blogId } });
        if (!res) return false;
        return true;
    }
}

module.exports = Artical