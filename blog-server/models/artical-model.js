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
})

class Artical {
    // 发表文章
    static async blogUpload(data) {
        await BlogModel.create({
            text: data.text,
            praiseNum: 0,
            authorId: data.authorId,
            text_title: data.text_title,
            comment_num: 0
        })
    }

    // 获取最新的文章:一页10条
    static async fetchArticals(page) {
        let obj = {};
        const res = await BlogModel.findAll({ limit: 10, offset: page * 10 });
        obj.data = res;
        if (res) {
            obj.code = 1;
            obj.message = '获取文章成功';
        } else {
            obj.code = 0;
            obj.message = '获取文章失败';
        }
        return obj;
    }
}

module.exports = Artical