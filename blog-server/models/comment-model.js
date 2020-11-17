// 评论表模型
const dataBase = require('../config/db')

let sequelize = dataBase.sequelize,
    Sequelize = dataBase.Sequelize

const CommentModel = sequelize.define('comment', {
    commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    text: Sequelize.STRING(255),
    userId: Sequelize.INTEGER,
    blogId: Sequelize.INTEGER,
    date: Sequelize.STRING(10),
    user_name: Sequelize.STRING,
    user_avatars: Sequelize.STRING
})

class Comment {
    // 发表评论
    static async comment({ text, userId, blogId, userName, userAvatars }) {
        let date = new Date().toLocaleDateString()
        const res = await CommentModel.create({ text, userId, blogId, date, user_name: userName, user_avatars: userAvatars })
        if (!res) return false
        return true
    }

    // 获取文章的评论
    static async fetchComments({ blogId }) {
        let obj = {}
        const res = await CommentModel.findAndCountAll({ where: { blogId } })
        obj.data = res
        if (res) {
            obj.message = '获取评论成功'
            obj.code = 1
        } else {
            obj.message = '获取评论失败'
            obj.code = 0
        }
        return obj
    }

}

module.exports = Comment